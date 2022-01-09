import { useForm } from "react-hook-form";
import {
  makeOption,
  hookFormSpecialChractersCheck,
  hookFormKoreaChractersCheck,
  hookFormWhiteSpaceCheck,
  hookFormMobileNumberPatternCheck,
  hookFormEmailPatternCheck,
  hookFormMisMatchCheck,
} from "utils/hookFormUtil";
import FormInput from "src/elements/FormInput";
import ErrorMessage from "src/elements/ErrorMessage";
import FormLabel from "src/elements/FormLabel";
import DaumPostCode from "react-daum-postcode";
import { useEffect, useMemo, useState } from "react";
import useDaumPost from "hooks/useDaumPost";
import { errorHandler } from "src/api/http";
import axios from "axios";
import { getEmailDuplicateCheck, getNickNameDuplicateCheck, getSignUp } from "src/api/signUp/signUp";
import { useHistory } from "react-router";
import Popup from "components/Popup/Popup";
import { hyphenRemoveFormat } from "utils/formatUtil";
import Button from "@mui/material/Button";
import { FormErrorMessages, IAxiosPostPayload, IRows, SignUpFormReponse, ISignUpForm } from "./types";
import { InputWrapper, ButtonWrapper, SignUpWrapper, ErrorWrapper, DaumPostWrapper } from "./style";

const signUpFormInit: ISignUpForm = {
  email: "",
  name: "",
  password: "",
  nickName: "",
  confirmPassword: "",
  phone: "",
  postalCode: "",
  mainAddress: "",
  detailAddress: "",
};

