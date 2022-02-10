/**
 * 숫자를 천의자리 마다 콤마를 찍어주는 함수
 * @param 금액 문자열 or 숫자
 * @returns 10,000
 */
export const make1000UnitsCommaFormet = (text: string | number) => {
  const reversStr = String(text).split("").reverse();
  return reversStr.reduce((acc, cur, idx) => {
    if (idx % 3 === 0 && !cur.match("-")) return `${cur},${acc}`;
    return cur + acc;
  });
};

/**
 * 휴대번호 포멧에서 하이픈(-)을 제거해주는 함수
 * @param 하이픈(-)이 있는 휴대번호 문자열
 * @returns 01000000000 11자 0100000000 10자
 */
export const hyphenRemoveFormat = (text: string) => text.replaceAll("-", "");

/**
 * 휴대번호 포멧으로 변경해주는 함수
 * @param 휴대번호 문자열
 * @returns 010-0000-0000 11자 010-000-0000 10자
 * 휴대번호가 null인 유저는 빈문자열을 param으로 보내는경우가 생긴다.
 * 빈문자열을 reduce에 사용한다면 초기값이 없다라는 런타임 에러를 발생한다.
 * 런타임 에러를 방지하기위해 길이가 0인 문자열은 자기 자신을 리턴한다.
 */
export const hyphenFormat = (text: string) => {
  const { length } = text;

  if (length > 0) {
    return text.split("").reduce((acc, cur, idx) => {
      const hyphenText = `${acc}-${cur}`;

      if (idx === 3) return hyphenText;
      // 010-0000-0000 11자
      if (length === 11 && idx === 7) return hyphenText;
      // 010-000-0000 10자
      if (length === 10 && idx === 6) return hyphenText;

      return acc + cur;
    });
  }
  return text;
};

export const reviewDateFormat = (text: string) => {
  if (text === undefined) {
    return text;
  }
  return text.split("T", 1);
};

export function compareDateFormat(text: string) {
  if (!text) {
    return text;
  }
  const dateText = text.split("T", 1);
  const dateArr: string[] = dateText[0].split("-");
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const dateOneArr = dateArr.map(x => +x);
  const stDate = new Date(dateOneArr[0], dateOneArr[1], dateOneArr[2]);
  const endDate = new Date(year, month, day);

  const btMs = endDate.getTime() - stDate.getTime();
  const btDay = btMs / (1000 * 60 * 60 * 24);

  return btDay;
}

export function dateFormatOne(now: Date) {
  let month = now.getMonth() + 1;
  let day = now.getDate();

  const zero = 0;
  month = month >= 10 ? month : zero + month;
  day = day >= 10 ? day : zero + day;

  return `${now.getFullYear()}-${month}-${day}`;
}

export function dateFormat(date: Date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  const zero = 0;
  month = month >= 10 ? month : zero + month;
  day = day >= 10 ? day : zero + day;
  hour = hour >= 10 ? hour : zero + hour;
  minute = minute >= 10 ? minute : zero + minute;

  return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}`;
}

export const dateArrayFormat = (date: string | null) => {
  if (date) {
    const [YMD, HMS] = date.split("T");
    const [YYYY, MM, DD] = YMD.split("-");
    const [hh, mm, ss] = HMS.split(":");
    return [`${YYYY}년 ${MM}월 ${DD}일`, ` ${hh}시 ${mm}분 ${Number(ss).toFixed(0)}초`];
  }
  return "";
};
