import ErrorMessage from "elements/ErrorMessage";
import {
  FormErrorMessages,
  hookFormEmailPatternCheck,
  hookFormKoreaChractersCheck,
  hookFormWhiteSpaceCheck,
  makeOption,
} from "utils/hookFormUtil";
import { useForm, Controller } from "react-hook-form";
import { setClearError, fetchSignInAsync, userReduceSelector } from "modules/Slices/user/userSlice";
import { useCallback, useEffect, useState } from "react";
import { getRememberEmail, removeEmail, setRememberEmail } from "utils/localStorageUtil";
import Popup from "elements/Popup";
import useDebounce from "hooks/useDebounce";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useTypedSelector } from "modules/store";
import * as Styled from "./style";
import * as Types from "./types";

const SignInForm = ({ isRemember }: Types.SignInFormProps) => {
  const { handleSubmit, control, formState } = useForm<Types.SignInForm>({
    defaultValues: {
      email: getRememberEmail(),
      password: "",
    },
  });
  const debouncdRef = useDebounce();
  const dispatch = useAppDispatch();
  const { error } = useTypedSelector(userReduceSelector);
  const [isOpen, setIsOpen] = useState(false);
  const { errors } = formState;

  const onSubmit = (data: Types.SignInForm) => {
    const { email, password } = data;
    if (debouncdRef.current) clearTimeout(debouncdRef.current);
    debouncdRef.current = setTimeout(() => {
      setRememberEmail(email);
      if (!isRemember) removeEmail();
      dispatch(fetchSignInAsync({ password, email }));
    }, 1000);
  };

  const inputs: Types.Rows[] = [
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
      if (error) dispatch(setClearError());
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
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <Styled.Input>
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
        </Styled.Input>
        <Styled.Submit>
          <Styled.Button type="submit">로그인</Styled.Button>
        </Styled.Submit>
      </Styled.Form>
    </div>
  );
};

export default SignInForm;
