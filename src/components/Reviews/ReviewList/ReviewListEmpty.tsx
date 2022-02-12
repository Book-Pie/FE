import React from "react";
import { ReviewEmptyParagraph, ReviewEmptyWrapper } from "./style";
import { ReviewListEmptyParam } from "./types";

export const ReviewListEmpty: React.FC<ReviewListEmptyParam> = ({ title }) => (
  <ReviewEmptyWrapper>
    <ReviewEmptyParagraph>아직 등록된 {title}가 없습니다.</ReviewEmptyParagraph>
  </ReviewEmptyWrapper>
);
