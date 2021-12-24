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
import FormInput from "src/components/FormInput/FormInput";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import FormLabel from "src/components/FormLabel/FormLabel";
import DaumPostCode from "react-daum-postcode";
import { useEffect, useState } from "react";
import useDaumPost from "hooks/useDaumPost";
import axios from "axios";
import { FormErrorMessages, Rows, SignUpFormReponse, SignUpInputForm } from "./types";
import { Button, Row } from "./style";

const signUpInputFormInit: SignUpInputForm = {
  userId: "",
  userName: "",
  password: "",
  nickName: "",
  confirmPassword: "",
  mobileNumber: "",
  email: "",
  postalCode: "",
  address: "",
  detailedAddress: "",
};

const SignUpForm = () => {
  const { register, handleSubmit, reset, formState, setValue, watch, clearErrors, setFocus, setError } =
    useForm<SignUpInputForm>({
      defaultValues: signUpInputFormInit,
    });

  const [addressPopUpOpen, setAddressPopUpOpen] = useState(false);
  const { addressState, handleComplete } = useDaumPost();
  const [password, confirmPassword] = watch(["password", "confirmPassword"]);
  const { errors } = formState;

  const onSubmit = async (data: SignUpInputForm) => {
    try {
      const { address, detailedAddress, email, mobileNumber, nickName, password, postalCode, userId, userName } = data;
      // ... id, nickname 중복체크
      const responses = await Promise.all([
        axios.get<SignUpFormReponse>("http://localhost:3001/signup-userId-duplicate-success"),
        axios.get<SignUpFormReponse>("http://localhost:3001/signup-nickName-duplicate-success"),
      ]);
      const [userIdDuplicateValue, nickNameDuplicateValue] = responses;

      if (!userIdDuplicateValue.data.success) {
        setError("userId", { type: "duplicate", message: "아이디가 중복입니다." });
      }
      if (!nickNameDuplicateValue.data.success) {
        setError("nickName", { type: "duplicate", message: "닉네임이 중복입니다." });
      }

      if (userIdDuplicateValue.data.success && nickNameDuplicateValue.data.success) {
        console.log("회원가입");
        // ... 회원가입 api
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // axios 에러
      } else {
        // 런타임 에러
      }
    }
  };

  const handleReset = () => reset(signUpInputFormInit);

  const handlePopUpOpne = () => setAddressPopUpOpen(prve => !prve);

  const rows: Rows[] = [
    {
      id: "userId",
      placeholder: "아이디입력",
      text: "아이디",
      options: {
        maxLength: makeOption<number>(10, FormErrorMessages.MAX_LENGTH),
        minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
        validate: {
          specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
          korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
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
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
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
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
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
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
        validate: {
          korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
          whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
          misMatch: value => hookFormMisMatchCheck(value, password, FormErrorMessages.PASSWORD_MISMATCH),
        },
      },
    },
    {
      id: "userName",
      placeholder: "이름 입력",
      text: "이름",
      options: {
        maxLength: makeOption<number>(5, FormErrorMessages.MAX_LENGTH),
        minLength: makeOption<number>(3, FormErrorMessages.MIN_LENGTH),
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
        validate: {
          whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
          specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
        },
      },
    },

    {
      id: "mobileNumber",
      placeholder: "ex 000-0000-0000",
      text: "휴대폰 번호",
      options: {
        maxLength: makeOption<number>(14, FormErrorMessages.MAX_LENGTH),
        minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
        validate: {
          mobileNumber: value => hookFormMobileNumberPatternCheck(value, FormErrorMessages.MOBILE_NUMBER),
        },
      },
    },
    {
      id: "email",
      placeholder: "선택입력",
      text: "본인 확인 이메일",
      options: {
        maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
        minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
        validate: {
          email: value => hookFormEmailPatternCheck(value, FormErrorMessages.EMAIL),
        },
      },
    },
    {
      id: "postalCode",
      placeholder: "선택입력",
      text: "우편주소",
      disabled: true,
      options: {
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
      },
    },
    {
      id: "address",
      placeholder: "주소",
      text: "",
      disabled: true,
      options: {
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
      },
    },
    {
      id: "detailedAddress",
      placeholder: "상세주소",
      text: "",
      options: {
        maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
        minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
      },
    },
  ];

  const rowsEl = rows.map((row, idx) => {
    const { id, text, options } = row;

    const error = errors[`${id}`];
    return (
      <Row key={idx} isError={error?.message ? true : false}>
        <div>
          <FormLabel id={id} text={text} />
        </div>
        <FormInput {...row} register={register(id, options)} />
        <ErrorMessage message={error?.message} />
      </Row>
    );
  });

  useEffect(() => {
    const { addr, extraAddr, zonecode } = addressState;
    const { address, postalCode } = errors;

    if (addr && zonecode) {
      if (address || postalCode) {
        clearErrors(["postalCode", "address"]);
      }
      setValue("postalCode", zonecode);
      setValue("address", `${addr} ${extraAddr}`);
      setFocus("detailedAddress");
      setAddressPopUpOpen(false);
    }
  }, [addressState, errors, setValue, setAddressPopUpOpen, clearErrors, setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {rowsEl}
      {addressPopUpOpen && <DaumPostCode autoClose={false} onComplete={handleComplete} />}
      <div>
        <Button type="button" onClick={handlePopUpOpne}>
          주소 찾기
        </Button>
        <Button type="submit">회원가입</Button>
        <Button type="button" onClick={handleReset}>
          초기화
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
