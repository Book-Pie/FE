export interface addUserReviewSubmitParam {
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

export interface addUserReviewForm {
  addUserReviewSubmit: (data: addUserReviewSubmitParam) => void;
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
