import profileImg from "src/assets/image/pie3x.png";
import { usedBookSelector } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import {
  ProductDetailCardWrapper,
  UsedStoreUserThumbnail,
  FlexWrapper,
  UsedBookDetailButton,
  BigPieImg,
} from "../style";
import UsedStoreUserContent from "./UsedStoreUserContent";

const ProductDetailCard = () => {
  const { content } = useTypedSelector(usedBookSelector);
  const { sellerId, sellerName } = content;

  return (
    <ProductDetailCardWrapper>
      <FlexWrapper>
        <UsedStoreUserThumbnail>
          <BigPieImg src={profileImg} alt="profileImg" />
        </UsedStoreUserThumbnail>
        <UsedStoreUserContent sellerId={sellerId} sellerName={sellerName} />
      </FlexWrapper>
      <UsedBookDetailButton small>팔로우</UsedBookDetailButton>
    </ProductDetailCardWrapper>
  );
};

export default ProductDetailCard;
