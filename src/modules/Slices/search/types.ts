import { AppDispatch, RootState } from "modules/store";
import { History } from "history";

type Status = "idle" | "loading";
type Error = string | null;

export interface Page {
  id: number;
  title: string;
  price: number;
  image: string;
  uploadDate: string;
  modifiedDate: string;
  state: string;
  likeCount: number;
  replyCount: number;
}

export interface ThunkApi {
  dispatch: AppDispatch;
  state: RootState;
  extra: {
    history: History;
  };
  rejectValue: string;
}

export interface Item {
  author: string;
  isbn: string;
  link: string;
  description: string;
  title: string;
  pubDate: Date;
  categoryName: string;
  fixedPrice: boolean;
  mallType: string;
  customerReviewRank: number;
  cover: string;
  itemId: number;
  isbn13: string;
  stockStatus: string;
  publisher: string;
  priceSales: number;
  salesPoint: number;
  adult: boolean;
  categoryId: number;
  priceStandard: number;
  mileage: number;
}

export interface UsedBookData {
  pages: Page[];
  pageCount: number;
}

export interface AladinData {
  totalResults: number;
  startIndex: number;
  item: Item[];
  itemsPerPage: number;
  searchCategoryName: string;
  query: string;
  link: string;
  logo: string;
  title: string;
  version: string;
  pubDate: string;
  searchCategoryId: number;
}

export interface SearchReduce {
  usedBook: {
    status: Status;
    pages: Page[] | null;
    error: Error;
    pageCount: number;
  };
  bookReview: {
    status: Status;
    error: Error;
    pages: Item[] | null;
    pageCount: number;
    page: number;
  };
}

export interface AladinBookParam {
  query: string;
  isReload: boolean;
}

export type SearchUsedBooksAsyncSuccess = UsedBookData;
export interface SearchAladinBooksAsyncSuccess {
  isReload: boolean;
  data: AladinData | null;
}
