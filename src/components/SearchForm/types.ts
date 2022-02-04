import { Item, Page } from "modules/Slices/search/types";

export interface SearchUsedBookCardProp {
  page: Page | number;
}

export interface SearchReviewCardProp {
  page: Item | number;
}
export interface AladinFilterForm {
  keyword: string;
}
