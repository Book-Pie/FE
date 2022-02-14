import { Link } from "react-router-dom";
import profileImg from "assets/image/pie3x.png";
import { usedBookDetailSelector } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import React from "react";
import {
  CardBoldTitle,
  CardSmallTitle,
  ProductDetailCardFlexWrapper,
  ProductDetailCardWrapper,
  ProductDetailTitle,
  UsedBookDetailButton,
  UsedBookStoreInformationWrapper,
  UsedStoreUserContentWrapper,
  WideCardSmallTitle,
  BottomArea,
  FollowButton,
  ProductDetailNoneProfileImg,
  ProductDetailProfileImg,
  UsedStoreFlexBox,
} from "./style";

const UsedBookStoreInformation = () => {
  const { content } = useTypedSelector(usedBookDetailSelector);
  const { sellerName, sellerImage, favoriteCategories, totalSales } = content;
  const { sellerId } = content;
  const shopId = String(sellerId);
  // 임시 데이터
  const followCount = 0;

  return (
    <UsedBookStoreInformationWrapper height="340px">
      <ProductDetailTitle>상점정보</ProductDetailTitle>
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
          {sellerName && totalSales && favoriteCategories && (
            <UsedStoreUserContentWrapper>
              <div>
                <WideCardSmallTitle>닉네임</WideCardSmallTitle>
                <WideCardSmallTitle>취향</WideCardSmallTitle>
              </div>
              <UsedStoreFlexBox>
                <div>
                  <CardBoldTitle>{sellerName}</CardBoldTitle>
                </div>
                <div>
                  {favoriteCategories &&
                    favoriteCategories
                      .filter((item, idx) => idx <= 2)
                      .map((item, idx) => (
                        <React.Fragment key={idx}>
                          <CardBoldTitle>
                            #{item.category}
                            <br />
                          </CardBoldTitle>
                        </React.Fragment>
                      ))}
                </div>
              </UsedStoreFlexBox>
              <BottomArea>
                <CardSmallTitle>상품 {totalSales}</CardSmallTitle>
                <CardSmallTitle>팔로우 {followCount}</CardSmallTitle>
              </BottomArea>
            </UsedStoreUserContentWrapper>
          )}
        </ProductDetailCardFlexWrapper>
        <FollowButton>
          <UsedBookDetailButton small>팔로우</UsedBookDetailButton>
        </FollowButton>
      </ProductDetailCardWrapper>
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookStoreInformation;
