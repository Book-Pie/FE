import { RelatedUsedBookBoldTitle, RelatedUsedBookHashTagItem, RelatedUsedBookItemContentWrapper } from "../style";

const RelatedUsedBookItemContent = () => {
  const bookTitle = "창업가의 답";
  const hashTag = "#경영/경제";
  const bookPrice = "14400";

  return (
    <RelatedUsedBookItemContentWrapper>
      <RelatedUsedBookBoldTitle>{bookTitle}</RelatedUsedBookBoldTitle>
      <RelatedUsedBookHashTagItem>{hashTag}</RelatedUsedBookHashTagItem>
      <RelatedUsedBookBoldTitle brown>{bookPrice}</RelatedUsedBookBoldTitle>
    </RelatedUsedBookItemContentWrapper>
  );
};

export default RelatedUsedBookItemContent;
