import profileImg from "assets/image/pie3x.png";
import { usedBookDetailSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "modules/store";
import {
  ProductDetailCardWrapper,
  UsedStoreUserThumbnail,
  FlexWrapper,
  UsedBookDetailButton,
  BigPieImg,
} from "../style";
import UsedStoreUserContent from "./UsedStoreUserContent";

const ProductDetailCard = () => {
  const { content } = useTypedSelector(usedBookDetailSelector);
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
