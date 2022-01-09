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
import { useHistory } from "react-router";
import { useState } from "react";
import Popup from "components/Popup/Popup";
import { getFindPassword } from "src/api/find/find";
import { errorHandler } from "src/api/http";
import useDebounce from "hooks/useDebounce";
import { hyphenRemoveFormat } from "src/utils/formatUtil";
import { Button, Row } from "./style";
import { AxiosResponse, IFindPasswordForm, FormErrorMessages, HisotryState } from "./types";

const FindPasswordForm = () => {
  const { register, handleSubmit, formState } = useForm<IFindPasswordForm>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const history = useHistory<HisotryState>();
  const debounce = useDebounce();
  const { errors } = formState;

  const onSubmit = (FormData: IFindPasswordForm) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        const { email, phone, password, name } = FormData;
        await getFindPassword<AxiosResponse, IFindPasswordForm>({
          email,
          name,
          phone: hyphenRemoveFormat(phone),
          password,
        });

        // 응답 성공
        history.push({
          pathname: "/find/result",
          state: { path: "password" },
        });
      } catch (error) {
        const message = errorHandler(error);
        setIsOpen(true);
        setMessage(message);
      }
    }, 1000);
  };

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose className="red" closeDelay={2000}>
          {message}
        </Popup>
      )}
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
        <Button type="submit">비밀번호 찾기 및 변경</Button>
      </form>
    </>
  );
};

export default FindPasswordForm;
