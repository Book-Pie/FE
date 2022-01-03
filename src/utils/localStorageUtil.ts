import CryptoJS from "crypto-js";

const TOKEN_KEY = "BOOK_PIE_ACCESS_TOKEN";
const SAVE_EMAIL_KEY = "BOOK_PIE_SAVE_ID";
const SECRET_KEY = "Secret key";

export const setAccessToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

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
