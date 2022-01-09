import FormInput from "src/elements/FormInput";
import FormLabel from "src/elements/FormLabel";
import ErrorMessage from "src/elements/ErrorMessage";
import { useForm } from "react-hook-form";
import {
  hookFormMobileNumberPatternCheck,
  hookFormSpecialChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
} from "utils/hookFormUtil";
import { useState } from "react";
import { useHistory } from "react-router";
import Popup from "components/Popup/Popup";
import { errorHandler } from "src/api/http";
import { getFindEmail } from "src/api/find/find";
import useDebounce from "hooks/useDebounce";
import { hyphenRemoveFormat } from "src/utils/formatUtil";
import { AxiosResponse, IFindEmailForm, FormErrorMessages, HisotryState } from "./types";
import { Button, Row } from "./style";

const FindEmailForm = () => {
  const history = useHistory<HisotryState>();
  const { register, handleSubmit, formState } = useForm<IFindEmailForm>();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { errors } = formState;
  const debounceRef = useDebounce();

  const onSubmit = (formData: IFindEmailForm) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const { phone, name } = formData;
        const { data } = await getFindEmail<AxiosResponse, IFindEmailForm>({ phone: hyphenRemoveFormat(phone), name });

        const email = data.data;

        //  응답 성공
        history.push({
          pathname: "/find/result",
          state: {
            email,
            path: "email",
          },
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

export default FindEmailForm;
