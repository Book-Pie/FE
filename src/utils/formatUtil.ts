// 10000 => 10,000으로 변경해준다.
export const make1000UnitsCommaFormet = (text: string) => {
  const reversStr = text.split("").reverse();
  return reversStr.reduce((acc, cur, idx) => {
    if (idx % 3 === 0 && !cur.match("-")) return `${cur},${acc}`;
    return cur + acc;
  });
};

export const hyphenRemoveFormat = (text: string) => {
  return text.replaceAll("-", "");
};

export const addHyphenFormat = (text: string) => {
  const { length } = text;
  return text.split("").reduce((acc, cur, idx) => {
    const hyphenText = `${acc}-${cur}`;

    if (idx === 3) return hyphenText;
    // 010-0000-0000 11자
    if (length === 11 && idx === 7) return hyphenText;
    // 010-000-0000 10자
    if (length === 10 && idx === 6) return hyphenText;

    return acc + cur;
  });
};

export function dateTFormat(text: string) {
  if (!text) {
    return text;
  }
  return text.split("T", 1);
}

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

  const stDate = new Date(dateArr[0], dateArr[1], dateArr[2]);
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
export const dateFormat2 = (date: string | null) => {
  if (date) {
    const [YMD, HMS] = date.split("T");
    const [YYYY, MM, DD] = YMD.split("-");
    const [hh, mm, ss] = HMS.split(":");
    return [`${YYYY}년 ${MM}월 ${DD}일`, ` ${hh}시 ${mm}분 ${ss}초`];
  }

  return "";
};
