import { CountWrapper, ProductDetailTitle, UsedBookStoreInformationWrapper } from "../style";

const UsedBookStoreReview = () => {
  const reviewCount = 0;

  return (
    <UsedBookStoreInformationWrapper height="500px">
      <ProductDetailTitle>
        <div>
          상점후기 <CountWrapper>{reviewCount}</CountWrapper>
        </div>
      </ProductDetailTitle>
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookStoreReview;
