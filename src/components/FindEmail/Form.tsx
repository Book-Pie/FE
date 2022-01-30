import FormInput from "elements/FormInput";
import FormLabel from "elements/FormLabel";
import ErrorMessage from "elements/ErrorMessage";
import { useForm } from "react-hook-form";
import {
  hookFormMobileNumberPatternCheck,
  hookFormSpecialChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
  FormErrorMessages,
} from "utils/hookFormUtil";
import withLoading from "hoc/withLoading";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import * as Types from "./types";
import * as Styled from "./style";

const Form = ({ onSubmit }: Types.FormProps) => {
  const { register, handleSubmit, formState } = useForm<Types.FindEmailForm>();
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button type="submit" variant="contained" color="mainDarkBrown" fullWidth sx={{ mt: 2, mb: 2, height: 60 }}>
        찾기
      </Button>
      <Link to="/find/password">
        <Button variant="contained" color="mainDarkBrown" fullWidth sx={{ mb: 2, height: 60 }}>
          비밀번호 찾기
        </Button>
      </Link>
    </form>
  );
};

export default withLoading(Form);