const SignUpForm = () => {
  const { register, handleSubmit, reset, formState, setValue, watch, clearErrors, setFocus, setError } =
    useForm<ISignUpForm>({
      defaultValues: signUpFormInit,
    });

  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false);
  const { addressState, handleComplete } = useDaumPost();
  const [password, confirmPassword] = watch(["password", "confirmPassword"]);
  const { errors } = formState;
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const onSubmit = async (data: ISignUpForm) => {
    try {
      const { mainAddress, detailAddress, email, phone, nickName, password, postalCode, name } = data;

      const validationReponse = await axios.all([
        getEmailDuplicateCheck<SignUpFormReponse>(email),
        getNickNameDuplicateCheck<SignUpFormReponse>(nickName),
      ]);

      // validation 모두 성공했을때 요청을 한다.
      const [emailDuplicate, nickNameDuplicate] = validationReponse;

      // 중복은 false
      if (emailDuplicate.data.data === false) {
        setError("email", { type: "duplicate", message: "이메일이 중복입니다." });
      }
      if (nickNameDuplicate.data.data === false) {
        setError("nickName", { type: "duplicate", message: "닉네임이 중복입니다." });
      }

      if (nickNameDuplicate.data.data && emailDuplicate.data.data) {
        const payload: IAxiosPostPayload = {
          password,
          name,
          phone: hyphenRemoveFormat(phone),
          email,
          nickName,
          address: {
            postalCode,
            mainAddress,
            detailAddress,
          },
        };

        const response = await getSignUp<SignUpFormReponse, IAxiosPostPayload>(payload);
        const signUpData = response.data;
        if (signUpData.success) {
          history.push("/signIn");
        }
      }
    } catch (error) {
      const message = errorHandler(error);
      setIsOpen(true);
      setMessage(message);
    }
  };

  const handleReset = () => reset(signUpFormInit);
  const handleDaumPostOpne = () => setIsDaumPostOpen(prve => !prve);

  const rows = useMemo((): IRows[] => {
    return [
      {
        id: "email",
        placeholder: "이메일 입력",
        text: "이메일",
        options: {
          maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
          minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
          required: makeOption<boolean>(true, FormErrorMessages.EMAIL_REQUIRED),
          validate: {
            email: value => hookFormEmailPatternCheck(value, FormErrorMessages.EMAIL),
          },
        },
      },
      {
        id: "nickName",
        placeholder: "닉네임 입력",
        text: "닉네임",
        options: {
          maxLength: makeOption<number>(10, FormErrorMessages.MAX_LENGTH),
          minLength: makeOption<number>(3, FormErrorMessages.MIN_LENGTH),
          required: makeOption<boolean>(true, FormErrorMessages.NICKNAME_REQUIRED),
          validate: {
            specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
          },
        },
      },
      {
        id: "password",
        placeholder: "비밀번호(5~20자리)",
        text: "비밀번호",
        type: "password",
        options: {
          maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
          minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
          required: makeOption<boolean>(true, FormErrorMessages.PASSWORD_REQUIRED),
          validate: {
            korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
            whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
            misMatch: value => hookFormMisMatchCheck(value, confirmPassword, FormErrorMessages.PASSWORD_MISMATCH),
          },
        },
      },
      {
        id: "confirmPassword",
        placeholder: "비밀번호 재입력",
        text: "비밀번호 재확인",
        type: "password",
        options: {
          maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
          minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
          required: makeOption<boolean>(true, FormErrorMessages.PASSWORD_REQUIRED),
          validate: {
            korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
            whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
            misMatch: value => hookFormMisMatchCheck(value, password, FormErrorMessages.PASSWORD_MISMATCH),
          },
        },
      },
      {
        id: "name",
        placeholder: "이름 입력",
        text: "이름",
        options: {
          maxLength: makeOption<number>(5, FormErrorMessages.MAX_LENGTH),
          minLength: makeOption<number>(3, FormErrorMessages.MIN_LENGTH),
          required: makeOption<boolean>(true, FormErrorMessages.NAME_REQUIRED),
          validate: {
            whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
            specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
          },
        },
      },
      {
        id: "phone",
        placeholder: "ex 000-0000-0000",
        text: "휴대번호",
        options: {
          maxLength: makeOption<number>(14, FormErrorMessages.MAX_LENGTH),
          minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
          required: makeOption<boolean>(true, FormErrorMessages.PHONE_REQUIRED),
          validate: {
            mobileNumber: value => hookFormMobileNumberPatternCheck(value, FormErrorMessages.MOBILE_NUMBER),
          },
        },
      },
      {
        id: "postalCode",
        placeholder: "선택입력",
        text: "우편주소",
        disabled: true,
        options: {
          required: makeOption<boolean>(true, FormErrorMessages.POST_REQUIRED),
        },
      },
      {
        id: "mainAddress",
        placeholder: "주소",
        text: "",
        disabled: true,
        options: {
          required: makeOption<boolean>(true, FormErrorMessages.MAINADRRESS_REQUIRED),
        },
      },
      {
        id: "detailAddress",
        placeholder: "상세주소",
        text: "",
        options: {
          maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
          minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
          required: makeOption<boolean>(true, FormErrorMessages.DETAILADRRESS_REQUIRED),
        },
      },
    ];
  }, [confirmPassword, password]);

  const rowsEl = rows.map((row, idx) => {
    const { id, text, options } = row;
    const isError = errors[`${id}`] ? true : false;
    return (
      <InputWrapper key={idx} isError={isError}>
        <div>
          <FormLabel id={id} text={text} />
        </div>
        <div>
          <FormInput {...row} register={register(id, options)} />
        </div>
      </InputWrapper>
    );
  });

  useEffect(() => {
    const { addr, extraAddr, zonecode } = addressState;
    const { mainAddress, postalCode } = errors;

    if (addr && zonecode) {
      if (mainAddress || postalCode) {
        clearErrors(["postalCode", "mainAddress"]);
      }
      setValue("postalCode", zonecode);
      setValue("mainAddress", `${addr} ${extraAddr}`);
      setFocus("detailAddress");
      setIsDaumPostOpen(false);
    }
  }, [addressState, errors, setValue, setIsDaumPostOpen, clearErrors, setFocus]);

  return (
    <SignUpWrapper>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose>
          {message}
        </Popup>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {rowsEl}
          {isDaumPostOpen && (
            <DaumPostWrapper>
              <div>
                <DaumPostCode autoClose={false} onComplete={handleComplete} style={{ width: "400px" }} />
                <Button variant="contained" color="mainDarkBrown" onClick={handleDaumPostOpne}>
                  닫기
                </Button>
              </div>
            </DaumPostWrapper>
          )}
        </div>
        <div>
          <ErrorWrapper isError={Object.keys(errors).length !== 0}>
            <ErrorMessage message={errors.email?.message} />
            <ErrorMessage message={errors.nickName?.message} />
            <ErrorMessage message={errors.password?.message} />
            <ErrorMessage message={errors.confirmPassword?.message} />
            <ErrorMessage message={errors.name?.message} />
            <ErrorMessage message={errors.phone?.message} />
            <ErrorMessage message={errors.postalCode?.message} />
            <ErrorMessage message={errors.mainAddress?.message} />
            <ErrorMessage message={errors.detailAddress?.message} />
          </ErrorWrapper>
          <ButtonWrapper>
            <Button variant="contained" color="mainDarkBrown" onClick={handleDaumPostOpne}>
              주소찾기
            </Button>
            <Button variant="contained" color="mainDarkBrown" type="submit">
              회원가입
            </Button>
            <Button variant="contained" color="mainDarkBrown" onClick={handleReset}>
              초기화
            </Button>
          </ButtonWrapper>
        </div>
      </form>
    </SignUpWrapper>
  );
};

export default SignUpForm;
