import { UsedBookBuyListResponse } from "src/modules/Slices/usedBookDetail/types";

export interface BuyList {
  pages: UsedBookBuyListResponse[];
}

export interface UserReviewModalItemProps {
  image?: string;
  price?: number;
  orderId?: string;
  bookId?: number;
  title?: string;
  reviewDate?: string;
  usedBookTitle?: string;
  orderDate?: string;
  sellerNickName?: string;
  buyerNickName?: string;
  userReviewId?: number;
  content?: string;
  rating?: number;
  reviewId?: number;
  state?: string;
  buyerName?: string;
  sellerName?: string;
}

export interface UserReviewModalProps {
  open: boolean;
  item: UserReviewModalItemProps;
  handleClose: () => void;
}

export interface IContent {
  pages: UsedBookBuyListResponse[];
  titleFilter: string | null;
  select: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AddUserReviewSubmitParam {
  orderId?: string;
  userReviewId?: string;
  content: string;
  rating: number;
  token: string;
}

export interface BuyListResponse {
  orderId: number;
  bookId: number;
  reviewId: string;
  title: string;
  image: string;
  price: number;
  sellerNickName: string;
  buyerNickName: string;
  state: string;
  orderDate: string;
}

export interface MyBuyList {
  pageCount: number;
  pages: BuyListResponse[];
  page: number;
  isEmpty: boolean;
}

export interface BuyListAxiosResponse {
  success: boolean;
  data: {
    pageCount: number;
    pages: BuyListResponse[];
  };
  error: null;
}
