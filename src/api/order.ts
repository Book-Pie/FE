import http, { makeAuthTokenHeader } from "api/http";

export const getOrder = <P>(payload: P, token: string) => http.post("/order", payload, makeAuthTokenHeader(token));
