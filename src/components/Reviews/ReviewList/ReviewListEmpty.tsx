import React from "react";
import { ReviewListEmpty_Paragraph, ReviewListEmptyWrapper } from "./style";

export const ReviewListEmpty: React.FC = () => (
  <ReviewListEmptyWrapper>
    <ReviewListEmpty_Paragraph>아직 등록된 리뷰가 없습니다.</ReviewListEmpty_Paragraph>
  </ReviewListEmptyWrapper>
);
