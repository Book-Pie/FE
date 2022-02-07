import FormInput from "elements/FormInput";
import FormLabel from "elements/FormLabel";
import { useForm } from "react-hook-form";
import {
  hookFormEmailPatternCheck,
  hookFormKoreaChractersCheck,
  hookFormMobileNumberPatternCheck,
  hookFormSpecialChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
  FormErrorMessages,
} from "utils/hookFormUtil";
import ErrorMessage from "elements/ErrorMessage";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import withLoading from "hoc/withLoading";
import * as Styled from "./style";
import * as Types from "./types";

const Form = ({ onSubmit }: Types.FormProps) => {
  const { register, handleSubmit, formState } = useForm<Types.FindPasswordForm>();
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Styled.Row isError={errors.email ? true : false}>
        <FormLabel text="이메일" />
        <FormInput
          placeholder="이메일을 입력해주세요."
          register={register("email", {
            maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
            minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
            required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
            validate: {
              email: value => hookFormEmailPatternCheck(value, FormErrorMessages.EMAIL),
            },
          })}
        />
        <ErrorMessage message={errors.email?.message} />
      </Styled.Row>
      <Styled.Row isError={errors.name ? true : false}>
        <FormLabel text="이름" />
        <FormInput
          placeholder="이름을 입력해주세요."
          register={register("name", {
            maxLength: makeOption<number>(10, FormErrorMessages.MAX_LENGTH),
            minLength: makeOption<number>(3, FormErrorMessages.MIN_LENGTH),
            required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
            validate: {
              whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
              specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
            },
          })}
        />
        <ErrorMessage message={errors.name?.message} />
      </Styled.Row>
      <Styled.Row isError={errors.phone ? true : false}>
        <FormLabel text="휴대번호" />
        <FormInput
          placeholder="ex ) 010-0000-0000"
          register={register("phone", {
            maxLength: makeOption<number>(14, FormErrorMessages.MAX_LENGTH),
            minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
            required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
            validate: {
              mobileNumber: value => hookFormMobileNumberPatternCheck(value, FormErrorMessages.MOBILE_NUMBER),
            },
          })}
        />
        <ErrorMessage message={errors.phone?.message} />
      </Styled.Row>
      <Styled.Row isError={errors.password ? true : false}>
        <FormLabel text="새로운 비밀번호" />
        <FormInput
          type="password"
          placeholder="새 비밀번호를 입력해주세요."
          register={register("password", {
            maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
            minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
            required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
            validate: {
              korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
              whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
            },
          })}
        />
        <ErrorMessage message={errors.password?.message} />
      </Styled.Row>
      <Button type="submit" variant="contained" color="mainDarkBrown">
        변경
      </Button>
      <Link to="/find/email">
        <Button variant="contained" color="darkgray">
          이메일 찾기
        </Button>
      </Link>
    </form>
  );
};

export default withLoading(Form);
