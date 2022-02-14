import { useCallback, useEffect, useMemo, useState } from "react";
import { Typography, Button, FormGroup, FormControlLabel, Checkbox, Grid } from "@mui/material";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { fetchUserInfoAsync, userReduceSelector } from "modules/Slices/user/userSlice";
import { dateArrayFormat, make1000UnitsCommaFormet } from "utils/formatUtil";
import Loading from "elements/Loading";
import client, { errorHandler, makeAuthTokenHeader } from "api/client";
import useFetch, { errorAction } from "hooks/useFetch";
import PointInfo from "components/MyTop/PointInfo";
import Popup from "elements/Popup";

import * as Styled from "./styles";
import * as Types from "./types";

const Point = () => {
  const [page, setPage] = useState(1);
  const [pointList, setPointList] = useState<Types.PointState>([]);
  const [pointCancelList, setPointCancelList] = useState<Types.PointState>([]);
  const [list, setList] = useState<Types.PointState>([]);
  const [checkBoxState, setCheckBoxState] = useState<Types.CheckBoxStateType>({
    DATE: true,
    CANCEL: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const { state, callApi, dispatch, handleDelay } = useFetch<Types.PointState>();
  const reduxDispatch = useAppDispatch();
  const { user, token } = useTypedSelector(userReduceSelector);

  const checkBox = useMemo(
    () => [
      { id: 1, name: "DATE", label: "최신순" },
      { id: 2, name: "CANCEL", label: "환불보기" },
    ],
    [],
  );

  const handlePopUp = useCallback(
    (message: string) => {
      setIsOpen(true);
      dispatch(errorAction(message));
    },
    [dispatch],
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleDelay();
      setCheckBoxState(prev => ({
        ...prev,
        [e.target.name]: !prev[e.target.name],
      }));
    },
    [handleDelay],
  );

  const handleHasMorePage = useCallback(async () => {
    handleDelay();
    setPage(prev => prev + 1);
  }, [handleDelay]);

  const handleCancelOnClick = (pointId: number, amount: number) => async () => {
    try {
      if (user && token) {
        if (amount > user.point.holdPoint) throw new Error("남은 포인트가 부족합니다.");
        const payload = {
          userId: user.id,
          pointId,
          cancelAmount: amount,
        };
        await client.post("/point", payload, makeAuthTokenHeader(token));
        alert("환불이 되었습니다.");
        handlePointFetch();
        reduxDispatch(fetchUserInfoAsync(token));
      }
    } catch (error: any) {
      const message = errorHandler(error);
      handlePopUp(message);
    }
  };
  const handlePointFetch = useCallback(() => {
    if (!user || !token) return;
    callApi(client.get(`/point`, makeAuthTokenHeader(token))).then(data => {
      const pointCancelList = data.filter(item => item.cancelAmount !== 0);
      const pointList = data.filter(item => item.cancelAmount === 0);
      setPointList(pointList);
      setPointCancelList(pointCancelList);
    });
  }, [callApi, user, token]);

  useEffect(handlePointFetch, [handlePointFetch]);

  useEffect(() => {
    setList(() => {
      const list = checkBoxState.CANCEL ? pointCancelList : pointList;
      return list
        .sort((prev, curr) => {
          const date1 = new Date(prev.orderDate).getTime();
          const date2 = new Date(curr.orderDate).getTime();
          return checkBoxState.DATE ? date2 - date1 : date1 - date2;
        })
        .slice(0, page * 6);
    });
  }, [checkBoxState, pointCancelList, pointList, page]);

  return (
    <Styled.PointWrapper>
      <Loading isLoading={state.loading} />
      {isOpen && (
        <Popup isOpen={isOpen} autoClose setIsOpen={setIsOpen}>
          {state.error}
        </Popup>
      )}
      <Typography variant="h4" fontWeight="bold">
        포인트 내역
      </Typography>
      {user && (
        <Styled.PointInfo>
          <PointInfo />
          <div>
            <span>총 포인트</span>
            <span className="info">{make1000UnitsCommaFormet(user.point.totalPoint)}원</span>
          </div>
          <div>
            <span>사용한 포인트</span>
            <span className="info">{make1000UnitsCommaFormet(user.point.usedPoint)}원</span>
          </div>
          <div>
            <span>남은 포인트</span>
            <span className="info">{make1000UnitsCommaFormet(user.point.holdPoint)}원</span>
          </div>
        </Styled.PointInfo>
      )}

      <FormGroup row sx={{ mt: 1, justifyContent: "center" }}>
        {checkBox.map(({ id, name, label }) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                size="small"
                name={name}
                onChange={handleOnChange}
                checked={checkBoxState[name] || false}
                color="mainDarkBrown"
              />
            }
            label={label}
          />
        ))}
      </FormGroup>
      <Grid container justifyContent="center" gap={1} mt={1}>
        {list.length ? (
          list.map(({ amount, cancelAmount, orderDate, pointId }) => (
            <Styled.PointRow key={pointId}>
              <div>
                <span>{cancelAmount ? "환불번호" : "충전번호"}</span>
                <span>{pointId}.</span>
              </div>
              <div className={`${cancelAmount ? "error" : "info"}`}>
                <span>{cancelAmount ? "환불가격" : "충전가격"}</span>
                <span>
                  {cancelAmount
                    ? `${make1000UnitsCommaFormet(cancelAmount)}원`
                    : `${make1000UnitsCommaFormet(amount)}원`}
                </span>
              </div>

              <div>
                <span>{cancelAmount ? "환불시간" : "충전시간"}</span>
                <span>{dateArrayFormat(orderDate)}</span>
              </div>
              {user && (
                <Button
                  variant="contained"
                  disabled={amount < user.point.holdPoint ? (cancelAmount !== 0 ? true : false) : true}
                  onClick={handleCancelOnClick(pointId, amount)}
                  color="info"
                >
                  {amount < user.point.holdPoint ? (cancelAmount ? "환불완료" : "환불하기") : "남은 금액이 부족합니다."}
                </Button>
              )}
            </Styled.PointRow>
          ))
        ) : (
          <Styled.PointRow className="center">
            <span>{checkBoxState.CANCEL ? "환불 내역이 없습니다." : "충전 내역이 없습니다."}</span>
          </Styled.PointRow>
        )}
      </Grid>
      <Styled.PointButtonsWrapper>
        <Button variant="contained" onClick={handleHasMorePage} disabled={list.length === 6 * page ? false : true}>
          더보기
        </Button>
      </Styled.PointButtonsWrapper>
    </Styled.PointWrapper>
  );
};

export default Point;
