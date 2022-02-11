import profileImg from "assets/image/pie3x.png";
import { usedBookDetailSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "modules/store";
import { Link } from "react-router-dom";
import {
  ProductDetailCardWrapper,
  UsedStoreUserThumbnail,
  UsedBookDetailButton,
  ProductDetailCardFlexWrapper,
} from "../style";
import { UsedBookStoreProfileImg } from "./styles";
import UsedStoreUserContent from "./UsedStoreUserContent";

const ProductDetailCard = () => {
  const { content } = useTypedSelector(usedBookDetailSelector);
  const { sellerName, sellerImage } = content;
  const { sellerId } = content;
  const shopId = String(sellerId);

  return (
    <ProductDetailCardWrapper>
      <ProductDetailCardFlexWrapper>
        <UsedStoreUserThumbnail>
          <Link to={`/shop/${shopId}`}>
            <UsedBookStoreProfileImg>
              <img src={sellerImage ? `${process.env.BASE_URL}/image/${sellerImage}` : profileImg} alt="myProfileImg" />
            </UsedBookStoreProfileImg>
          </Link>
        </UsedStoreUserThumbnail>
        <UsedStoreUserContent sellerName={sellerName} />
      </ProductDetailCardFlexWrapper>
      <UsedBookDetailButton small>팔로우</UsedBookDetailButton>
    </ProductDetailCardWrapper>
  );
};

export default ProductDetailCard;
