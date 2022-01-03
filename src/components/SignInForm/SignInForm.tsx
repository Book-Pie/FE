import FormInput from "components/FormInput/FormInput";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import {
  hookFormEmailPatternCheck,
  hookFormKoreaChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
} from "utils/hookFormUtil";
import { useForm } from "react-hook-form";
import { setErrorReset, signInAsync } from "modules/Slices/signInSlice";
import { useEffect, useState } from "react";
import { getRememberEmail } from "utils/localStorageUtil";
import Popup from "components/Popup/Popup";
import useSignIn from "hooks/useSignIn";
import useDebounce from "hooks/useDebounce";
import { Button, Form } from "./style";
import { SignInInputs, SignInInputForm, FormErrorMessages, SignInFormProp } from "./types";

const initialState: SignInInputForm = {
  email: getRememberEmail(),
  password: "",
};

const SignInForm = ({ isRemember }: SignInFormProp) => {
  const { register, handleSubmit, formState } = useForm<SignInInputForm>({
    defaultValues: initialState,
  });
  const debouncdRef = useDebounce();
  const { dispatch, signIn } = useSignIn();
  const [isOpen, setIsOpen] = useState(false);
  const { errors } = formState;
  const { error } = signIn;

  useEffect(() => {
    if (error) setIsOpen(true);
    return () => {
      if (error) {
        dispatch(setErrorReset());
      }
    };
  }, [error, dispatch]);

  const onSubmit = (data: SignInInputForm) => {
    const { email, password } = data;
    if (debouncdRef.current) clearTimeout(debouncdRef.current);
    debouncdRef.current = setTimeout(() => {
      dispatch(signInAsync({ isRemember, password, email }));
    }, 1000);
  };

  const inputs: SignInInputs[] = [
    {
      id: "email",
      type: "text",
      placeholder: "이메일",
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
