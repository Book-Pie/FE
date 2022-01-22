import * as T from "src/modules/Slices/search/types";

export interface UsedBooksResponse {
  success: boolean;
  data: T.UsedBookData;
  error: null;
}

export interface AladinResponse {
  success: boolean;
  data: T.AladinData;
  error: null;
}