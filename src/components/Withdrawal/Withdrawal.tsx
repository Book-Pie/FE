import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import FormInput from "components/FormInput/FormInput";
import { RegisterOptions, useForm } from "react-hook-form";
import useSignIn from "hooks/useSignIn";
import {
  hookFormKoreaChractersCheck,
  hookFormMisMatchCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
} from "src/utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import { passwordCheck } from "src/api/modified/modified";
import axios from "axios";
import { withDrawal } from "src/api/withDrawal/withDrawal";
import { logout } from "modules/Slices/signIn/signInSlice";
import DropDown from "components/DropDown/DropDown";
import { FormErrorMessages } from "components/SignUpForm/types";
import { errorHandler } from "src/api/http";
import Popup from "components/Popup/Popup";
import Editor from "../Editor/Editor";
import { IAxiosRequsetPayload, IAxiosResponse, IWithdrawalForm, WithdrawalProps } from "./types";
import { Contaniner, StyledSpan } from "./style";

const Withdrawal = ({ path }: WithdrawalProps) => {
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

      const { confirmPassword, password } = formData;

      const passwordPayload: IAxiosRequsetPayload = {
        password,
      };

      const confirmPayload: IAxiosRequsetPayload = {
        password: confirmPassword,
      };

      const responses = await axios.all([
        passwordCheck<IAxiosResponse, IAxiosRequsetPayload>(passwordPayload, token),
        passwordCheck<IAxiosResponse, IAxiosRequsetPayload>(confirmPayload, token),
      ]);

      responses.forEach(({ data: { data } }) => {
        if (!data) throw new Error("비밀번호가 틀립니다. 확인 부탁드립니다.");
      });

      let reason = currentReason;
      if (currentReason === "기타" && isOtherReasonsCheck) {
        reason = editorValue;
      }

      const response = await withDrawal<any, any>({ reason }, token);

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
          <StyledSpan>서비스가 부족</StyledSpan>
        </li>
        <li>
          <StyledSpan>이용불편</StyledSpan>
        </li>
        <li>
          <StyledSpan>기타</StyledSpan>
        </li>
      </>
    );
  }, []);

  if (user === null) return null;

  return (
    <>
      {isOpen && (
        <Popup autoClose className="red" isOpen={isOpen} setIsOpen={setIsOpen}>
          {message}
        </Popup>
      )}
      <Contaniner>
        <div>
          <div className="withdrawal__title withdrawal__text--center">탈퇴페이지</div>
          <div className="withdrawal__email withdrawal__text--center">{`${user.email}님`}</div>
          <div className="withdrawal__warning withdrawal__text--center withdrawal__warning--red">
            회원탈퇴사유를 입력해 주시면 앞으로 더욱더 개선해 나가는 모아모아가 되도록 하겠습니다.
          </div>
          <div className="withdrawal__dropDownWrap">
            <div>
              <span>
                탈퇴사유<strong className="withdrawal__warning--red">*</strong>
              </span>
            </div>
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
                <FormInput value={user.email} disabled />
              </div>
            </div>
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
            <div className="withdrawal__buttons">
              <button type="submit">탈퇴</button>
              <button type="button">
                <Link to={path}>뒤로가기</Link>
              </button>
            </div>
          </form>
        </div>
      </Contaniner>
    </>
  );
};

export default Withdrawal;
