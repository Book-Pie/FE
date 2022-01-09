import React from "react";
import { ReviewListEmptyParagraph, ReviewListEmptyWrapper } from "./style";

export const ReviewListEmpty: React.FC = () => (
  <ReviewListEmptyWrapper>
    <ReviewListEmptyParagraph>아직 등록된 리뷰가 없습니다.</ReviewListEmptyParagraph>
  </ReviewListEmptyWrapper>
);
