import React, { useEffect, useState } from "react";
import http, { errorHandler } from "api/http";
import Popup from "elements/Popup";
import { make1000UnitsCommaFormet } from "utils/formatUtil";
import TextField from "@mui/material/TextField";
import logo from "assets/image/logo-removebg.png";
import { useTypedSelector } from "modules/store";
import { userSelector } from "modules/Slices/user/userSlice";
import usePopup from "hooks/usePopup";
import { Wrapper } from "./style";

const { IMP } = window as any;

const Payment = () => {
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState({
    isSuccess: false,
    result: "",
  });

  const user = useTypedSelector(userSelector);
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;

  const handleAdPriceOnClick = (price: number) => () => {
    setPrice(prev => {
      const totalPrice = String(Number(prev) + Number(price));
      if (totalPrice.length > 10) return prev;
      return totalPrice;
    });
  };

  const handlePriceOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (value.length === 0) setPrice("");
    if (/[1-9](1)*/gi.test(value)) {
      setPrice(prev => (value.length > 10 ? prev : value));
    }
  };
  const handleCloseOnClick = () => window.close();
  const handlePointPaymentOnClick = ({ currentTarget: { id } }: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (!user) throw new Error("로그인이 핑요합니다.");
      if (Number(price) <= 1000) throw new Error("최소 1,000원이상 결제 가능합니다.");
      const { email, name, phone, address, id: userId } = user;

      const data = {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: `merchant_${new Date().getTime()}`,
        name: "북파이 포인트 결제", // 결제창에서 보여질 이름
        amount: price, // 결제할 포인트
        buyer_email: email,
        buyer_name: name,
        buyer_tel: phone,
        buyer_addr: address?.detailAddress ?? "",
        buyer_postcode: address?.postalCode ?? "",
      };

      if (id === "inicis") data.pg = "html5_inicis";

      const callback = async (response: any) => {
        try {
          if (!response.success) throw new Error(`결제에 실패하였습니다. \n${response.error_msg}`);
          const amount = response.paid_amount;
          const impUid = response.imp_uid;
          const merchantUid = response.merchant_uid;
          const data = {
            amount,
            impUid,
            merchantUid,
            userId,
          };

          await http.post("/point", data);
          handlePopupMessage(true, "결제에 성공하였습니다.");
          setPayment({
            isSuccess: true,
            result: `${make1000UnitsCommaFormet(String(amount))}원`,
          });
        } catch (error) {
          handlePopupMessage(false, errorHandler(error));
        }
      };
      IMP.request_pay(data, callback);
    } catch (error) {
      handlePopupMessage(false, errorHandler(error));
    }
  };

  useEffect(() => {
    IMP.init(process.env.PAYMENT_IMP_KEY);
  }, []);

  return (
    <Wrapper>
      {isOpen && (
        <Popup
          isOpen={isOpen}
          setIsOpen={handlePopupClose}
          className={isSuccess ? "green" : "red"}
          closeDelay={4000}
          autoClose
        >
          {message}
        </Popup>
      )}
      <div className="payment">
        <div className="payment__title">
          <img src={logo} alt="logo" />
          <h1> 결제하기</h1>
        </div>
        <p>원하시는 결제 수단을 선택해주세요.</p>
        <div className="payment__totalPoint">총 : {`${make1000UnitsCommaFormet(price === "" ? "0" : price)}원`}</div>
        <div className="payment__priceInput">
          <TextField
            type="number"
            required
            fullWidth
            color="mainDarkBrown"
            value={price}
            onChange={handlePriceOnChange}
          />
        </div>
        <div className="payment__priceButton">
          <div>
            <button type="button" onClick={handleAdPriceOnClick(1000)}>
              1,000원 +
            </button>
            <button type="button" onClick={handleAdPriceOnClick(10000)}>
              10,000원 +
            </button>
            <button type="button" onClick={handleAdPriceOnClick(50000)}>
              50,000원 +
            </button>
            <button type="button" onClick={handleAdPriceOnClick(100000)}>
              100,000원 +
            </button>
          </div>
        </div>
        <div className="payment__buttons">
          <div>
            <button id="kakao" type="button" onClick={handlePointPaymentOnClick}>
              카카오 간편결제
            </button>
            <button id="inicis" type="button" onClick={handlePointPaymentOnClick}>
              이니시스 결제
            </button>
          </div>
        </div>
        {payment.isSuccess && (
          <div className="payment__result">
            <p>결제가 완료되었습니다.</p>
            <div className="payment__price">{payment.result}</div>
            <button id="close" type="button" onClick={handleCloseOnClick}>
              닫기
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Payment;
