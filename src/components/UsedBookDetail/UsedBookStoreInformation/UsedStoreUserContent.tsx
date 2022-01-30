import { UsedBookDetailResponse } from "modules/Slices/usedBookDetail/types";
import { CardBoldTitle, CardSmallTitle, UsedStoreUserContentWrapper } from "../style";

const UsedStoreUserContent = ({ sellerName }: UsedBookDetailResponse) => {
  // 임시 데이터
  const tag1 = "#에세이";
  const tag2 = "#취미";
  const goodsCount = 0;
  const followCount = 0;

  return (
    <UsedStoreUserContentWrapper>
      <div>
        <CardSmallTitle>닉네임</CardSmallTitle>
        <CardSmallTitle>취향</CardSmallTitle>
      </div>
      <div>
        <CardBoldTitle>{sellerName}</CardBoldTitle>
        <CardBoldTitle>{tag1}</CardBoldTitle>
        <CardBoldTitle>{tag2}</CardBoldTitle>
      </div>
      <br />
      <br />
      <div>
        <CardSmallTitle>상품 {goodsCount}</CardSmallTitle>
        <CardSmallTitle>팔로우 {followCount}</CardSmallTitle>
      </div>
    </UsedStoreUserContentWrapper>
  );
};

export default UsedStoreUserContent;
