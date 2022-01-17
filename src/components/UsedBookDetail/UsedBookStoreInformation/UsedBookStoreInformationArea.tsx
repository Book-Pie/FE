import { UsedBookStoreInformationLeftWrapper } from "../style";
import UsedBookStoreInformation from "./UsedBookStoreInformation";
import UsedBookStoreReview from "./UsedBookStoreReview";

const UsedBookStoreInformationArea = () => {
  return (
    <UsedBookStoreInformationLeftWrapper>
      <UsedBookStoreInformation />
      <UsedBookStoreReview />
    </UsedBookStoreInformationLeftWrapper>
  );
};

export default UsedBookStoreInformationArea;
