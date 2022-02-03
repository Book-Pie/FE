import { useCallback, useEffect, useMemo, useState } from "react";
import FormInput from "elements/FormInput";
import { RegisterOptions, useForm } from "react-hook-form";
import {
  hookFormKoreaChractersCheck,
  hookFormMisMatchCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
  FormErrorMessages,
} from "utils/hookFormUtil";
import ErrorMessage from "elements/ErrorMessage";
import axios from "axios";
import { logout, userReduceSelector } from "modules/Slices/user/userSlice";
import DropDown from "elements/DropDown";
import { errorHandler } from "api/http";
import Popup from "elements/Popup";
import { getKakaoUnlink } from "utils/oAuthUtil";
import Editor from "components/Editor/Editor";
import { useAppDispatch, useTypedSelector } from "modules/store";
import client, { makeAuthTokenHeader } from "src/api/client";
import usePopup from "src/hooks/usePopup";
import * as Types from "./types";
import * as Styled from "./style";

const Withdrawal = () => {
  const currentReasonInit = useMemo(() => "탈퇴사유를 선택하세요.", []);
  const [currentReason, setCurrentReason] = useState(currentReasonInit);
  const dispatch = useAppDispatch();
  const { user, token } = useTypedSelector(userReduceSelector);
  const { formState, handleSubmit, register, watch, clearErrors } = useForm<Types.WithdrawalForm>();
  const { errors } = formState;
  const [password, confirmPassword] = watch(["password", "confirmPassword"]);
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
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

  const handleWithdrawalOnSubmit = async ({ confirmPassword, password }: Types.WithdrawalForm) => {
    try {
      if (currentReason === currentReasonInit) throw new Error("탈퇴사유를 선택해주세요.");
      if (!user || !token) throw new Error("로그인이 필요합니다.");

      if (user.loginType === "LOCAL") {
        const responses = await axios.all<Types.PasswordCheckResponse>([
          client.post<Types.PasswordCheckRequset, Types.PasswordCheckResponse>(
            "/user/password",
            { password },
            makeAuthTokenHeader(token),
          ),
          client.post<Types.PasswordCheckRequset, Types.PasswordCheckResponse>(
            "/user/password",
            { password: confirmPassword },
            makeAuthTokenHeader(token),
          ),
        ]);
        responses.forEach(({ data }) => {
          if (!data) throw new Error("비밀번호가 틀립니다.");
        });
      }

      let reason = currentReason;
      if (currentReason === "기타" && isOtherReasonsCheck) reason = editorValue;
      if (user.loginType === "KAKAO") getKakaoUnlink();

      const config = makeAuthTokenHeader(token);
      config.data = { reason };
      const { data } = await client.delete<Types.WithdrawalResponse>("/user/me", config);
      if (!data) throw new Error("회원 탈퇴에 실패했습니다.");
      alert("회원 탈퇴가 완료되었습니다.");
      dispatch(logout());
    } catch (error) {
      const message = errorHandler(error);
      handlePopupMessage(false, message);
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

  useEffect(() => {
    const handlePasswordMisMatchReset = () => {
      if (password === confirmPassword && password !== "" && confirmPassword !== "") {
        clearErrors(["password", "confirmPassword"]);
      }
    };
    handlePasswordMisMatchReset();
  }, [clearErrors, password, confirmPassword]);

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
      {popupState.isOpen && (
        <Popup autoClose className="red" isOpen={popupState.isOpen} setIsOpen={handlePopupClose}>
          {popupState.message}
        </Popup>
      )}
      <Styled.WithDrawalWrapper>
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
        <form className="withdrawal__form" onSubmit={handleSubmit(handleWithdrawalOnSubmit)}>
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
                  비밀번호 확인<strong className="withdrawal__warning--red ">*</strong>
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
      </Styled.WithDrawalWrapper>
    </>
  );
};

export default Withdrawal;
