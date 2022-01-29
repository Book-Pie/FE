import RelatedUsedBook from "./RelatedUsedBook/RelatedUsedBook";
import { FlexWrapper } from "./style";
import UsedBookInquiry from "./UsedBookInquiry/UsedBookInquiry";
import UsedBookStoreInformationArea from "./UsedBookStoreInformation/UsedBookStoreInformationArea";

export interface UsedBookStoreInformationBottomParam {
  usedBookId: string;
}

export const UsedBookStoreInformationBottom = () => {
  return (
    <>
      <FlexWrapper>
        <UsedBookStoreInformationArea />
        <UsedBookInquiry />
      </FlexWrapper>
      <RelatedUsedBook />
    </>
  );
};

export default UsedBookStoreInformationBottom;
