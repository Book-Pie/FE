import { useEffect, useState } from "react";
import { RegisterOptions } from "react-hook-form";
import ErrorMessage from "src/elements/ErrorMessage";
import FormInput from "src/elements/FormInput";
import FormLabel from "src/elements/FormLabel";
import { hookFormHtmlCheck, makeOption } from "src/utils/hookFormUtil";
import * as Styled from "./style";
import * as Types from "./types";

const EmailConfirm = ({ register, errors, isEmailconfirmRender }: Types.EmailConfirmProps) => {
  const [time, setTime] = useState(300);

  const codeOptions: RegisterOptions<Types.SignUpForm> = {
    maxLength: makeOption<number>(8, "인증코드는 최대8자입니다."),
    minLength: makeOption<number>(8, "인증코드는 최소8자입니다."),
    required: makeOption<boolean>(true, "인증코드는 필수입니다."),
    validate: {
      html: value => hookFormHtmlCheck(value, "HTML입력은 불가능합니다."),
    },
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isEmailconfirmRender && time > 0) timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, isEmailconfirmRender]);

  return (
    <Styled.InputWrapper isError={errors.code ? true : false}>
      <div className="timer">{time > 0 && `남은 시간 ${parseInt(String(time / 60), 10)}분 ${time % 60}초`}</div>
      <div>
        <FormLabel id="code" text="이메일인증" />
      </div>
      <div>
        <FormInput
          disabled={time > 0 ? false : true}
          id="code"
          placeholder={time > 0 ? "인증코드 8자를 입력하세요." : "인증 유효시간이 지났습니다."}
          register={register("code", codeOptions)}
        />
      </div>
      {errors.code && <ErrorMessage message={errors.code.message} />}
    </Styled.InputWrapper>
  );
};

export default EmailConfirm;
