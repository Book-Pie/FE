import paymentImg from "assets/image/payment_img.jpg";
import PaymentForm from "components/PaymentForm/PaymentForm";
import styled from "styled-components";

const Container = styled.div`
  width: 700px;
  margin: 0 auto;
  box-shadow: rgb(0 0 0 / 20%) 0px 4px 16px 0px;
  padding: 1rem 2rem;

  .payment--center {
    text-align: center;
  }

  .payment__main_title {
    font-size: 2.5rem;
    font-weight: 900;
  }
  .payment__title {
    width: 250px;
    font-size: 1.5rem;
    font-weight: 900;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .payment__details {
    display: flex;
    padding-bottom: 1rem;
    border-bottom: 0.5rem solid rgba(149, 165, 166, 0.15);
  }
  .payment__img {
    width: 200px;
    padding-top: 150px;
    position: relative;
    & > img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      bottom: 0;
    }
  }
  .payment__state {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    gap: 10px;
  }
  .payment__price {
    display: inline-block;
    & > span {
      vertical-align: middle;
      font-weight: 900;
      font-size: 1.5rem;
    }
  }
  .payment__cotent_title {
    font-size: 1.1rem;
    color: rgba(149, 165, 166, 1);
    font-weight: bold;
  }
`;

const Payment = () => {
  return (
    <Container>
      <div className="payment__main_title payment--center">결제 페이지</div>
      <div className="payment__header">
        <div className="payment__title">택배거래, 안전결제로 구매합니다.</div>
        <div className="payment__details">
          <div className="payment__img">
            <img src={paymentImg} alt="paymentImg" />
          </div>
          <div className="payment__state">
            <div className="payment__price">
              <span>가격 : </span>
              <span>15,0000원</span>
            </div>
            <div className="payment__cotent_title">[상태 : 최상] 책은 도끼다 팝니다.!!</div>
          </div>
        </div>
        <PaymentForm />
      </div>
    </Container>
  );
};

export default Payment;
