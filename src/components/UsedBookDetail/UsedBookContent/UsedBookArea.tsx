import { compareDateFormat, make1000UnitsCommaFormet } from "src/utils/formatUtil";
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
import { TagArea, TagContent, RedContent } from "./styles";

export interface UsedBookAreaProps {
  title: string;
  price: number;
  content: string;
  view: number;
  uploadDate: string;
  tags: string[];
}

const UsedBookArea = ({ title, price, content, view, uploadDate, tags }: UsedBookAreaProps) => {
  const like = 0;
  const date = compareDateFormat(uploadDate);
  const bookPrice = make1000UnitsCommaFormet(String(price));

  let dayAgo = "일전";
  if (date === 0) {
    dayAgo = "오늘";
  }

  return (
    <UsedBookWrapper>
      <TopInformationArea>
        <div>{title}</div>
        <InteractionArea>
          <InteractionSpan>
            좋아요 <RedContent>{like}</RedContent>
          </InteractionSpan>
          <InteractionSpan>
            조회수 <RedContent>{view}</RedContent>
          </InteractionSpan>
          {date !== 0 ? (
            <InteractionSpan>
              날짜{" "}
              <RedContent>
                {date} {dayAgo}
              </RedContent>
            </InteractionSpan>
          ) : (
            <InteractionSpan>
              날짜 <RedContent>{dayAgo}</RedContent>
            </InteractionSpan>
          )}
        </InteractionArea>
      </TopInformationArea>
      <BookPrice>{bookPrice}</BookPrice>
      <Line />
      <DeliveryArea>
        <DeliverySpan>배송비 2500원</DeliverySpan>
        <DeliverySpan>배송방법 택배거래</DeliverySpan>
      </DeliveryArea>
      <ProductDetail>
        <ProductDetailTitle>상품정보</ProductDetailTitle>
        <Line />
        <ProductDetailContent dangerouslySetInnerHTML={{ __html: content }} />
      </ProductDetail>
      <TagArea>{tags && tags.map((tag, index) => <TagContent key={index}>#{tag}</TagContent>)}</TagArea>
      <UsedBookDetailButton>좋아요</UsedBookDetailButton>
      <UsedBookDetailButton>1:1채팅 </UsedBookDetailButton>
      <BuyButton>구매하기</BuyButton>
    </UsedBookWrapper>
  );
};

export default UsedBookArea;
