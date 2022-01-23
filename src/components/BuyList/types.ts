export interface addUserReviewSubmitParam {
  orderId: string;
  content: string;
  rating: number;
  token: string;
}
export interface addUserReviewForm {
  addUserReviewSubmit: (data: addUserReviewSubmitParam) => void;
}
