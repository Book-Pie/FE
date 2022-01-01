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
import FormInput from "components/FormInput/FormInput";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import FormLabel from "components/FormLabel/FormLabel";
import DaumPostCode from "react-daum-postcode";
import { useEffect, useState } from "react";
import useDaumPost from "hooks/useDaumPost";
import http, { errorHandler } from "src/api/http";
import axios from "axios";
import { FormErrorMessages, Rows, SignUpFormReponse, SignUpInputForm } from "./types";
import { Button, Row } from "./style";
import Popup from "../Popup/Popup";

const signUpInputFormInit: SignUpInputForm = {
  userName: "",
  name: "",
  password: "",
  nickName: "",
  confirmPassword: "",
  phone: "",
  email: "",
  postalCode: "",
  mainAddress: "",
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
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: SignUpInputForm) => {
    try {
      const { mainAddress, detailedAddress, email, phone, nickName, password, postalCode, userName, name } = data;

      const validationReponse = await axios.all([
        http.get<SignUpFormReponse>(`/user/username/${userName}`),
        http.get<SignUpFormReponse>(`/user/nickname/${nickName}`),
        http.get<SignUpFormReponse>(`/user/email/${email}`),
      ]);

      // validation 모두 성공했을때 요청을 한다.
      const [userNameDuplicate, nickNameDuplicate, emailDuplicate] = validationReponse;

      if (userNameDuplicate.data.success === false) {
        setError("userName", { type: "duplicate", message: "아이디가 중복입니다." });
      }
      if (!nickNameDuplicate.data.success === false) {
        setError("nickName", { type: "duplicate", message: "닉네임이 중복입니다." });
      }
      if (!emailDuplicate.data.success === false) {
        setError("email", { type: "duplicate", message: "이메일이 중복입니다." });
      }

      const payload = {
        username: userName,
        password,
        name,
        phone,
        email,
        nickName,
        address: {
          postalCode,
          mainAddress,
          detailedAddress,
        },
      };

      await http.post<SignUpFormReponse>("/user/signup", payload);
    } catch (error) {
      const message = errorHandler(error);
      setIsOpen(true);
      setMessage(message);
    }
  };

  const handleReset = () => reset(signUpInputFormInit);

  const handlePopUpOpne = () => setAddressPopUpOpen(prve => !prve);

  const rows: Rows[] = [
    {
      id: "userName",
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
      id: "name",
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
      id: "phone",
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
      id: "mainAddress",
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
    const { mainAddress, postalCode } = errors;

    if (addr && zonecode) {
      if (mainAddress || postalCode) {
        clearErrors(["postalCode", "mainAddress"]);
      }
      setValue("postalCode", zonecode);
      setValue("mainAddress", `${addr} ${extraAddr}`);
      setFocus("detailedAddress");
      setAddressPopUpOpen(false);
    }
  }, [addressState, errors, setValue, setAddressPopUpOpen, clearErrors, setFocus]);

  return (
    <>
      {isOpen && (
        <Popup className="red" isOpen={isOpen} setIsOpen={setIsOpen} autoClose closeDelay={3000}>
          {message}
        </Popup>
      )}
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
    </>
  );
};

export default SignUpForm;
