import CryptoJS from "crypto-js";

const TOKEN_KEY = "BOOK_PIE_ACCESS_TOKEN";
const SAVE_ID_KEY = "BOOK_PIE_SAVE_ID";
const SECRET_KEY = "Secret key";

export const setAccessToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const setRememberId = (id: string) => {
  const encrypted = CryptoJS.AES.encrypt(id, SECRET_KEY);
  localStorage.setItem(SAVE_ID_KEY, encrypted.toString());
};

export const getRememberId = () => {
  const id = localStorage.getItem(SAVE_ID_KEY);

  if (id) {
    const decrypted = CryptoJS.AES.decrypt(id, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  return "";
};

export const removeId = () => localStorage.removeItem(SAVE_ID_KEY);
