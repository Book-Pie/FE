import { useHistory, useLocation } from "react-router";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { dateArrayFormat, make1000UnitsCommaFormet } from "utils/formatUtil";
import { useTypedSelector } from "modules/store";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import client, { makeAuthTokenHeader } from "api/client";
import * as Styled from "./style";
import * as Types from "./types";

const OrderResult = () => {
  const { state } = useLocation<number>();
  const [orderResult, setOrderResult] = useState<Types.OrderResult>();
  const { token } = useTypedSelector(userReduceSelector);
  const history = useHistory();

  useEffect(() => {
    if (state && token) {
      client
        .get<Types.BuyInfoAsyncResponse>(`/order/${state}`, makeAuthTokenHeader(token))
        .then(({ data }) => setOrderResult(data));
    } else {
      history.replace("/");
    }
  }, [state, token, history]);

  if (!orderResult || !state) return null;

  return (
    <Styled.OrderFormWrapper>
      <Styled.OrderResult>
        <div className="result__title">
          <div>
            <ExpandMoreOutlinedIcon fontSize="large" />
          </div>
          <p>중고도서 구매가 완료되었습니다.</p>
        </div>
        <div className="result__info">
          <div>
            <span>주문날짜</span>
            <span>{dateArrayFormat(orderResult.orderDate)[0]}</span>
          </div>
          <div>
            <span>주문번호</span>
            <span>{state}번</span>
          </div>
          <div>
            <span>상품명</span>
            <span>{orderResult.book.title}</span>
          </div>
        </div>
        <div className="result__price">
          <span>결제된 금액</span>
          <span>{`${make1000UnitsCommaFormet(String(orderResult.book.price))}원`}</span>
        </div>
        <div className="result__button">
          <Link to="/usedBook">
            <Button variant="contained" color="mainDarkBrown">
              중고도서 더보기
            </Button>
          </Link>
          <Link to="/my/buy">
            <Button variant="contained">주문목록</Button>
          </Link>
        </div>
      </Styled.OrderResult>
    </Styled.OrderFormWrapper>
  );
};

export default OrderResult;
