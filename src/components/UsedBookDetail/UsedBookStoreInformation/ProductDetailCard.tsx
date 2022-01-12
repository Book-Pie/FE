import { ProductDetailCardWrapper, UsedStoreUserThumbnail, FlexWrapper, UsedBookDetailButton } from "../style";
import UsedStoreUserContent from "./UsedStoreUserContent";

const ProductDetailCard = () => {
  return (
    <ProductDetailCardWrapper>
      <FlexWrapper>
        <UsedStoreUserThumbnail />
        <UsedStoreUserContent />
      </FlexWrapper>
      <UsedBookDetailButton small>팔로우</UsedBookDetailButton>
    </ProductDetailCardWrapper>
  );
};

export default ProductDetailCard;
