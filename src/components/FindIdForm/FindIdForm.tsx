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
} from "utils/hookFormUtil";
import { useState } from "react";
import { useHistory } from "react-router";
import Popup from "components/Popup/Popup";
import { errorHandler } from "src/api/http";
import { getFindId } from "src/api/find/find";
import { AxiosPayload, AxiosResponse, FindIdInputForm, FormErrorMessages } from "./types";
import { Button, Row } from "./style";

const FindIdForm = () => {
  const history = useHistory();
  const { register, handleSubmit, formState } = useForm<FindIdInputForm>();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { errors } = formState;

  const onSubmit = async (data: FindIdInputForm) => {
    try {
      const { email, phone, name } = data;
      const response = await getFindId<AxiosResponse, AxiosPayload>({ email, phone, name });
      const username = response.data.data;

      //  응답 성공
      history.push({
        pathname: "/find/result",
        state: {
          username,
          path: "id",
        },
      });
    } catch (error) {
      const message = errorHandler(error);
      setIsOpen(true);
      setMessage(message);
    }
  };

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose className="red" closeDelay={2000}>
          <div>{message}</div>
        </Popup>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div>
          <Button type="submit">아이디 찾기</Button>
        </div>
      </form>
    </>
  );
};

export default FindIdForm;
