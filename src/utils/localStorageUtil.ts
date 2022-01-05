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
// 유효하지 않은 토큰 테스트용도
export const setFakeAccessToken = () => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTRAbmF2ZXIuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0MTMxMzE2NywiZXhwIjoxNjQxMzE0OTY3fQ.Bnmt60eQr177unbTOs-SZ3es96Bkc37PAszDP4vApnU";
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeEmail = () => localStorage.removeItem(SAVE_EMAIL_KEY);
