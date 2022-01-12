import { CountWrapper, ProductDetailTitle, UsedBookStoreInformationWrapper } from "../style";

const UsedBookStoreReview = () => {
  const reviewCount = 10;

  return (
    <UsedBookStoreInformationWrapper height="500px">
      <ProductDetailTitle>
        상점후기 <CountWrapper>{reviewCount}</CountWrapper>
      </ProductDetailTitle>
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookStoreReview;
