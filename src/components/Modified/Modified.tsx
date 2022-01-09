import { Link } from "react-router-dom";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import useSignIn from "hooks/useSignIn";
import FormLabel from "src/elements/FormLabel";
import { RegisterOptions, useForm } from "react-hook-form";
import ErrorMessage from "src/elements/ErrorMessage";
import {
  hookFormKoreaChractersCheck,
  hookFormMisMatchCheck,
  hookFormMobileNumberPatternCheck,
  hookFormSpecialChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
} from "utils/hookFormUtil";
import useDebounce from "hooks/useDebounce";
import { errorHandler } from "src/api/http";
import FormInput from "src/elements/FormInput";
import { FormErrorMessages } from "components/SignUpForm/types";
import Popup from "components/Popup/Popup";
import useDaumPost from "hooks/useDaumPost";
import DaumPostcode from "react-daum-postcode";
import { myProfileChange, passwordChange, passwordCheck } from "src/api/modified/modified";
import { myProfileAsync } from "modules/Slices/signIn/signInSlice";
import { hyphenRemoveFormat } from "src/utils/formatUtil";
import { useHistory } from "react-router";
import { ModifiedContainer } from "./style";
import {
  IAxiosPayload,
  IAxiosResponse,
  IModifiedConfirmForm,
  IModifiedForm,
  IMyProfileUpdatePayload,
  ModifiedProps,
} from "./types";

