import FormInput from "components/FormInput/FormInput";
import FormLabel from "components/FormLabel/FormLabel";
import { useForm } from "react-hook-form";
import {
  hookFormEmailPatternCheck,
  hookFormKoreaChractersCheck,
  hookFormMobileNumberPatternCheck,
  hookFormSpecialChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
} from "utils/hookFormUtil";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import axios from "axios";
import { useHistory } from "react-router";
import { useState } from "react";
import Popup from "components/Popup/Popup";
import { Button, Row } from "./style";
import { FindPasswordInputForm, FormErrorMessages } from "./types";

const FindPasswordForm = () => {
  const { register, handleSubmit, formState } = useForm<FindPasswordInputForm>();
  const [isOpen, setIsOpen] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  console.log("popUpMessage=>", popUpMessage);

  const history = useHistory();
  const { errors } = formState;

  const onSubmit = async (FormData: FindPasswordInputForm) => {
    function onMessages(message: string) {
      setPopUpMessage(message);
      setIsOpen(true);
    }

    try {
      const { email, mobileNumber, newPassword, userId, userName } = FormData;
      // const response = await axios.get("http://localhost:3001/find-password-fail");
      const response = await axios.get("http://localhost:3001/find-password-success");
      const { success, error } = response.data;

      // 응답 오류
      if (!success) {
        onMessages(error.message);
        return;
      }

      // 응답 성공
      history.push({
        pathname: "/find/result",
        state: {
          path: "/find/password",
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // axios 에러
        console.error(error);
        onMessages("서버에서 오류가 발생했습니다.");
      } else {
        // 런타임 에러
        console.error(error);
        onMessages("클라이언트에서 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose className="red" closeDelay={2000}>
          {popUpMessage}
        </Popup>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormLabel text="아이디" />
          <FormInput
            placeholder="아이디를 입력해주세요."
            register={register("userId", {
              maxLength: makeOption<number>(10, FormErrorMessages.MAX_LENGTH),
              minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
              required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
              validate: {
                specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
                korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
              },
            })}
          />
          <ErrorMessage message={errors.userId?.message} />
        </Row>
        <Row>
          <FormLabel text="이름" />
          <FormInput
            placeholder="이름을 입력해주세요."
            register={register("userName", {
              maxLength: makeOption<number>(5, FormErrorMessages.MAX_LENGTH),
              minLength: makeOption<number>(3, FormErrorMessages.MIN_LENGTH),
              required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
              validate: {
                whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
                specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
              },
            })}
          />
          <ErrorMessage message={errors.userName?.message} />
        </Row>
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
          <FormLabel text="휴대번호" />
          <FormInput
            placeholder="ex ) 010-0000-0000"
            register={register("mobileNumber", {
              maxLength: makeOption<number>(14, FormErrorMessages.MAX_LENGTH),
              minLength: makeOption<number>(10, FormErrorMessages.MIN_LENGTH),
              required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
              validate: {
                mobileNumber: value => hookFormMobileNumberPatternCheck(value, FormErrorMessages.MOBILE_NUMBER),
              },
            })}
          />
          <ErrorMessage message={errors.mobileNumber?.message} />
        </Row>
        <Row>
          <FormLabel text="새로운 비밀번호" />
          <FormInput
            type="password"
            placeholder="새 비밀번호를 입력해주세요."
            register={register("newPassword", {
              maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
              minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
              required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
              validate: {
                korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
                whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
              },
            })}
          />
          <ErrorMessage message={errors.newPassword?.message} />
        </Row>
        <Button type="submit">비밀번호 찾기 및 변경</Button>
      </form>
    </>
  );
};

export default FindPasswordForm;
