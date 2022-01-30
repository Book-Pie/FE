import { Button } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import Loading from "elements/Loading";
import { saleInfoAsync, userReduceSelector, userSaleInfoSelector } from "modules/Slices/user/userSlice";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { hyphenFormat, dateArrayFormat, make1000UnitsCommaFormet } from "utils/formatUtil";
import * as Styled from "./style";

const SaleInfo = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { status, user } = useTypedSelector(userReduceSelector);
  const isLoading = status === "loading";
  const dispatch = useAppDispatch();
  const saleInfo = useTypedSelector(userSaleInfoSelector(Number(bookId)));

  const histoy = useHistory();

  const handleGoBack = useCallback(() => {
    histoy.goBack();
  }, [histoy]);

  const goback = useMemo(
    () => (
      <Button
        variant="contained"
        color="mainDarkBrown"
        fullWidth
        sx={{ mt: 2, mb: 2, height: 50 }}
        onClick={handleGoBack}
      >
        뒤로가기
      </Button>
    ),
    [handleGoBack],
  );

  useEffect(() => {
    if (!saleInfo)
      dispatch(saleInfoAsync(bookId))
        .unwrap()
        .catch(error => {
          alert(error);
          handleGoBack();
        });
  }, [bookId, saleInfo, handleGoBack, dispatch]);

  useEffect(() => {
    if (saleInfo && user) {
      if (saleInfo.seller.userId !== user.id) {
        alert("판매자가 아닙니다.");
        histoy.replace("/");
      }
    }
  }, [saleInfo, user, histoy]);

  if (saleInfo && user) {
    const { book, buyer, deliveryRequest, orderDate, orderId, seller } = saleInfo;
    if (seller.userId === user.id) {
      return (
        <Styled.SaleInfoWrapper>
          <Loading isLoading={isLoading} />
          <div className="saleInfo__top">
            <div className="saleInfo__title">판매상세</div>
            <div>
              <p className="saleInfo__orderDate">판매 날짜 {dateArrayFormat(orderDate)[0]} 판매</p>
              <p className="saleInfo__orderNumber">판매번호 {orderId}</p>
            </div>
          </div>
          <div className="saleInfo__title">판매한 상품 정보</div>
          <div className="saleInfo__seller">
            <div>
              <Link to={`/usedBook/${book.bookId}`}>
                <img className="saleInfo__bookImg" src={`${process.env.BASE_URL}/image/${book.image}`} alt="img" />
              </Link>
              <div>
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
          <div className="saleInfo__title">구매자정보</div>
          <div className="saleInfo__buyer">
            <div>
              <span>받는사람</span>
              <p>{buyer.name}</p>
            </div>
            <div>
              <span>연락처</span>
              <p>{hyphenFormat(buyer.phone)}</p>
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
          <div className="saleInfo__title">결제정보</div>
          <div className="saleInfo__paymentInfo">
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
        </Styled.SaleInfoWrapper>
      );
    }
  }

  return null;
};

export default SaleInfo;
