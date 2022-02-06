import { usedBookLike } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { Link, useHistory } from "react-router-dom";
import { compareDateFormat, make1000UnitsCommaFormet } from "utils/formatUtil";
import useSignIn from "hooks/useSignIn";
import Button from "@mui/material/Button";
import client, { errorHandler, makeAuthTokenHeader } from "api/client";
import {
  BookPrice,
  BookStatus,
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
  bookState: string;
}

const UsedBookArea = ({
  title,
  price,
  content,
  view,
  uploadDate,
  tags,
  likeCount,
  usedBookId,
  sellerId,
  saleState,
  bookState,
}: UsedBookAreaProps) => {
  const date = compareDateFormat(String(uploadDate));
  const bookPrice = make1000UnitsCommaFormet(String(price));
  const { signIn, dispatch } = useSignIn();
  const history = useHistory();
  const { user, isLoggedIn, token } = signIn;

  const handleUsedBookDeleteOnClick = async () => {
    try {
      if (saleState !== "SALE") throw new Error("판매 중인 상품은 삭제가 불가능합니다.");
      if (!window.confirm("정말로 삭제하시겠습니까?")) return;
      if (!token) throw new Error("로그인이 필요합니다.");
      await client.delete(`/usedbook/${usedBookId}`, makeAuthTokenHeader(token));
      history.replace("/usedBook");
    } catch (error: any) {
      const message = errorHandler(error);
      alert(message);
    }
  };

  let dayAgo = "일전";
  if (date === 0) {
    dayAgo = "오늘";
  }
  const likeClick = () => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/signIn");
      }
      return false;
    }
    if (user !== null) {
      dispatch(
        usedBookLike({
          usedBookId,
        }),
      );
    }
    return false;
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
              날짜
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
        <BookStatus>상품상태</BookStatus>
        <BookStatus>
          {bookState === "UNRELEASED" && "미개봉"}
          {bookState === "ALMOST_NEW" && "거의 새거"}
          {bookState === "USED" && "사용감 있음"}
        </BookStatus>
      </DeliveryArea>
      <ProductDetail>
        <ProductDetailTitle>상품정보</ProductDetailTitle>
        <Line />
        <ProductDetailContent dangerouslySetInnerHTML={{ __html: content }} />
      </ProductDetail>
      <TagArea>{tags && tags.map((tag, index) => <TagContent key={index}>#{tag}</TagContent>)}</TagArea>
      {user?.id !== sellerId ? (
        <ButtonArea>
          <UsedBookDetailButton onClick={likeClick}>좋아요</UsedBookDetailButton>
          {saleState === "TRADING" && <DisabledButton>현재 거래중인 상품입니다.</DisabledButton>}
          {saleState === "SOLD_OUT" && <DisabledButton>판매완료된 상품입니다.</DisabledButton>}
          {saleState === "SALE" && (
            <>
              <Link
                to={{
                  pathname: "/chat",
                  state: {
                    sellerId,
                    usedBookId,
                  },
                }}
              >
                <UsedBookDetailButton>1:1채팅 </UsedBookDetailButton>
              </Link>
              <Link to={`/order/${usedBookId}`}>
                <BuyButton>구매하기</BuyButton>
              </Link>
            </>
          )}
        </ButtonArea>
      ) : (
        <ButtonArea>
          {saleState === "SALE" ? (
            <>
              <Button variant="outlined" color="mainDarkBrown" sx={{ mt: 1, height: 50, width: 200 }}>
                <Link to={{ pathname: `/my/sale/insert/${usedBookId}`, state: { saleState } }}>수정</Link>
              </Button>
              <Button
                variant="outlined"
                onClick={handleUsedBookDeleteOnClick}
                color="error"
                sx={{ mt: 1, height: 50, width: 200 }}
              >
                삭제
              </Button>
            </>
          ) : (
            <DisabledButton>현재 거래중인 상품입니다.</DisabledButton>
          )}
        </ButtonArea>
      )}
    </UsedBookWrapper>
  );
};

export default UsedBookArea;
