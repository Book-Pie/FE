import ErrorMessage from "src/elements/ErrorMessage";
import {
  hookFormEmailPatternCheck,
  hookFormKoreaChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
} from "utils/hookFormUtil";
import { useForm, Controller } from "react-hook-form";
import { errorReset, signInAsync } from "modules/Slices/signIn/signInSlice";
import { useCallback, useEffect, useState } from "react";
import { getRememberEmail } from "utils/localStorageUtil";
import Popup from "components/Popup/Popup";
import useSignIn from "hooks/useSignIn";
import useDebounce from "hooks/useDebounce";
import TextField from "@mui/material/TextField";
import { Form, FullSizeButton } from "./style";
import { IRows, ISignInForm, FormErrorMessages, SignInFormProps } from "./types";

const initialState: ISignInForm = {
  email: getRememberEmail(),
  password: "",
};

const SignInForm = ({ isRemember }: SignInFormProps) => {
  const { handleSubmit, control, formState } = useForm<ISignInForm>({
    defaultValues: initialState,
  });
  const debouncdRef = useDebounce();
  const { dispatch, signIn } = useSignIn();
  const [isOpen, setIsOpen] = useState(false);
  const { errors } = formState;
  const { error } = signIn;

  const onSubmit = (data: ISignInForm) => {
    const { email, password } = data;
    if (debouncdRef.current) clearTimeout(debouncdRef.current);
    debouncdRef.current = setTimeout(() => {
      dispatch(signInAsync({ isRemember, password, email }));
    }, 1000);
  };

  const inputs: IRows[] = [
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

  const handleError = useCallback(() => {
    if (error) setIsOpen(true);
    return () => {
      if (error) dispatch(errorReset());
    };
  }, [dispatch, error]);

  useEffect(handleError, [handleError]);
  return (
    <div>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} className="red" autoClose>
          {error}
        </Popup>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {inputs.map((input, idx) => {
            const { id, options, type } = input;
            const isError = errors[`${id}`] ? true : false;
            return (
              <div key={idx}>
                <Controller
                  name={id}
                  control={control}
                  rules={options}
                  render={({ field }) => (
                    <TextField {...field} label={id} error={isError} type={type} fullWidth color="mainDarkBrown" />
                  )}
                />
                <ErrorMessage message={errors[`${id}`]?.message} />
              </div>
            );
          })}
        </div>
        <div>
          <FullSizeButton type="submit">로그인</FullSizeButton>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
