import { useForm } from "react-hook-form";
import {
  makeOption,
  hookFormSpecialChractersCheck,
  hookFormKoreaChractersCheck,
  hookFormWhiteSpaceCheck,
  hookFormMobileNumberPatternCheck,
  hookFormEmailPatternCheck,
  hookFormMisMatchCheck,
  FormErrorMessages,
} from "utils/hookFormUtil";
import FormInput from "elements/FormInput";
import ErrorMessage from "elements/ErrorMessage";
import FormLabel from "elements/FormLabel";
import { useCallback, useEffect, useMemo, useState } from "react";
import useDaumPost from "hooks/useDaumPost";
import client, { errorHandler } from "api/client";
import axios from "axios";
import { useHistory } from "react-router";
import Popup from "elements/Popup";
import { hyphenRemoveFormat } from "utils/formatUtil";
import Button from "@mui/material/Button";
import naverImg from "assets/image/naver_oauth.png";
import kakaoImg from "assets/image/kakao_oauth.png";
import { Link } from "react-router-dom";
import DaumPostModal from "elements/DaumPostModal";
import usePopup from "hooks/usePopup";
import { Typography } from "@mui/material";
import useDebounce from "src/hooks/useDebounce";
import * as Types from "./types";
import * as Styled from "./style";
import EmailConfirm from "./EmailConfirm";

const kakaOauthUrl = process.env.KAKAO_OAUTH_URL;
const naverOauthUrl = process.env.NAVER_OAUTH_URL;

const init: Types.SignUpForm = {
  email: "",
  name: "",
  password: "",
  nickName: "",
  confirmPassword: "",
  phone: "",
  postalCode: "",
  mainAddress: "",
  detailAddress: "",
  code: "",
};

const SignUpForm = () => {
  const { register, handleSubmit, reset, formState, setValue, watch, clearErrors, setFocus } = useForm({
    defaultValues: init,
  });

  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false);
  const { addressState, handleComplete } = useDaumPost();
  const [password, confirmPassword] = watch(["password", "confirmPassword"]);
  const { errors } = formState;
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;
  const history = useHistory();
  const [isEmailconfirmRender, setIsEmailconfirmRender] = useState(false);
  const debounce = useDebounce();

  const onSubmit = async (data: Types.SignUpForm) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        let isEmailconfirmSuccessCheck = false;
        const { mainAddress, detailAddress, email, phone, nickName, password, postalCode, name, code } = data;
        if (code) {
          await client.post<{ email: string; code: string }, Types.EmailCodeReponse>("/user/email/code", {
            email,
            code,
          });
          isEmailconfirmSuccessCheck = true;
        }

        const validationResponse = await axios.all([
          client.get<Types.CheckReponse>(`/user/email/${email}`),
          client.get<Types.CheckReponse>(`/user/nickname/${nickName}`),
        ]);

        const [emailDuplicate, nickNameDuplicate] = validationResponse;

        if (!emailDuplicate.data) throw new Error("?????? ????????? ??????????????????.");
        if (!nickNameDuplicate.data) throw new Error("???????????? ??????????????????.");

        // ???????????? ????????? ???????????? ???????????? ??????????????????.
        if (isEmailconfirmSuccessCheck) {
          await client.post<Types.SignUpPayload>("/user/signup", {
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
          });
          alert("??????????????? ??????????????????.");
          history.replace("/signIn");
        } else {
          handlePopupMessage(true, "??????????????? ?????????????????????.");
          const { data } = await client.post<{ email: string }, Types.EmailCodeReponse>("/user/email", { email });
          if (!data) throw new Error("??????????????? ???????????? ??????????????????.");
          setIsEmailconfirmRender(true);
        }
      } catch (error) {
        const message = errorHandler(error);
        handlePopupMessage(false, message);
      }
    }, 1000);
  };

  const handleEmailConfirmResetClick = () => {
    setIsEmailconfirmRender(false);
  };
  const handleReset = useCallback(() => reset(init), [reset]);
  const handleDaumPostOpne = useCallback(() => setIsDaumPostOpen(prve => !prve), []);

  const inputOptions = useMemo((): Types.Row[] => {
    return [
      {
        id: "email",
        placeholder: "????????? ??????",
        text: "?????????",
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
        placeholder: "????????? ??????",
        text: "?????????",
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
        placeholder: "????????????(5~20??????)",
        text: "????????????",
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
        placeholder: "???????????? ?????????",
        text: "???????????? ?????????",
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
        placeholder: "?????? ??????",
        text: "??????",
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
        text: "????????????",
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
        placeholder: "????????????",
        text: "????????????",
        disabled: true,
        options: {
          required: makeOption<boolean>(true, FormErrorMessages.POST_REQUIRED),
        },
      },
      {
        id: "mainAddress",
        placeholder: "??????",
        text: "",
        disabled: true,
        options: {
          required: makeOption<boolean>(true, FormErrorMessages.MAINADRRESS_REQUIRED),
        },
      },
      {
        id: "detailAddress",
        placeholder: "????????????",
        text: "",
        options: {
          maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
          minLength: makeOption<number>(1, FormErrorMessages.MIN_LENGTH),
          required: makeOption<boolean>(true, FormErrorMessages.DETAILADRRESS_REQUIRED),
        },
      },
    ];
  }, [confirmPassword, password]);

  const rows = inputOptions.map((input, idx) => {
    const { id, text, options } = input;
    const isError = errors[`${id}`] ? true : false;
    return (
      <Styled.InputWrapper key={idx} isError={isError}>
        <div>
          <FormLabel id={id} text={text} />
        </div>
        <div>
          <FormInput disabled={isEmailconfirmRender} {...input} register={register(id, options)} />
        </div>
        {isError && <ErrorMessage message={errors[`${id}`]?.message} />}
      </Styled.InputWrapper>
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
    <Styled.SignUpWrapper>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} autoClose className={isSuccess ? "green" : "red"}>
          {message}
        </Popup>
      )}
      <DaumPostModal
        isVisible={isDaumPostOpen}
        handleComplete={handleComplete}
        handleDaumPostOpne={handleDaumPostOpne}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>{rows}</div>
        <div>
          {isEmailconfirmRender && (
            <div>
              <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
                ????????? ??????????????? ?????????????????????.
              </Typography>
              <Button variant="outlined" color="darkgray" onClick={handleEmailConfirmResetClick}>
                ????????????
              </Button>
              <EmailConfirm register={register} errors={errors} isEmailconfirmRender={isEmailconfirmRender} />
            </div>
          )}
          <Styled.ButtonWrapper>
            <Button variant="contained" color="mainDarkBrown" onClick={handleDaumPostOpne}>
              ????????????
            </Button>
            <Button variant="contained" color="darkgray" type="submit">
              ????????????
            </Button>
            <Button variant="contained" color="error" onClick={handleReset} disabled={isEmailconfirmRender}>
              ?????????
            </Button>
            <Link to="/signIn">
              <Button variant="contained" color="info">
                ???????????????
              </Button>
            </Link>
            <Styled.Oauths>
              <a href={naverOauthUrl}>
                <img src={naverImg} alt="naver" />
              </a>
              <a href={kakaOauthUrl}>
                <img src={kakaoImg} alt="kakao" />
              </a>
            </Styled.Oauths>
          </Styled.ButtonWrapper>
        </div>
      </form>
    </Styled.SignUpWrapper>
  );
};

export default SignUpForm;
