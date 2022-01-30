import http, { makeAuthTokenHeader } from "api/http";

export const getOrder = <P>(payload: P, token: string) => {
  return http.post("/order", payload, makeAuthTokenHeader(token));
};

export const getOrderInfo = (orderId: string, token: string) => {
  return http.get(`/order/${orderId}`, makeAuthTokenHeader(token));
};

export const getUserOrderByUsedBookId = (usedBookId: string, token: string) => {
  return http.get(`/order/book/${usedBookId}`, makeAuthTokenHeader(token));
};
