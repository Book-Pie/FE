import React from "react";
import { ReviewList } from "../ReviewList/ReviewList";
import { ReviewWrite } from "../ReviewWrite";
import { ReviewsProps } from "./types";

export const Reviews: React.FC<ReviewsProps> = ({ bookId }) => {
  return (
    <div className="Reviews">
      {/* 정렬 부분 */}
      {/* <ReviewListHeader bookId={bookId} />*/}
      <ReviewList bookId={bookId} />
      <ReviewWrite bookId={bookId} myReviewId={0} />
    </div>
  );
};
