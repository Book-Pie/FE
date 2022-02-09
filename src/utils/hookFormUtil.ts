import { ValidationRule, ValidationValue } from "react-hook-form";

export const FormErrorMessages = {
  MAX_LENGTH: "너무 깁니다.",
  MIN_LENGTH: "너무 짧습니다.",
  REQUIRED: "필수 입니다.",
  KOREA_CHARACTERS: "한글이 포함되었습니다.",
  SPECIAL_CHARACTERS: "특수문자가 포함되었습니다.",
  WHITE_SPACE: "공백이 포함 되었습니다.",
  MOBILE_NUMBER: "휴대번호 형식에 맞지 않습니다.",
  EMAIL: "이메일 형식에 맞지 않습니다.",
  PASSWORD_MISMATCH: "비밀번호가 서로 틀립니다.",
  EMAIL_REQUIRED: "이메일은 필수입니다.",
  NICKNAME_REQUIRED: "닉네임은 필수입니다.",
  PASSWORD_REQUIRED: "비밀번호는 필수입니다.",
  NAME_REQUIRED: "이름은 필수입니다.",
  PHONE_REQUIRED: "휴대번호는 필수입니다.",
  POST_REQUIRED: "우편번호는 필수입니다.",
  MAINADRRESS_REQUIRED: "주소는 필수입니다.",
  DETAILADRRESS_REQUIRED: "상세주소는 필수입니다.",
};

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
// html 패턴 검사
export const htmlTagPatternCheck = (value: string) => /(<([^>]+)>)/g.test(value);

/**
 * @param value isbn 10자리, 13자리
 * example Matches
 * 8956741891
 * 9791162244487
 * @returns boolean
 */
export const isbnPatternCheck = (value: string) =>
  /^(?:97[89][- ])?[0-9]{1,5}[- ][0-9]+[- ][0-9]+[- ][0-9X]$/gi.test(value);

// hook form validate는 retur값이 true면 유효성검사 통과입니다.
// 특정 패턴에 걸렸을때 문자열을 리턴해주면 validation message로 등록됩니다.

type HookFormCheckType = (value: string, errorMessage: string) => string | boolean;

export const hookFormKoreaChractersCheck: HookFormCheckType = (value, errorMessage) => {
  if (koreaChractersCheck(value)) {
    return errorMessage;
  }
  return true;
};
export const hookFormSpecialChractersCheck: HookFormCheckType = (value, errorMessage) => {
  if (specialChractersCheck(value)) {
    return errorMessage;
  }
  return true;
};

export const hookFormWhiteSpaceCheck: HookFormCheckType = (value, errorMessage) => {
  if (whiteSpaceCheck(value)) {
    return errorMessage;
  }
  return true;
};

export const hookFormMobileNumberPatternCheck: HookFormCheckType = (value, errorMessage) => {
  if (mobileNumberPatternCheck(value) === false) {
    return errorMessage;
  }
  return true;
};

export const hookFormEmailPatternCheck: HookFormCheckType = (value, errorMessage) => {
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

export const hookFormHtmlCheck: HookFormCheckType = (value, errorMessage) => {
  if (htmlTagPatternCheck(value)) {
    return errorMessage;
  }
  return true;
};

/**
 * @param value isbn 10자리, 13자리
 * example Matches
 * 8956741891
 * 9791162244487
 * @returns boolean | string
 */
export const hookFormIsbnCheck: HookFormCheckType = (value, errorMessage) => {
  // ISBN형식이 맞는지 체크 후
  // 유효한 ISBN인지 확인을 한다.
  // if (isbnPatternCheck(value) === false) {
  //   return errorMessage;
  // }

  const chars = value.replace(/[^0-9X]/g, "").split("");
  const last = chars.pop();
  let sum = 0;
  let digit = 10;
  let checksum;

  chars.forEach((str, i) => {
    if (chars.length === 9) {
      sum += digit * parseInt(str, 10);
      digit -= 1;
      return;
    }
    sum += ((i % 2) * 2 + 1) * parseInt(str, 10);
  });

  if (chars.length === 9) {
    checksum = 11 - (sum % 11);
    if (checksum === 10) {
      checksum = "X";
    } else if (checksum === 11) {
      checksum = "0";
    }
  } else {
    checksum = 10 - (sum % 10);
    if (checksum === 10) checksum = "0";
  }

  if (String(checksum) !== last) {
    return errorMessage;
  }

  return true;
};

export const stringEmptyCheck = (value: string) => {
  return value === "";
};
