export function dateFormat(date: {
  getMonth: () => number;
  getDate: () => any;
  getHours: () => any;
  getMinutes: () => any;
  getSeconds: () => any;
  getFullYear: () => string;
}) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;

  return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
