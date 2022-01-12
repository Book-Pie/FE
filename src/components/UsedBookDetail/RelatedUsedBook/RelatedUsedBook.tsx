import RelatedUsedBookList from "./RelatedUsedBookList";
import { NormalTitle, RelatedUsedBookWrapper } from "../style";

const RelatedUsedBook = () => {
  return (
    <RelatedUsedBookWrapper>
      <NormalTitle>연관 상품</NormalTitle>
      <RelatedUsedBookList />
    </RelatedUsedBookWrapper>
  );
};

export default RelatedUsedBook;
