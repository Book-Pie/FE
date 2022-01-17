import RelatedUsedBook from "./RelatedUsedBook/RelatedUsedBook";
import { FlexWrapper } from "./style";
import UsedBookInquiry from "./UsedBookInquiry/UsedBookInquiry";
import UsedBookStoreInformationArea from "./UsedBookStoreInformation/UsedBookStoreInformationArea";

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
