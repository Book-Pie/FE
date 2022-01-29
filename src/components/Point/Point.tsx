import { useCallback, useEffect, useMemo, useState } from "react";
import { myPointCancel, myPointList } from "api/my";
import { Typography, Button, FormGroup, FormControlLabel, Checkbox, Grid } from "@mui/material";
import { useTypedSelector } from "modules/store";
import { signInUser } from "modules/Slices/signIn/signInSlice";
import { dateFormat2, make1000UnitsCommaFormet } from "utils/formatUtil";

import useDelay from "hooks/useDelay";
import Loading from "src/elements/Loading";
import { errorHandler } from "api/http";
import * as Styled from "./styles";
import * as Types from "./types";
import PointInfo from "../MyTop/PointInfo";

const Point = () => {
  const [page, setPage] = useState(1);
  const [pointList, setPointList] = useState<Types.PointState>([]);
  const [pointCancelList, setPointCancelList] = useState<Types.PointState>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkBoxState, setCheckBoxState] = useState<Types.CheckBoxStateType>({
    DATE: true,
    CANCEL: false,
  });
  const user = useTypedSelector(signInUser);
  const delay = useDelay(400);

  const checkBox = useMemo(
    () => [
      { id: 1, name: "DATE", label: "최신순" },
      { id: 2, name: "CANCEL", label: "환불보기" },
    ],
    [],
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCheckBoxState(prev => ({
        ...prev,
        [e.target.name]: !prev[e.target.name],
      })),
    [],
  );
  const handleCancelOnClick = (pointId: number, amount: number) => async () => {
    try {
      if (user) {
        const userId = user.id;
        if (amount > user.point.holdPoint) throw new Error("남은 포인트가 부족합니다.");
        await myPointCancel<Types.Request>({
          userId,
          pointId,
          cancelAmount: amount,
        });
        alert("환불이 되었습니다.");
        window.location.reload();
      }
    } catch (error: any) {
      const message = errorHandler(error);
      alert(message);
    }
  };
  const handleHasMorePage = useCallback(async () => {
    setIsLoading(true);
    await delay();
    setPage(prev => prev + 1);
    setIsLoading(false);
  }, [delay]);

  useEffect(() => {
    async function fetcher() {
      try {
        if (user) {
          const { data } = await myPointList(user.id);
          const pointCancelList = data.data.filter((point: any) => point.cancelAmount !== 0);
          const pointList = data.data.filter((point: any) => point.cancelAmount === 0);
          setPointList(pointList);
          setPointCancelList(pointCancelList);
        }
      } catch (error: any) {
        const message = errorHandler(error);
        alert(message);
      }
    }
    fetcher();
  }, [user]);

  let list = checkBoxState.CANCEL ? pointCancelList : pointList;
  list = list.slice(0, page * 6).sort((prev, curr) => {
    const date1 = new Date(prev.orderDate).getTime();
    const date2 = new Date(curr.orderDate).getTime();
    return checkBoxState.DATE ? date2 - date1 : date1 - date2;
  });

  return (
    <Styled.PointWrapper>
      <Loading isLoading={isLoading} />
      <Typography variant="h4" fontWeight="bold">
        포인트 내역
      </Typography>
      {user && (
        <Styled.PointInfo>
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
          <PointInfo />
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
                <span>{dateFormat2(orderDate)}</span>
              </div>
              {user && (
                <Button
                  variant="outlined"
                  disabled={amount < user.point.holdPoint ? (cancelAmount !== 0 ? true : false) : true}
                  onClick={handleCancelOnClick(pointId, amount)}
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