const Modified = ({ path }: ModifiedProps) => {
  const { signIn, dispatch } = useSignIn();
  const { user } = signIn;

  const modifiedConfirmForm = useForm<IModifiedConfirmForm>();
  const modifiedForm = useForm<IModifiedForm>();
  const [reconfirmation, setReconfirmation] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addressPopUpOpen, setAddressPopUpOpen] = useState<boolean>(false);
  const [newPassword, confirmPassword] = modifiedForm.watch(["newPassword", "confirmPassword"]);
  const { addressState, handleComplete } = useDaumPost();
  const debounce = useDebounce();
  const history = useHistory();
  const modifiedConfirmFormErrors = modifiedConfirmForm.formState.errors;
  const modifiedFormErrors = modifiedForm.formState.errors;

  const addressOptions: RegisterOptions = {
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
  };

  const passwordOpions: RegisterOptions = {
    maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    validate: {
      korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
      whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
    },
  };
  const newPasswordOpions: RegisterOptions = {
    maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    validate: {
      korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
      whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
      misMatch: value => hookFormMisMatchCheck(value, confirmPassword, FormErrorMessages.PASSWORD_MISMATCH),
    },
  };
  const confirmPasswordOpions: RegisterOptions = {
    maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    validate: {
      korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
      whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
      misMatch: value => hookFormMisMatchCheck(value, newPassword, FormErrorMessages.PASSWORD_MISMATCH),
    },
  };

  const nameOptions: RegisterOptions = {
    maxLength: makeOption<number>(10, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(3, FormErrorMessages.MIN_LENGTH),
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    validate: {
      whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
      specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
    },
  };

  const phoneOptions: RegisterOptions = {
    maxLength: makeOption<number>(14, FormErrorMessages.MAX_LENGTH),
    minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    validate: {
      mobileNumber: value => hookFormMobileNumberPatternCheck(value, FormErrorMessages.MOBILE_NUMBER),
    },
  };

  const handlePopUpOpne = useCallback(() => setAddressPopUpOpen(prve => !prve), []);
  const handlePasswordCheck = useCallback(async (password: string, token: string) => {
    const response = await passwordCheck<IAxiosResponse, IAxiosPayload>({ password }, token);
    const isSuccess = response.data.data;
    // 실패 시 false
    if (!isSuccess) throw new Error("비밀번호가 틀립니다.");
  }, []);

  const handlePasswordChange = useCallback(async (password: string, token: string) => {
    const response = await passwordChange<IAxiosResponse, IAxiosPayload>({ password }, token);
    const isSuccess = response.data.data;
    // 실패 시 false
    if (!isSuccess) throw new Error("비밀번호 변경에 실패 했습니다.");
  }, []);

  const handlePasswordCheckPass = useCallback(() => {
    if (user && user.loginType !== "LOCAL") setReconfirmation(true);
  }, [user]);

  const handlerError = useCallback((error: any) => {
    const message = errorHandler(error);
    setMessage(message);
    setIsOpen(true);
  }, []);

  const modifiedConfirmFormSubmit = (data: IModifiedConfirmForm) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        const { token } = signIn;
        if (user && token) {
          const { password } = data;
          await handlePasswordCheck(password, token);
          setReconfirmation(true);
        }
      } catch (error) {
        handlerError(error);
      }
    }, 500);
  };

  // 유저 정보 수정
  const modifiedFormSubmit = (formData: IModifiedForm) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        const { token } = signIn;
        if (user && token) {
          // 썽크함수 호출
          const { currentPassword } = formData;
          const { newPassword, detailAddress, mainAddress, postalCode, name, phone } = formData;
          // 일반 회원으로 가입한 유저면 비밀번호 체크 및 비밀번호 변경
          if (user.loginType === "LOCAL") {
            await handlePasswordCheck(currentPassword, token);
            await handlePasswordChange(newPassword, token);
          }
          const payload: IMyProfileUpdatePayload = {
            name,
            phone: hyphenRemoveFormat(phone),
            address: {
              postalCode,
              mainAddress,
              detailAddress,
            },
          };

          const myProfileChangeResponse = await myProfileChange<IAxiosResponse, IMyProfileUpdatePayload>(
            payload,
            token,
          );
          if (!myProfileChangeResponse.data.data) throw new Error("프로필 변경에 실패 했습니다.");
          // 변경된 프로필 갱신
          dispatch(myProfileAsync(token)).unwrap().catch(handlerError);
          history.replace("/");
        }
      } catch (error) {
        handlerError(error);
      }
    }, 500);
  };

  const handleMisMatchReset = useCallback(() => {
    if (newPassword === confirmPassword && newPassword !== "" && confirmPassword !== "")
      modifiedForm.clearErrors(["newPassword", "confirmPassword"]);
  }, [modifiedForm, newPassword, confirmPassword]);

  useEffect(() => {
    const { addr, extraAddr, zonecode } = addressState;
    const { mainAddress, postalCode } = modifiedForm.formState.errors;

    if (addr && zonecode) {
      if (mainAddress || postalCode) {
        modifiedForm.clearErrors(["postalCode", "mainAddress"]);
      }
      modifiedForm.setValue("postalCode", zonecode);
      modifiedForm.setValue("mainAddress", `${addr} ${extraAddr}`);
      modifiedForm.setValue("detailAddress", "");
      modifiedForm.setFocus("detailAddress");
    }
  }, [addressState, modifiedForm, setAddressPopUpOpen]);

  useEffect(() => {
    if (user && user.address) {
      const { address } = user;
      const { postalCode, detailAddress, mainAddress } = address;
      const { name } = user;
      modifiedForm.setValue("postalCode", postalCode);
      modifiedForm.setValue("mainAddress", mainAddress);
      modifiedForm.setValue("detailAddress", detailAddress);
      modifiedForm.setValue("name", name);
    }

    if (user && user.phone) {
      const { phone } = user;
      modifiedForm.setValue("phone", phone);
    }
  }, [user, modifiedForm]);

  useEffect(
    () => () => {
      if (debounce.current) clearTimeout(debounce.current);
    },
    [debounce],
  );

  useLayoutEffect(handlePasswordCheckPass, [handlePasswordCheckPass]);
  useEffect(handleMisMatchReset, [handleMisMatchReset]);

  if (user === null) return null;

  return (
    <ModifiedContainer>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} className="red" autoClose>
          {message}
        </Popup>
      )}
      {reconfirmation ? (
        <div className="modified">
          <div className="modified__title">회원정보 수정</div>
          <form className="modified__form" onSubmit={modifiedForm.handleSubmit(modifiedFormSubmit)}>
            <div className="modified__form--row">
              <div className="modified__form--inner">
                <span>아이디(이메일)</span>
              </div>
              <div className="modified__form--inner">{user.email}</div>
            </div>
            <div className="modified__form--row">
              <div className="modified__form--inner">
                <span>이름</span>
              </div>
              <div className="modified__form--inner">
                <FormInput type="text" id="name" register={modifiedForm.register("name", nameOptions)} />
                <ErrorMessage message={modifiedFormErrors.name?.message} />
              </div>
            </div>
            <div className="modified__form--row">
              <div className="modified__form--inner">
                <span>휴대폰 번호</span>
              </div>
              <div className="modified__form--inner">
                <FormInput
                  type="text"
                  id="phone"
                  register={modifiedForm.register("phone", phoneOptions)}
                  placeholder="ex) 010-000-0000"
                />
                <ErrorMessage message={modifiedFormErrors.phone?.message} />
              </div>
            </div>
            {user.loginType === "LOCAL" && (
              <div className="modified__form--row">
                <div className="modified__form__password">
                  <span>비밀번호 변경</span>
                </div>
                <div className="modified__form__password">
                  <div>
                    <FormLabel id="currentPassword" text="현재 비밀번호" />
                    <FormInput
                      type="password"
                      id="currentPassword"
                      register={modifiedForm.register("currentPassword", passwordOpions)}
                    />
                  </div>
                  <div className="modified__errorbox">
                    <ErrorMessage message={modifiedFormErrors.currentPassword?.message} />
                  </div>
                  <div>
                    <FormLabel id="newPassword" text="새 비밀번호" />
                    <FormInput
                      type="password"
                      id="newPassword"
                      register={modifiedForm.register("newPassword", newPasswordOpions)}
                    />
                  </div>
                  <div className="modified__errorbox">
                    <ErrorMessage message={modifiedFormErrors.newPassword?.message} />
                  </div>
                  <div>
                    <FormLabel id="confirmPassword" text="비밀번호 다시 입력" />
                    <FormInput
                      type="password"
                      id="confirmPassword"
                      register={modifiedForm.register("confirmPassword", confirmPasswordOpions)}
                    />
                  </div>
                  <div className="modified__errorbox">
                    <ErrorMessage message={modifiedFormErrors.confirmPassword?.message} />
                  </div>
                </div>
              </div>
            )}
            <div className="modified__form--row">
              <div className="modified__form__address">
                <span>배송지</span>
              </div>
              <div className="modified__form__address">
                <div>
                  <button type="button" onClick={handlePopUpOpne}>
                    우편찾기
                  </button>
                </div>
                <div>
                  <FormInput
                    disabled
                    type="text"
                    id="postalCode"
                    placeholder="우편번호"
                    register={modifiedForm.register("postalCode", addressOptions)}
                  />
                  <FormInput
                    disabled
                    type="text"
                    id="mainAddress"
                    placeholder="주소"
                    register={modifiedForm.register("mainAddress", addressOptions)}
                  />
                </div>
                <div>
                  <FormInput
                    type="text"
                    id="detailAddress"
                    placeholder="상세주소"
                    register={modifiedForm.register("detailAddress", addressOptions)}
                  />
                </div>
                <div className="modified__errorbox">
                  <ErrorMessage message={modifiedFormErrors.postalCode?.message} />
                </div>
                <div className="modified__errorbox">
                  <ErrorMessage message={modifiedFormErrors.mainAddress?.message} />
                </div>
                <div className="modified__errorbox">
                  <ErrorMessage message={modifiedFormErrors.detailAddress?.message} />
                </div>
              </div>
            </div>
            <div className="modified__buttons">
              <button type="submit">전송</button>
              <button type="button">
                <Link to={path}>취소</Link>
              </button>
              <button type="button" className="modified__buttons--reset" onClick={() => modifiedForm.reset()}>
                초기화
              </button>
            </div>
          </form>
          {addressPopUpOpen && (
            <div className="fixed">
              <DaumPostcode
                autoClose
                onComplete={handleComplete}
                onClose={() => handlePopUpOpne()}
                style={{
                  width: "50%",
                  boxShadow: "rgb(0 0 0 / 50%) 0px 4px 16px 0px",
                  height: "500px",
                }}
              />
              <button type="button" onClick={handlePopUpOpne}>
                닫기
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="modified">
          <div className="modified__title">회원정보확인</div>
          <div>
            <span className="modified__email">{user.email}</span>
            님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인 합니다.
          </div>
          <form className="modified__form" onSubmit={modifiedConfirmForm.handleSubmit(modifiedConfirmFormSubmit)}>
            <div className="modified__form--row">
              <div className="modified__form--inner">
                <span>아이디(이메일)</span>
              </div>
              <div className="modified__form--inner">{user.email}</div>
            </div>
            <div className="modified__form--row">
              <div className="modified__form--inner">
                <FormLabel id="password" text="비밀번호" />
              </div>
              <div className="modified__form--inner">
                <FormInput
                  type="password"
                  id="password"
                  register={modifiedConfirmForm.register("password", passwordOpions)}
                />
              </div>
            </div>
            <div className="modified__errorbox">
              <ErrorMessage message={modifiedConfirmFormErrors.password?.message} />
            </div>
            <div className="modified__buttons">
              <button type="submit">전송</button>
              <button type="button">
                <Link to={path}>취소</Link>
              </button>
            </div>
          </form>
        </div>
      )}
    </ModifiedContainer>
  );
};

export default Modified;
