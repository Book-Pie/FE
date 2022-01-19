import React from "react";
import { ReviewListEmptyParagraph, ReviewListEmptyWrapper } from "./style";

export interface ReviewListEmptyParam {
  title: string;
}

export const ReviewListEmpty: React.FC<ReviewListEmptyParam> = ({ title }) => (
  <ReviewListEmptyWrapper>
    <ReviewListEmptyParagraph>아직 등록된 {title}가 없습니다.</ReviewListEmptyParagraph>
  </ReviewListEmptyWrapper>
);
