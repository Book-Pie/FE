import ProductDetailCard from "components/UsedBookDetail/UsedBookStoreInformation/ProductDetailCard";
import { ProductDetailTitle, UsedBookStoreInformationWrapper } from "../style";

const UsedBookStoreInformation = () => {
  return (
    <UsedBookStoreInformationWrapper height="340px">
      <ProductDetailTitle>상점정보</ProductDetailTitle>
      <ProductDetailCard />
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookStoreInformation;
