import { RegisterOptions, useForm } from "react-hook-form";
import useDaumPost from "src/hooks/useDaumPost";
import FormInput from "src/elements/FormInput";
import DaumPostcode from "react-daum-postcode";
import { useCallback, useEffect, useMemo, useState } from "react";
import Dropdown from "src/elements/DropDown";
import useSignIn from "hooks/useSignIn";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { makeOption } from "src/utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import Button from "@mui/material/Button";
import Popup from "src/elements/Popup";
import { getOrder } from "src/api/usedBook/usedBook";
import { useHistory } from "react-router";
import Loading from "src/elements/Loading";
import useDelay from "src/hooks/useDelay";
import { FormErrorMessages } from "utils/hookFormUtil";
import useWindowFiexd from "src/hooks/useWindowFiexd";
import DaumPostModal from "src/elements/DaumPostModal";
import * as Styled from "./style";
import * as Types from "./types";

const OrderForm = ({ usedBook }: Types.OrderFormProps) => {
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const deliveryTextInit = useMemo(() => "배송요청사항을 선택해주세요.", []);
  const { addressState, handleComplete } = useDaumPost();
  const { formState, register, handleSubmit, setValue, clearErrors, setFocus, reset } = useForm<Types.IOrderForm>();
  const deliveryTexts = useMemo(
    () => ["현관문 앞에 놓고 가세요.", "배송 전 전화 부탁드립니다.", "경비실에 맡겨주세요."],
    [],
  );

  const [isDaumPostcodeOpen, setIsDaumPostcodeOpen] = useState(false);
  const [deliveryText, setDeliveryText] = useState(deliveryTextInit);
  const { signIn } = useSignIn();
  const { user } = signIn;

  const { price } = usedBook;
  const { errors } = formState;
  const history = useHistory();
  const delay = useDelay(600);

  const addressOptions: RegisterOptions = {
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
  };
  const detailAddressOptions: RegisterOptions = {
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    maxLength: makeOption<number>(35, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
  };

  const handlePopUp = useCallback((isSuccess: boolean, message: string) => {
    setIsOpen(true);
    setPopUpState({
      isSuccess,
      message,
    });
  }, []);
  const handleReset = useCallback(() => reset(), [reset]);
  const handleDaumPostOpen = useCallback(() => setIsDaumPostcodeOpen(prev => !prev), []);
  const handleDaumPostClose = useCallback(() => setIsDaumPostcodeOpen(false), []);
  const handlePaymentPopUpOnClick = useCallback(() => {
    const name = "북파이 결제페이지";
    const url = "/payment";
    const popupX = window.screen.width / 2 - 200 / 2;
    const popupY = window.screen.height / 2 - 300 / 2;
    const option = `width = 850, height = 600, top = ${popupY}, left = ${popupX}, screenX=${popupX} screenY=${popupY} resizable=no`;
    const win = window.open(url, name, option);
    win?.addEventListener("beforeunload", () => window.location.reload());
  }, []);

  const onSumit = async (formData: Types.IOrderForm) => {
    try {
      setIsLoading(true);
      if (user && signIn.token) {
        const { detailAddress, mainAddress, postalCode } = formData;
        if (user.point.holdPoint - price < 0) {
          handlePopUp(false, "금액이 부족합니다.");
          return;
        }
        if (deliveryText === deliveryTextInit) {
          handlePopUp(false, "배송요청사항을 선택해주세요.");
          return;
        }

        const payload: Types.OrderRequest = {
          usedBookId: usedBook.usedBookId,
          address: {
            detailAddress,
            mainAddress,
            postalCode,
          },
          deliveryRequest: deliveryText,
        };

        const { data } = await getOrder<Types.OrderRequest>(payload, signIn.token);
        await delay();
        history.replace({
          pathname: `/order/${usedBook.usedBookId}/result`,
          state: data.data,
        });
      }
    } catch (error: any) {
      handlePopUp(false, error);
    } finally {
      setIsLoading(false);
    }
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

  if (user === null) return null;

  return (
    <Styled.OrderFormWrapper>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} className={popUpState.isSuccess ? "green" : "red"} autoClose>
          {popUpState.message}
        </Popup>
      )}
      <DaumPostModal
        isVisible={isDaumPostcodeOpen}
        handleComplete={handleComplete}
        handleDaumPostOpne={handleDaumPostOpen}
      />
      <Loading isLoading={isLoading} />
      <h1>결제하기</h1>
      <form onSubmit={handleSubmit(onSumit)} className="paymentForm__form">
        <Styled.OrderFormText>배송지</Styled.OrderFormText>
        <Styled.OrderFormRow>
          <Button variant="contained" sx={{ fontSize: "10px" }} color="mainDarkBrown" onClick={handleDaumPostOpen}>
            배송지 변경
          </Button>
        </Styled.OrderFormRow>
        <Styled.OrderFormRow>
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
        </Styled.OrderFormRow>
        <Styled.OrderFormRow>
          <ErrorMessage message={errors.postalCode?.message} />
          <ErrorMessage message={errors.mainAddress?.message} />
        </Styled.OrderFormRow>
        <Styled.OrderFormRow>
          <FormInput
            type="text"
            id="detailAddress"
            placeholder="상세주소"
            register={register("detailAddress", detailAddressOptions)}
          />
        </Styled.OrderFormRow>
        <Styled.OrderFormRow>
          <ErrorMessage message={errors.detailAddress?.message} />
        </Styled.OrderFormRow>
        <Styled.OrderFormText>배송요청사항</Styled.OrderFormText>
        <Styled.DropdownWrapper>
          <Dropdown defaultValue={deliveryText} setSelectedText={setDeliveryText}>
            {deliveryTexts.map((text, idx) => (
              <li key={idx}>
                <span>{text}</span>
              </li>
            ))}
          </Dropdown>
        </Styled.DropdownWrapper>
        <Styled.OrderFormText>포인트</Styled.OrderFormText>
        <Styled.OrderFormRow>
          <Button variant="contained" color="info" onClick={handlePaymentPopUpOnClick}>
            충전하기
          </Button>
        </Styled.OrderFormRow>
        <Styled.OrderFormText>결제</Styled.OrderFormText>
        <Styled.OrderFormPayment>
          <div>
            <span>현재포인트</span>
            <span>{`${make1000UnitsCommaFormet(String(user.point.holdPoint))}원`}</span>
          </div>
          <div>
            <span>상품 금액</span>
            <span>{`${make1000UnitsCommaFormet(String(price))}원`}</span>
          </div>
          <div>
            <span>총 결제 금액</span>
            <span>{`${make1000UnitsCommaFormet(String(price))}원`}</span>
          </div>
          <div>
            <span>결제 후 포인트</span>
            <span>
              {`
                ${make1000UnitsCommaFormet(String(user.point.holdPoint))}원 - ${make1000UnitsCommaFormet(
                String(price),
              )}원 = ${make1000UnitsCommaFormet(String(user.point.holdPoint - price))}원
              `}
            </span>
          </div>
        </Styled.OrderFormPayment>
        <Styled.OrderFormRow>
          <Button
            variant="contained"
            color="mainDarkBrown"
            fullWidth
            type="submit"
            disabled={user.point.holdPoint - price < 0 ? true : false}
          >
            {user.point.holdPoint - price < 0 ? "포인트가 부족합니다." : "결제하기"}
          </Button>
        </Styled.OrderFormRow>
        <Styled.OrderFormRow>
          <Button variant="contained" color="error" fullWidth onClick={handleReset}>
            초기화
          </Button>
        </Styled.OrderFormRow>
      </form>
    </Styled.OrderFormWrapper>
  );
};

export default OrderForm;
