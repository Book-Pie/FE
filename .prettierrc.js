// 주석을 쓰기위해 js 확장자로 따로 만들었습니다.
// .prettierrc로 하면 json파일로 인식해서 주석을 못쓰게됩니다.
// 주석이 필요없다면 .prettierrc로 만들어도됩니다.
module.exports = {
  singleQuote: false, // 문자열은 따옴표로 formatting
  parser: "typescript",
  semi: true, //코드 마지막에 세미콜른이 없게 formatting
  useTabs: false, //탭의 사용을 금하고 스페이스바 사용으로 대체하게 formatting
  tabWidth: 2, // 들여쓰기 너비는 2칸
  trailingComma: "all", // 객체나 배열 키:값 뒤에 항상 콤마를 붙히도록 formatting
  printWidth: 120, // 코드 한줄이 maximum 120칸
  arrowParens: "avoid", // 함수 인자가 한개라면 ()를 없앤다.
};
