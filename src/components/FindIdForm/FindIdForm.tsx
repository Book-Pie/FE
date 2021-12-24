import FormInput from "components/FormInput/FormInput";
import FormLabel from "components/FormLabel/FormLabel";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import { useForm } from "react-hook-form";
import {
  hookFormEmailPatternCheck,
  hookFormMobileNumberPatternCheck,
  hookFormSpecialChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
} from "src/utils/hookFormUtil";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Popup from "components/Popup/Popup";
import { FindIdInputForm, FormErrorMessages } from "./types";
import { Button, Row } from "./style";

const FindIdForm = () => {
  const history = useHistory();
  const { register, handleSubmit, formState } = useForm<FindIdInputForm>();
  const [isOpen, setIsOpen] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const { errors } = formState;

  const onSubmit = async (data: FindIdInputForm) => {
    function onMessages(message: string) {
      setPopUpMessage(message);
      setIsOpen(true);
    }

    try {
      const { email, mobileNumber, username } = data;
      // const response = await axios.get("http://localhost:3001/find-id-fail");
      const response = await axios.get("http://localhost:3001/find-id-success");
      const { success, error, data: userId } = response.data;

      // 응답 오류
      if (!success) {
        onMessages(error.message);
        return;
      }

      //  응답 성공
      history.push({
        pathname: "/find/result",
        state: {
          id: userId,
          path: "/find/id",
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // .. 서버오류
        console.error(error);
        onMessages("서버에서 오류가 발생했습니다.");
      } else {
        // 런타임 오류
        console.error(error);
        onMessages("클라이언트에서 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose className="red" closeDelay={2000}>
          <div>{popUpMessage}</div>
        </Popup>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormLabel text="이름" />
          <FormInput
            placeholder="이름을 입력해주세요."
            register={register("username", {
              maxLength: makeOption<number>(5, FormErrorMessages.MAX_LENGTH),
              minLength: makeOption<number>(3, FormErrorMessages.MIN_LENGTH),
              required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
              validate: {
                whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
                specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
              },
            })}
          />
          <ErrorMessage message={errors.username?.message} />
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
        <div>
          <Button type="submit">아이디 찾기</Button>
        </div>
      </form>
    </>
  );
};

export default FindIdForm;
