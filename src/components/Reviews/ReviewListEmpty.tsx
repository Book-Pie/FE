import { ReviewEmptyParagraph, ReviewEmptyWrapper } from "./style";
import { ReviewListEmptyParam } from "./types";

export const ReviewListEmpty = ({ title }: ReviewListEmptyParam) => (
  <ReviewEmptyWrapper>
    <ReviewEmptyParagraph>아직 등록된 {title}가 없습니다.</ReviewEmptyParagraph>
  </ReviewEmptyWrapper>
);
