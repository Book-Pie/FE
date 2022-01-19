import { useHistory, useLocation } from "react-router";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyOrder } from "src/api/usedBook/usedBook";
import { dateFormat2, make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { Result, Wrapper } from "./style";
import { IOrderResult } from "./type";

const OrderResult = () => {
  const { state } = useLocation<number>();
  const [orderResult, setOrderResult] = useState<IOrderResult>();
  const history = useHistory();

  useEffect(() => {
    if (state) {
      getMyOrder(state).then(({ data }) => setOrderResult(data.data));
    } else {
      history.replace("/");
    }
  }, [state, history]);

  if (!orderResult || !state) return null;

  return (
    <Wrapper>
      <Result>
        <div className="result__title">
          <div>
            <ExpandMoreOutlinedIcon fontSize="large" />
          </div>
          <p>중고도서 구매가 완료되었습니다.</p>
        </div>
        <div className="result__info">
          <div>
            <span>주문날짜</span>
            <span>{dateFormat2(orderResult.orderDate)[0]}</span>
          </div>
          <div>
            <span>주문번호</span>
            <span>{state}</span>
          </div>
          <div>
            <span>상품명</span>
            <span>{orderResult.book.title}</span>
          </div>
        </div>
        <div className="result__price">
          <span>결제 금액</span>
          <span>{`${make1000UnitsCommaFormet(String(orderResult.book.price))}원`}</span>
        </div>
        <div className="result__button">
          <Link to="/usedBook">
            <Button variant="contained" color="mainDarkBrown">
              중고도서 더보기
            </Button>
          </Link>
          <Link to="/">
            <Button variant="contained">주문목록</Button>
          </Link>
        </div>
      </Result>
    </Wrapper>
  );
};

export default OrderResult;
