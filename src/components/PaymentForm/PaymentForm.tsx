import { RegisterOptions, useForm } from "react-hook-form";
import useDaumPost from "src/hooks/useDaumPost";
import styled from "styled-components";
import FormInput from "src/elements/FormInput";
import DaumPostcode from "react-daum-postcode";
import { useEffect, useMemo, useState } from "react";
import DropDown from "components/DropDown/DropDown";
import { Link } from "react-router-dom";
import useSignIn from "hooks/useSignIn";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { makeOption } from "src/utils/hookFormUtil";
import { FormErrorMessages } from "../SignUpForm/types";
import ErrorMessage from "../../elements/ErrorMessage";

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 2rem;
  .paymentForm__form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .paymentForm__row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
    input {
      flex: 1;
    }
    & > div {
      flex: 1;
    }
  }

  .paymentForm__button {
    padding: 0.5rem 1rem;
    background-color: rgba(52, 152, 219, 1);
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 20%) 0px 4px 16px 0px;
    color: white;
    border: none;

    cursor: pointer;
    box-sizing: border-box;
    a {
      color: white;
      text-align: center;
    }
  }
  .paymentForm__dropDown_wrap {
    margin-bottom: 1rem;
    & > div {
      margin-bottom: 1rem;
      width: 100%;
      box-sizing: border-box;
    }
  }
  .paymentForm__main {
    padding: 1rem;
    border: 1px solid rgba(236, 240, 241, 1);
    border-radius: 7px;
    margin-bottom: 1rem;
    & > div {
      display: flex;
      justify-content: space-between;
    }
    div + div {
      margin-top: 1rem;
    }
    & > div:last-child {
      border-top: 1px solid rgba(236, 240, 241, 1);
      padding: 0.5rem 0;
    }
  }

  .paymentForm__price {
    font-weight: 700;
    font-size: 1rem;
  }
  .paymentForm__fixed {
    position: fixed;
    background-color: rgba(189, 195, 199, 0.4);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > div {
      box-shadow: rgb(0 0 0 / 50%) 0px 4px 16px 0px;
      width: 400px;
    }
    button {
      width: 100%;
    }
  }
  .paymentForm__red {
    color: rgba(231, 76, 60, 1);
  }
  .paymentForm__strong {
    font-weight: 600;
    color: rgba(149, 165, 166, 0.7);
  }
  .paymentForm__button--100 {
    width: 100%;
  }
`;

const StyledSpan = styled.span`
  padding: 0.5rem;
  display: block;
