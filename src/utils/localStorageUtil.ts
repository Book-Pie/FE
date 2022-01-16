import CryptoJS from "crypto-js";

const TOKEN_KEY = "BOOK_PIE_ACCESS_TOKEN";
const SAVE_EMAIL_KEY = "BOOK_PIE_SAVE_ID";
const SECRET_KEY = "Secret key";
const REVIEW_DATA = "REVIEW_DATA";
const SHOP_KEY = "MY_SHOP_PAGE";

export const setAccessToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const setMyReview = (myCommentDefault: string) => localStorage.setItem(REVIEW_DATA, myCommentDefault);
export const getMyReview = () => localStorage.getItem(REVIEW_DATA);
export const removeMyReview = () => localStorage.removeItem(REVIEW_DATA);

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
