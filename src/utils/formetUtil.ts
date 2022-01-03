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
