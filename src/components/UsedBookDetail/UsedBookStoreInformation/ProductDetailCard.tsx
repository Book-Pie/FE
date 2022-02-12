import profileImg from "assets/image/pie3x.png";
import { usedBookDetailSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "modules/store";
import { Link } from "react-router-dom";
import { ProductDetailCardWrapper, UsedBookDetailButton, ProductDetailCardFlexWrapper } from "../style";
import { FollowButton, ProductDetailNoneProfileImg, ProductDetailProfileImg } from "./styles";
import UsedStoreUserContent from "./UsedStoreUserContent";

const ProductDetailCard = () => {
  const { content } = useTypedSelector(usedBookDetailSelector);
  const { sellerName, sellerImage, favoriteCategories, totalSales } = content;
  const { sellerId } = content;
  const shopId = String(sellerId);

  return (
    <ProductDetailCardWrapper>
      <ProductDetailCardFlexWrapper>
        <Link to={`/shop/${shopId}`}>
          {sellerImage ? (
            <ProductDetailProfileImg>
              <img src={`${process.env.BASE_URL}/image/${sellerImage}`} alt="myProfileImg" />
            </ProductDetailProfileImg>
          ) : (
            <ProductDetailNoneProfileImg>
              <img src={profileImg} alt="NoneProfileImg" />
            </ProductDetailNoneProfileImg>
          )}
        </Link>
        <UsedStoreUserContent sellerName={sellerName} totalSales={totalSales} favoriteCategories={favoriteCategories} />
      </ProductDetailCardFlexWrapper>
      <FollowButton>
        <UsedBookDetailButton small>팔로우</UsedBookDetailButton>
      </FollowButton>
    </ProductDetailCardWrapper>
  );
};

export default ProductDetailCard;
