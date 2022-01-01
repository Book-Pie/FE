import FormInput from "components/FormInput/FormInput";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import {
  hookFormKoreaChractersCheck,
  hookFormSpecialChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
} from "utils/hookFormUtil";
import { useForm } from "react-hook-form";
import { signInAsync } from "modules/Slices/signInSlice";
import { useEffect, useState } from "react";
import { getRememberId } from "utils/localStorageUtil";
import Popup from "components/Popup/Popup";
import useSignIn from "hooks/useSignIn";
import { Button, Form } from "./style";
import { SignInInputs, SignInInputForm, FormErrorMessages, SignInFormProp } from "./types";

const initialState: SignInInputForm = {
  id: getRememberId(),
  password: "",
};

const SignInForm = ({ isRemember }: SignInFormProp) => {
  const { register, handleSubmit, formState } = useForm<SignInInputForm>({
    defaultValues: initialState,
  });
  const { dispatch, signIn } = useSignIn();
  const [isOpen, setIsOpen] = useState(false);
  const { errors } = formState;
  const { error } = signIn;

  useEffect(() => {
    if (error) setIsOpen(true);
  }, [error]);

  const onSubmit = (data: SignInInputForm) => {
    const { id: username, password } = data;
    dispatch(signInAsync({ isRemember, password, username }));
  };

  const inputs: SignInInputs[] = [
    {
      id: "id",
      type: "text",
      placeholder: "아이디",
      options: {
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
        maxLength: makeOption<number>(10, FormErrorMessages.MAX_LENGTH),
        minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
        validate: {
          korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
          special: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
        },
      },
    },
    {
      id: "password",
      type: "password",
      placeholder: "비밀번호",
      options: {
        required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
        maxLength: makeOption<number>(20, FormErrorMessages.MAX_LENGTH),
        minLength: makeOption<number>(5, FormErrorMessages.MIN_LENGTH),
        validate: {
          korea: value => hookFormKoreaChractersCheck(value, FormErrorMessages.KOREA_CHARACTERS),
          whiteSpace: value => hookFormWhiteSpaceCheck(value, FormErrorMessages.WHITE_SPACE),
        },
      },
    },
  ];

  return (
    <div>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} className="red" autoClose>
          {error?.message}
        </Popup>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {inputs.map((input, idx) => {
            const { id, options } = input;
            return (
              <div key={idx}>
                <FormInput {...input} register={register(id, options)} />
                <ErrorMessage message={errors[`${id}`]?.message} />
              </div>
            );
          })}
        </div>
        <div>
          <Button type="submit">로그인</Button>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