`;

interface IPaymentForm {
  detailAddress: string;
  mainAddress: string;
  postalCode: string;
  delivery: boolean;
  ponint: string;
}

const PaymentForm = () => {
  const deliveryTextInit = useMemo(() => "배송요청사항을 선택해주세요.", []);
  const { addressState, handleComplete } = useDaumPost();
  const { formState, register, handleSubmit, setValue, clearErrors, setFocus, setError, watch, reset } =
    useForm<IPaymentForm>();
  const [point] = watch(["ponint"]);

  const [isDaumPostcodeOpen, setIsDaumPostcodeOpen] = useState(false);
  const [deliveryText, setDeliveryText] = useState(deliveryTextInit);
  const { dispatch, signIn } = useSignIn();
  const { user } = signIn;
  const { errors } = formState;

  const addressOptions: RegisterOptions = {
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
  };

  const handleDeliveryError = () =>
    setError("delivery", {
      type: "manual",
      message: "필수 입니다.",
    });

  const onSumit = (formData: any) => {
    console.log("전송");
  };

  useEffect(() => {
    const { addr, extraAddr, zonecode } = addressState;
    const { mainAddress, postalCode } = errors;

    if (addr && zonecode) {
      if (mainAddress || postalCode) {
        clearErrors(["postalCode", "mainAddress"]);
      }
      setValue("postalCode", zonecode);
      setValue("mainAddress", `${addr} ${extraAddr}`);
      setValue("detailAddress", "");
      setFocus("detailAddress");
    }
  }, [addressState, errors, clearErrors, setFocus, setValue]);

  useEffect(() => {
    if (user && user.address) {
      const { address } = user;
      const { postalCode, detailAddress, mainAddress } = address;
      setValue("postalCode", postalCode);
      setValue("mainAddress", mainAddress);
      setValue("detailAddress", detailAddress);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (isDaumPostcodeOpen) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, [isDaumPostcodeOpen]);

  if (user === null) return null;

  return (
    <Container>
      {isDaumPostcodeOpen && (
        <div className="paymentForm__fixed">
          <div>
            <DaumPostcode onComplete={handleComplete} onClose={() => setIsDaumPostcodeOpen(false)} />
            <button type="button" className="paymentForm__button" onClick={() => setIsDaumPostcodeOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSumit)} className="paymentForm__form">
        <div className="paymentForm__row">
          <button type="button" className="paymentForm__button" onClick={() => setIsDaumPostcodeOpen(prev => !prev)}>
            배송지 변경
          </button>
        </div>
        <div className="paymentForm__row">
          <FormInput
            disabled
            type="text"
            id="postalCode"
            placeholder="우편번호"
            register={register("postalCode", addressOptions)}
          />

          <FormInput
            disabled
            type="text"
            id="mainAddress"
            placeholder="주소"
            register={register("mainAddress", addressOptions)}
          />
        </div>
        <div className="paymentForm__row">
          <ErrorMessage message={errors.postalCode?.message} />
          <ErrorMessage message={errors.mainAddress?.message} />
        </div>
        <div className="paymentForm__row">
          <FormInput
            type="text"
            id="detailAddress"
            placeholder="상세주소"
            register={register("detailAddress", addressOptions)}
          />
        </div>
        <div className="paymentForm__row">
          <ErrorMessage message={errors.detailAddress?.message} />
        </div>
        <div className="paymentForm__dropDown_wrap">
          <DropDown defaultValue={deliveryText}>
            <li>
              <StyledSpan>현관문 앞에 놓고 가세요.</StyledSpan>
            </li>
            <li>
              <StyledSpan>배송 전 전화 부탁드립니다.</StyledSpan>
            </li>
            <li>
              <StyledSpan>경비실에 맡겨주세요.</StyledSpan>
            </li>
            <li>
              <StyledSpan>기타</StyledSpan>
            </li>
          </DropDown>
          <div className="paymentForm__row">
            <ErrorMessage message={errors.delivery?.message} />
          </div>
        </div>
        <div className="paymentForm__row">
          <FormInput type="text" placeholder="충전 금액을 입력해주세요." register={register("ponint")} value={point} />
          <button type="button" className="paymentForm__button">
            충전하기
          </button>
        </div>
        <div className="paymentForm__row">
          <input type="checkbox" id="a" />
          <label htmlFor="a">개인정보 제3자 제공동의와 결제대행 서비스 이용약관에 동의합니다.</label>
        </div>
        <div className="paymentForm__main">
          <div>
            <span className="paymentForm__strong">상품금액</span>
            <span className="paymentForm__price">{`${make1000UnitsCommaFormet("15000")}원`}</span>
          </div>
          <div>
            <span className="paymentForm__strong">현재포인트</span>
            <span className="paymentForm__price">{`${make1000UnitsCommaFormet("25980")}원`}</span>
          </div>
          <div>
            <span className="paymentForm__strong">총 결제금액</span>
            <span className="paymentForm__price paymentForm__red">
              {`
                ${make1000UnitsCommaFormet("25980")}원 - ${make1000UnitsCommaFormet(
                "15000",
              )}원 = ${make1000UnitsCommaFormet("10980")}원
              `}
            </span>
          </div>
        </div>
        <div className="paymentForm__row">
          <button type="submit" className="paymentForm__button paymentForm__button--100">
            결제하기
          </button>
        </div>
        <div className="paymentForm__row">
          <button type="submit" className="paymentForm__button paymentForm__button--100" onClick={() => reset()}>
            초기화
          </button>
        </div>
        <div className="paymentForm__row">
          <button type="button" className="paymentForm__button paymentForm__button--100">
            <Link to="/">홈으로</Link>
          </button>
        </div>
      </form>
    </Container>
  );
};

export default PaymentForm;
