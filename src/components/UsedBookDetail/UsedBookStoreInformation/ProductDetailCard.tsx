import { usedBookSelector } from "src/modules/Slices/usedBookDetail/usedBookDetail";
import { useTypedSelector } from "src/modules/store";
import { ProductDetailCardWrapper, UsedStoreUserThumbnail, FlexWrapper, UsedBookDetailButton } from "../style";
import UsedStoreUserContent from "./UsedStoreUserContent";

const ProductDetailCard = () => {
  const { content } = useTypedSelector(usedBookSelector);
  const { sellerId, sellerName } = content;

  return (
    <ProductDetailCardWrapper>
      <FlexWrapper>
        <UsedStoreUserThumbnail />
        <UsedStoreUserContent sellerId={sellerId} sellerName={sellerName} />
      </FlexWrapper>
      <UsedBookDetailButton small>팔로우</UsedBookDetailButton>
    </ProductDetailCardWrapper>
  );
};

export default ProductDetailCard;
