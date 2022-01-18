import http from "../http";

export const getCategory = <T>() => {
  return http.get<T>("/usedbook/category");
};

export const getUsedBooks = <T>(query: string) => {
  return http.get<T>(`/usedbook?${query}`);
};
export const getUsedBook = <T>(id: string) => {
  return http.get<T>(`/usedbook/${id}`);
};

export const getLatestUsedBook = () => http.get("/usedbook?limit=15");

export const getOrder = <P>(payload: P, token: string) => {
  return http.post("/order", payload, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  });
};

export const getMyOrder = (orderId: string, token: string) => {
  return http.get(`/order/${orderId}`, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  });
};

export const getBuyer = (userId: number, token: string) => {
  return http.get(`/order/buyer/${userId}`, {
    headers: { "X-AUTH-TOKEN": token },
  });
};
