import { Item, Page } from "src/modules/Slices/search/types";

export interface SearchUsedBookCardProp {
  page: Page | number;
}

export interface SearchReviewCardProp {
  page: Item | number;
}
