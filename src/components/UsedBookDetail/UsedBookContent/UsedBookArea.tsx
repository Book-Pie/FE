import {
  BookPrice,
  BuyButton,
  DeliveryArea,
  DeliverySpan,
  InteractionArea,
  InteractionSpan,
  Line,
  ProductDetail,
  ProductDetailContent,
  ProductDetailTitle,
  TopInformationArea,
  UsedBookDetailButton,
  UsedBookWrapper,
} from "../style";

const UsedBookArea = () => {
  const bookName = "예술가가 사는 집";
  const like = 0;
  const viewCount = 12;
  const date = 5;
  const bookPrice = 14400;
  const bookContent =
    "17인의 시각예술가와 그들이 살았던, 혹은 거의 일체화되었던 공간에 대해 두 명의 작가가 마음을 울리는 글과아름다운 그림으로 써내려간 예술 에세이다. 글을 쓴 멀리사 와이즈는 전 세계 곳곳을 여행하며 예술가들의 집을 직접 방문하고 그들의 공간에 관해 자신의 경험과 감상을 기록했다. 여기에 케이트 루이스가 개성을 살려 재현한 그림이 어우러져 예술가의 집을 보다 특별하고 아름답게 완성했다. 모네가 말년까지 왕성한 작품 활동을 하며 자신의 흔적을 고스란히 남긴 지베르니 저택, 반 고흐가 그림에 대한 열의를 불태우던 시절을 보낸 프랑스 아를의 노란 집, 프리다 칼로의 불꽃같은 생애와 예술세계를 엿볼 수 있는 카사아술 등 이미 유명세를 떨치고 있는 예술가의 집을 소개함과 동시에 지금 현재 미술계에서 주목받고 있는 예술가 하산 하자즈와 자리아 포먼의 집을 방문해 이들이 직접 자신의 공간에 대해 이야기한 생생한 목소리도 전달한다.";

  return (
    <UsedBookWrapper>
      <TopInformationArea>
        <div>{bookName}</div>
        <InteractionArea>
          <InteractionSpan>좋아요 {like}</InteractionSpan>
          <InteractionSpan>조회수 {viewCount}</InteractionSpan>
          <InteractionSpan>날짜 {date}일전</InteractionSpan>
        </InteractionArea>
      </TopInformationArea>
      <BookPrice>{bookPrice}</BookPrice>
      <Line />
      <DeliveryArea>
        <DeliverySpan>배송비 2500원</DeliverySpan>
        <DeliverySpan>배송방법 택배거래</DeliverySpan>
      </DeliveryArea>
      <Line />
      <ProductDetail>
        <ProductDetailTitle>상품정보</ProductDetailTitle>
        <ProductDetailContent>{bookContent}</ProductDetailContent>
      </ProductDetail>
      <UsedBookDetailButton>좋아요</UsedBookDetailButton>
      <UsedBookDetailButton>1:1채팅 </UsedBookDetailButton>
      <BuyButton>구매하기</BuyButton>
    </UsedBookWrapper>
  );
};

export default UsedBookArea;
