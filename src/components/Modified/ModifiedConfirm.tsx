import { Skeleton } from "@mui/material";
import { useForm } from "react-hook-form";
import { errorHandler } from "api/client";
import ErrorMessage from "elements/ErrorMessage";
import FormInput from "elements/FormInput";
import useDebounce from "hooks/useDebounce";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import { useTypedSelector } from "modules/store";
import * as Styled from "./style";
import * as Types from "./types";

const ModifiedConfirm = ({
  passwordOpions,
  setReconfirmation,
  handlePassword,
  handlePopupMessage,
}: Types.ModifiedConfirmProps) => {
  const { formState, handleSubmit, register } = useForm<Types.ModifiedConfirmForm>();
  const { isLoggedIn, token, user } = useTypedSelector(userReduceSelector);
  const { errors } = formState;
  const debounce = useDebounce();

  const handleModifiedConfirmSubmit = ({ password }: Types.ModifiedConfirmForm) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        if (!isLoggedIn || !token) throw new Error("로그인이 필요합니다.");
        await handlePassword(password, token, "post");
        setReconfirmation(true);
      } catch (error) {
        handlePopupMessage(false, errorHandler(error));
      }
    }, 500);
  };

  return (
    <Styled.ModifiedWrapper className="modified">
      <div className="modified__title">회원정보확인</div>
      <div className="modified__text">
        {user ? (
          <span className="modified__email">
            <span>{user.email}</span>
          </span>
        ) : (
          <Skeleton variant="text" width={140} height={40} animation="wave" />
        )}
        <span>님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인 합니다. </span>
      </div>
      <form className="modified__form" onSubmit={handleSubmit(handleModifiedConfirmSubmit)}>
        <div className="modified__form__row">
          <div className="modified__form__cell">
            <span>이메일</span>
          </div>
          <div className="modified__form__cell">
            {user ? <span>{user.email}</span> : <Skeleton variant="text" width={140} height={40} animation="wave" />}
          </div>
        </div>
        <div className="modified__form__row">
          <div className="modified__form__cell">
            <span>비밀번호</span>
          </div>
          <div className="modified__form__cell">
            <FormInput type="password" id="password" register={register("password", passwordOpions)} />
          </div>
        </div>
        <ErrorMessage message={errors.password?.message} />

        <div className="modified__buttons">
          <button type="submit">확인</button>
        </div>
      </form>
    </Styled.ModifiedWrapper>
  );
};

export default ModifiedConfirm;
