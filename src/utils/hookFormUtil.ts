import { ValidationRule, ValidationValue } from "react-hook-form";

export const makeOption = <T extends ValidationValue>(validationValue: T, errorMessage: string): ValidationRule<T> => ({
  value: validationValue,
  message: errorMessage,
});

// 특수문자 검사
export const specialChractersCheck = (value: string) =>
  /[\\{\\}\\[\]\\/?.,;:|\\)*~`!^\-_+<>@\\#$%&\\\\=\\(\\'\\"]/gi.test(value);
// 한글 검사
export const koreaChractersCheck = (value: string) => /[가-힣ㄱ-ㅎㅏ-ㅣ]/gi.test(value);
// 공백 검사
export const whiteSpaceCheck = (value: string) => /\s/gi.test(value);
// 휴대번호 패턴 검사
export const mobileNumberPatternCheck = (value: string) => /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/gi.test(value);
// 이메일 패턴 검사
export const emailPatternCheck = (value: string) =>
  /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.(kr|com|net)$/gi.test(value);

// hook form validate는 retur값이 true면 유효성검사 통과입니다.
// 특정 패턴에 걸렸을때 문자열을 리턴해주면 validation message로 등록됩니다.
export const hookFormKoreaChractersCheck = (value: string, errorMessage: string) => {
  if (koreaChractersCheck(value)) {
    return errorMessage;
  }
  return true;
};
export const hookFormSpecialChractersCheck = (value: string, errorMessage: string) => {
  if (specialChractersCheck(value)) {
    return errorMessage;
  }
  return true;
};

export const hookFormWhiteSpaceCheck = (value: string, errorMessage: string) => {
  if (whiteSpaceCheck(value)) {
    return errorMessage;
  }
  return true;
};

export const hookFormMobileNumberPatternCheck = (value: string, errorMessage: string) => {
  if (mobileNumberPatternCheck(value) === false) {
    return errorMessage;
  }
  return true;
};

export const hookFormEmailPatternCheck = (value: string, errorMessage: string) => {
  if (emailPatternCheck(value) === false) {
    return errorMessage;
  }
  return true;
};

export const hookFormMisMatchCheck = (target: string, source: string, errorMessage: string) => {
  if (target !== source) {
    return errorMessage;
  }
  return true;
};
