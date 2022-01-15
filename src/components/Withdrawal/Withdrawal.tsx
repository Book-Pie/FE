import { useCallback, useEffect, useMemo, useState } from "react";
import FormInput from "src/elements/FormInput";
import { RegisterOptions, useForm } from "react-hook-form";
import useSignIn from "hooks/useSignIn";
import {
  hookFormKoreaChractersCheck,
  hookFormMisMatchCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
} from "src/utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import { passwordCheck, getWithDrawal } from "src/api/my/my";
import axios from "axios";
import { logout } from "modules/Slices/signIn/signInSlice";
import DropDown from "src/elements/DropDown";
import { FormErrorMessages } from "src/components/SignUpForm/types";
import { errorHandler } from "src/api/http";
import Popup from "src/elements/Popup";
import { getKakaoUnlink } from "src/utils/oAuthUtil";
import Editor from "../Editor/Editor";
import { IAxiosRequsetPayload, IAxiosResponse, IWithdrawalForm } from "./types";
import { Wrapper } from "./style";

const Withdrawal = () => {
  const currentReasonInit = useMemo(() => "탈퇴사유를 선택하세요.", []);
  const [currentReason, setCurrentReason] = useState(currentReasonInit);
  const { signIn, dispatch } = useSignIn();
  const { user, token } = signIn;
  const { formState, handleSubmit, register, watch, clearErrors } = useForm<IWithdrawalForm>();
  const { errors } = formState;
  const [password, confirmPassword] = watch(["password", "confirmPassword"]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [isOtherReasonsCheck, setIsOtherReasonsCheck] = useState(false);

  const passwordOpions: RegisterOptions = useMemo(
    () => ({
      maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
      minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
      required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
      validate: {
        korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
        whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
        misMatch: value => hookFormMisMatchCheck(value, confirmPassword, FormErrorMessages.PASSWORD_MISMATCH),
      },
    }),
    [confirmPassword],
  );

  const confirmPasswordOpions: RegisterOptions = useMemo(
    () => ({
      maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
      minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
      required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
      validate: {
        korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
        whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
        misMatch: value => hookFormMisMatchCheck(value, password, FormErrorMessages.PASSWORD_MISMATCH),
      },
    }),
    [password],
  );

  const onSubmit = async (formData: IWithdrawalForm) => {
    try {
      if (currentReason === currentReasonInit) throw new Error("탈퇴사유를 선택해주세요.");
      if (token === null) throw new Error("로그인을 부탁드립니다.");
      if (user === null) throw new Error("로그인을 부탁드립니다.");

      const { confirmPassword, password } = formData;

      const passwordPayload: IAxiosRequsetPayload = {
        password,
      };

      const confirmPayload: IAxiosRequsetPayload = {
        password: confirmPassword,
      };

      if (user.loginType === "LOCAL") {
        const responses = await axios.all([
          passwordCheck<IAxiosResponse, IAxiosRequsetPayload>(passwordPayload, token),
          passwordCheck<IAxiosResponse, IAxiosRequsetPayload>(confirmPayload, token),
        ]);

        responses.forEach(({ data: { data } }) => {
          if (!data) throw new Error("비밀번호가 틀립니다. 확인 부탁드립니다.");
        });
      }

      let reason = currentReason;
      if (currentReason === "기타" && isOtherReasonsCheck) {
        reason = editorValue;
      }

      if (user.loginType === "KAKAO") getKakaoUnlink();

      const response = await getWithDrawal<{ reason: string }>({ reason }, token);
      const { data } = response;
      if (data.data) {
        alert("회원 탈퇴가 완료되었습니다.");
        dispatch(logout());
      }
    } catch (error) {
      const message = errorHandler(error);
      setMessage(message);
      setIsOpen(true);
    }
  };

  const handleDropDownTextChange = useCallback((text: string) => {
    if (text === "기타") {
      setIsOtherReasonsCheck(true);
    } else {
      setIsOtherReasonsCheck(false);
    }
    setCurrentReason(text);
  }, []);

  const passwordMisMatchReset = useCallback(() => {
    if (password === confirmPassword && password !== "" && confirmPassword !== "") {
      clearErrors(["password", "confirmPassword"]);
    }
  }, [clearErrors, password, confirmPassword]);

  useEffect(passwordMisMatchReset, [passwordMisMatchReset]);

  const dropDownChildren = useMemo(() => {
    return (
      <>
        <li>
          <p>서비스가 부족</p>
        </li>
        <li>
          <p>이용불편</p>
        </li>
        <li>
          <p>기타</p>
        </li>
      </>
    );
  }, []);

  return (
    <>
      {isOpen && (
        <Popup autoClose className="red" isOpen={isOpen} setIsOpen={setIsOpen}>
          {message}
        </Popup>
      )}
      <Wrapper>
        <div>
          <div className="withdrawal__title">회원탈퇴</div>
          <p className="withdrawal__email withdrawal__text--center">{`${user?.email ?? ""}님`}</p>
          <p className="withdrawal__warning withdrawal__text--center withdrawal__warning--red">
            회원탈퇴사유를 입력해 주시면 앞으로 더욱더 개선해 나가는 북파이가 되도록 하겠습니다.
          </p>
          <div className="withdrawal__row">
            <span>
              탈퇴사유<strong className="withdrawal__warning--red"> *</strong>
            </span>
          </div>
          <div className="withdrawal__dropDown">
            <DropDown defaultValue={currentReason} setSelectedText={handleDropDownTextChange}>
              {dropDownChildren}
            </DropDown>
          </div>
          {isOtherReasonsCheck && (
            <Editor setEditorValue={setEditorValue} value={editorValue} placeholder="기타 사유를 입력해주세요." />
          )}
          <div className="withdrawal__email withdrawal__text--center">본인 확인</div>
          <form className="withdrawal__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="withdrawal__row">
              <div>이메일</div>
              <div>
                <FormInput value={user?.email ?? ""} disabled />
              </div>
            </div>
            {user?.loginType === "LOCAL" && (
              <>
                <div className="withdrawal__row">
                  <div>
                    비밀번호<strong className="withdrawal__warning--red ">*</strong>
                  </div>
                  <div>
                    <FormInput type="password" register={register("password", passwordOpions)} />
                    <ErrorMessage message={errors.password?.message} />
                  </div>
                </div>
                <div className="withdrawal__row">
                  <div>
                    비밀번호확인<strong className="withdrawal__warning--red ">*</strong>
                  </div>
                  <div>
                    <FormInput type="password" register={register("confirmPassword", confirmPasswordOpions)} />
                    <ErrorMessage message={errors.confirmPassword?.message} />
                  </div>
                </div>
              </>
            )}
            <div className="withdrawal__buttons">
              <button type="submit">탈퇴</button>
            </div>
          </form>
        </div>
      </Wrapper>
    </>
  );
};

export default Withdrawal;
