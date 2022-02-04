import profileImg from "assets/image/pie3x.png";
import { usedBookDetailSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "modules/store";
import {
  ProductDetailCardWrapper,
  UsedStoreUserThumbnail,
  UsedBookDetailButton,
  BigPieImg,
  ProductDetailCardFlexWrapper,
} from "../style";
import UsedStoreUserContent from "./UsedStoreUserContent";

const ProductDetailCard = () => {
  const { content } = useTypedSelector(usedBookDetailSelector);
  const { sellerName } = content;

  return (
    <ProductDetailCardWrapper>
      <ProductDetailCardFlexWrapper>
        <UsedStoreUserThumbnail>
          <BigPieImg src={profileImg} alt="profileImg" />
        </UsedStoreUserThumbnail>
        <UsedStoreUserContent sellerName={sellerName} />
      </ProductDetailCardFlexWrapper>
      <UsedBookDetailButton small>팔로우</UsedBookDetailButton>
    </ProductDetailCardWrapper>
  );
};

export default ProductDetailCard;
