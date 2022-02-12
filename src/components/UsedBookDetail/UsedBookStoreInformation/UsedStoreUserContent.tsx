import React from "react";
import { FavoriteCategories } from "src/modules/Slices/usedBookDetail/types";
import { CardBoldTitle, CardSmallTitle, UsedStoreUserContentWrapper, WideCardSmallTitle } from "../style";
import { BottomArea, UsedStoreFlexBox } from "./styles";

export interface UsedStoreUserContentParam {
  sellerName: string;
  favoriteCategories: FavoriteCategories[];
  totalSales: number;
}

const UsedStoreUserContent = ({ sellerName, favoriteCategories, totalSales }: UsedStoreUserContentParam) => {
  // 임시 데이터
  const followCount = 0;

  return (
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
  );
};

export default UsedStoreUserContent;
