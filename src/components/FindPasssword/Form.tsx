import FormInput from "src/elements/FormInput";
import FormLabel from "src/elements/FormLabel";
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
import ErrorMessage from "src/elements/ErrorMessage";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import withLoading from "src/hoc/withLoading";
import { Row } from "./style";
import { IFindPassword, IFindPasswordForm } from "./types";

const Form = ({ onSubmit }: IFindPasswordForm) => {
  const { register, handleSubmit, formState } = useForm<IFindPassword>();
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
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
      </Row>
      <Row>
        <FormLabel text="이름" />
        <FormInput
          placeholder="이름을 입력해주세요."
          register={register("name", {
            maxLength: makeOption<number>(5, FormErrorMessages.MAX_LENGTH),
            minLength: makeOption<number>(3, FormErrorMessages.MIN_LENGTH),
            required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
            validate: {
              whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
              specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
            },
          })}
        />
        <ErrorMessage message={errors.name?.message} />
      </Row>
      <Row>
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
      </Row>
      <Row>
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
      </Row>
      <Button type="submit" variant="contained" color="mainDarkBrown" fullWidth sx={{ mt: 2, mb: 2, height: 60 }}>
        변경
      </Button>
      <Link to="/find/email">
        <Button variant="contained" color="mainDarkBrown" fullWidth sx={{ mb: 2, height: 60 }}>
          이메일 찾기
        </Button>
      </Link>
    </form>
  );
};

export default withLoading(Form);
