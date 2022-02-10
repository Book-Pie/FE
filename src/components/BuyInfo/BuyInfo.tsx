import { useCallback, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router";
import { fetchBuyInfoAsync, userBuyInfoSelector, userReduceSelector } from "modules/Slices/user/userSlice";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { hyphenFormat, dateArrayFormat, make1000UnitsCommaFormet } from "utils/formatUtil";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "elements/Loading";
import * as Types from "./types";
import * as Styled from "./style";

const BuyInfo = () => {
  const { orderId } = useParams<Types.Params>();
  const dispatch = useAppDispatch();
  const { status, user } = useTypedSelector(userReduceSelector);
  const isLoading = status === "loading";
  const buyInfo = useTypedSelector(userBuyInfoSelector(Number(orderId)));
  const histoy = useHistory();

  const handleGoBack = useCallback(() => {
    histoy.goBack();
  }, [histoy]);

  const goback = useMemo(
    () => (
      <Button variant="contained" color="mainDarkBrown" fullWidth sx={{ mt: 2, height: 50 }} onClick={handleGoBack}>
        뒤로가기
      </Button>
    ),
    [handleGoBack],
  );

  useEffect(() => {
    if (!buyInfo) dispatch(fetchBuyInfoAsync(orderId)).unwrap().catch(alert);
  }, [orderId, buyInfo, dispatch]);

  useEffect(() => {
    if (buyInfo && user) {
      if (buyInfo.buyer.userId !== user.id) {
        alert("구매자가 아닙니다.");
        histoy.replace("/");
      }
    }
  }, [buyInfo, user, histoy]);

  if (buyInfo && user) {
    const { book, buyer, orderDate, orderId, seller, deliveryRequest } = buyInfo;

    if (buyer.userId === user.id) {
      return (
        <Styled.Wrapper>
          <Loading isLoading={isLoading} />
          <div className="buyInfo__top">
            <div className="buyInfo__title">구매상세</div>
            <div>
              <p className="buyInfo__orderDate">{dateArrayFormat(orderDate)[0]} 구매</p>
              <p className="buyInfo__orderNumber">주문번호 {orderId}</p>
            </div>
          </div>
          <div className="buyInfo__title">판매자 정보</div>
          <div className="buyInfo__seller">
            <div>
              <Link to={`/usedBook/${book.bookId}`}>
                <img className="buyInfo__bookImg" src={`${process.env.BASE_URL}/image/${book.image}`} alt="img" />
              </Link>
              <div>
                <div>
                  <p>판매자 이름</p>
                  <p>{seller.name}</p>
                </div>
                <div>
                  <p>판매자 연락처</p>
                  <p>{hyphenFormat(seller.phone ?? "")}</p>
                </div>
                <div>
                  <p>상품 명</p>
                  <p>{book.title}</p>
                </div>
                <div>
                  <p>상품 가격</p>
                  <p> {`${make1000UnitsCommaFormet(String(book.price))}원`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="buyInfo__title">구매자정보</div>
          <div className="buyInfo__buyer">
            <div>
              <span>받는사람</span>
              <p>{buyer.name}</p>
            </div>
            <div>
              <span>연락처</span>
              <p>{hyphenFormat(buyer.phone ?? "")}</p>
            </div>
            <div>
              <span>받는주소</span>
              <p>{` ${buyer.address?.postalCode} ${buyer.address?.mainAddress}`}</p>
            </div>
            <div>
              <span>상세주소</span>
              <p>{`${buyer.address?.detailAddress}`}</p>
            </div>
            <div>
              <span>배송요청사항</span>
              <p>{deliveryRequest}</p>
            </div>
          </div>
          <div className="buyInfo__title">결제정보</div>
          <div className="buyInfo__paymentInfo">
            <div>
              <div>
                <p>결제수단</p>
                <p>안전거래</p>
              </div>
              <div>
                <div>
                  <p>총 상품가격</p>
                  <p> {`${make1000UnitsCommaFormet(String(book.price))}원`}</p>
                </div>
                <div>
                  <p>배송비</p>
                  <p>0원</p>
                </div>
              </div>
            </div>
            <div>
              <div />
              <div>
                <div>
                  <p>총 결제가격</p>
                  <p> {`${make1000UnitsCommaFormet(String(book.price))}원`}</p>
                </div>
              </div>
            </div>
          </div>
          {goback}
        </Styled.Wrapper>
      );
    }
  }

  return null;
};

export default BuyInfo;
