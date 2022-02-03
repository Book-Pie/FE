import profileImg from "assets/image/pie3x.png";
import { usedBookSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "modules/store";
import {
  ProductDetailCardWrapper,
  UsedStoreUserThumbnail,
  UsedBookDetailButton,
  BigPieImg,
  FlexWrapper,
} from "../style";
import UsedStoreUserContent from "./UsedStoreUserContent";

const ProductDetailCard = () => {
  const { content } = useTypedSelector(usedBookSelector);
  const { sellerName } = content;

  return (
    <ProductDetailCardWrapper>
      <FlexWrapper>
        <UsedStoreUserThumbnail>
          <BigPieImg src={profileImg} alt="profileImg" />
        </UsedStoreUserThumbnail>
        <UsedStoreUserContent sellerName={sellerName} />
      </FlexWrapper>
      <UsedBookDetailButton small>팔로우</UsedBookDetailButton>
    </ProductDetailCardWrapper>
  );
};

export default ProductDetailCard;
