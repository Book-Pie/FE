import CryptoJS from "crypto-js";

const TOKEN_KEY = "BOOK_PIE_ACCESS_TOKEN";
const SAVE_EMAIL_KEY = "BOOK_PIE_SAVE_ID";
const SECRET_KEY = "Secret key";
const REVIEW_DATA = "REVIEW_DATA";
const RATING_DATA = "RATING_DATA";
const SHOP_KEY = "MY_SHOP_PAGE";
const USED_BOOK_ORDER = "USED_BOOK_ORDER";
const FREE_BOARD_PAGE = "FREE_BOARD_PAGE";
const USED_BOOK_REPLY_PAGE = "USED_BOOK_REPLY_PAGE";

export const setAccessToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const setMyReview = (myComment: string) => localStorage.setItem(REVIEW_DATA, myComment);
export const getMyReview = () => localStorage.getItem(REVIEW_DATA);
export const removeMyReview = () => localStorage.removeItem(REVIEW_DATA);

export const setMyRating = (rating: string) => localStorage.setItem(RATING_DATA, rating);
export const getMyRating = () => localStorage.getItem(RATING_DATA);
export const removeMyRating = () => localStorage.removeItem(RATING_DATA);

export const setRememberEmail = (email: string) => {
  const encrypted = CryptoJS.AES.encrypt(email, SECRET_KEY);
  localStorage.setItem(SAVE_EMAIL_KEY, encrypted.toString());
};

export const getRememberEmail = () => {
  const email = localStorage.getItem(SAVE_EMAIL_KEY);

  if (email) {
    const decrypted = CryptoJS.AES.decrypt(email, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  return "";
};
export const removeEmail = () => localStorage.removeItem(SAVE_EMAIL_KEY);

export const getShopPage = (defaultValue?: number) => {
  if (defaultValue) {
    return Number(localStorage.getItem(SHOP_KEY) ?? defaultValue);
  }

  return Number(localStorage.getItem(SHOP_KEY));
};
export const setShopPage = (defaultValue?: number) => {
  localStorage.setItem(SHOP_KEY, String(defaultValue));
};

export const removeShopPage = () => {
  localStorage.removeItem(SHOP_KEY);
};

export const setUsedBookOrder = (text: string) => {
  localStorage.setItem(USED_BOOK_ORDER, text);
};
export const getUsedBookOrder = () => {
  const json = localStorage.getItem(USED_BOOK_ORDER);
  if (json) {
    return JSON.parse(json);
  }
  return "";
};
export const removeUsedBookOrder = () => localStorage.removeItem(USED_BOOK_ORDER);

export const setFreeBoardPage = (page: string | number) => {
  localStorage.setItem(FREE_BOARD_PAGE, String(page));
};
export const getFreeBoardPage = () => {
  return localStorage.getItem(FREE_BOARD_PAGE) ?? "0";
};
export const removeFreeBoardPage = () => localStorage.removeItem(FREE_BOARD_PAGE);

export const setUsedBookReplyPage = (page: number | string) => {
  localStorage.setItem(USED_BOOK_REPLY_PAGE, String(page));
};
export const getUsedBookReplyPage = () => {
  return Number(localStorage.getItem(USED_BOOK_REPLY_PAGE) ?? "0");
};
export const removeUsedBookReplyPage = () => localStorage.removeItem(USED_BOOK_REPLY_PAGE);
