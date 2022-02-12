import { BookItemProps, ParentsCategoryData } from "src/modules/Slices/book/types";

export interface BookReviewItemParam {
  card: BookItemProps;
}

export interface CategoryParams {
  item: ParentsCategoryData;
  key: number;
}

export interface HomeCategoryListParam {
  list: BookItemProps[];
}

export interface CategorysProps {
  categorys: ParentsCategoryData[];
  defaultLocation: string;
}
