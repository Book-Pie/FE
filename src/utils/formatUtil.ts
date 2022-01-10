// 10000 => 10,000으로 변경해준다.
export const make1000UnitsCommaFormet = (text: string) => {
  const reversStr = text.split("").reverse();
  return reversStr.reduce((acc, cur, idx) => {
    if (idx % 3 === 0) return `${cur},${acc}`;
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