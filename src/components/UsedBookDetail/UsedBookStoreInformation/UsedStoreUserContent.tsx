import { CardBoldTitle, CardSmallTitle, UsedStoreUserContentWrapper } from "../style";

const UsedStoreUserContent = () => {
  const nickname = "올리비아";
  const tag1 = "#에세이";
  const tag2 = "#취미";
  const goodsCount = 6;
  const followCount = 5;

  return (
    <UsedStoreUserContentWrapper>
      <div>
        <CardSmallTitle>닉네임</CardSmallTitle>
        <CardSmallTitle>취향</CardSmallTitle>
      </div>
      <div>
        <CardBoldTitle>{nickname}</CardBoldTitle>
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
