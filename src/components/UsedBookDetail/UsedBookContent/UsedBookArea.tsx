import { useDispatch } from "react-redux";
import { usedBookLike } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { Link } from "react-router-dom";
import { compareDateFormat, make1000UnitsCommaFormet } from "src/utils/formatUtil";
import useSignIn from "src/hooks/useSignIn";
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
import { TagArea, TagContent, RedContent, ButtonArea, DisabledButton } from "./styles";

export interface UsedBookAreaProps {
  title: string;
  price: number;
  content: string;
  view: number;
  uploadDate: Date;
  tags: string[];
  likeCount: number;
  replyCount: number;
  usedBookId: number;
  sellerId: number;
  saleState: string;
}

const UsedBookArea = ({
  title,
  price,
  content,
  view,
  uploadDate,
  tags,
  likeCount,
  replyCount,
  usedBookId,
  sellerId,
  saleState,
}: UsedBookAreaProps) => {
  const date = compareDateFormat(uploadDate);
  const bookPrice = make1000UnitsCommaFormet(String(price));
  const dispatch = useDispatch();
  const { signIn } = useSignIn();
  const { user } = signIn;
  const { id } = user ?? -1;

  let dayAgo = "일전";
  if (date === 0) {
    dayAgo = "오늘";
  }
  const likeClick = () => {
    dispatch(
      usedBookLike({
        usedBookId,
      }),
    );
  };

  return (
    <UsedBookWrapper>
      <TopInformationArea>
        <div>{title}</div>
        <InteractionArea>
          <InteractionSpan>
            좋아요 <RedContent>{likeCount}</RedContent>
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
      {id !== sellerId && (
        <>
          <ButtonArea>
            <UsedBookDetailButton onClick={likeClick}>좋아요</UsedBookDetailButton>
            {saleState === "TRADING" && <DisabledButton>현재 거래중인 상품입니다.</DisabledButton>}
            {saleState === "SOLD_OUT" && <DisabledButton>판매완료된 상품입니다.</DisabledButton>}
          </ButtonArea>
          {saleState === "SALE" && (
            <>
              <UsedBookDetailButton>1:1채팅 </UsedBookDetailButton>
              <Link to={`/order/${usedBookId}`}>
                <BuyButton>구매하기</BuyButton>
              </Link>
            </>
          )}
        </>
      )}
    </UsedBookWrapper>
  );
};

export default UsedBookArea;
