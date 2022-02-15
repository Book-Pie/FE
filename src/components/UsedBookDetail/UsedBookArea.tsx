import { usedBookLike } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { Link, useHistory } from "react-router-dom";
import { compareDateFormat, make1000UnitsCommaFormet } from "utils/formatUtil";
import useSignIn from "hooks/useSignIn";
import Button from "@mui/material/Button";
import client, { errorHandler, makeAuthTokenHeader } from "api/client";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import styled from "styled-components";
import {
  TagArea,
  TagContent,
  RedContent,
  ButtonArea,
  DisabledButton,
  WideRedContent,
  BookPrice,
  BookStatus,
  BuyButton,
  DeliveryArea,
  DeliverySpan,
  InteractionArea,
  InteractionSpan,
  LikeButton,
  Line,
  ProductDetail,
  ProductDetailContent,
  ProductDetailTitle,
  TopInformationArea,
  UsedBookDetailButton,
  UsedBookWrapper,
} from "./style";
import { UsedBookAreaProps } from "./types";

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
  liked,
}: UsedBookAreaProps) => {
  const date = compareDateFormat(String(uploadDate));
  const bookPrice = make1000UnitsCommaFormet(String(price));
  const { signIn, dispatch } = useSignIn();
  const history = useHistory();
  const { user, isLoggedIn, token } = signIn;
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

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
    if (user !== null && token !== null) {
      setOpen(true);
      dispatch(
        usedBookLike({
          usedBookId,
          token,
        }),
      );
      setTimeout(() => setOpen(false), 2000);
    }
    return false;
  };

  const handleOrderClick = () => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/signIn");
      }
      return false;
    }
    return history.replace(`/order/${usedBookId}`);
  };

  const handleChatClick = () => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/signIn");
      }
      return false;
    }
    return history.replace(`/chat`, {
      sellerId,
      usedBookId,
      buyerId: user?.id,
    });
  };

  const LikeTooltip = styled(({ className, ...props }) => <Tooltip {...props} arrow classes={{ popper: className }} />)(
    ({}) => ({
      [`& .${tooltipClasses.arrow}`]: {
        "&:before": {
          border: "1px solid #dadde9",
          backgroundColor: "#f5f5f9",
        },
      },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        width: 250,
        height: 40,
        textAlign: "center",
        paddingTop: "15px",
        fontSize: 13,
        border: "1px solid #dadde9",
      },
    }),
  );

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
              <WideRedContent>
                {date} {dayAgo}
              </WideRedContent>
            </InteractionSpan>
          ) : (
            <InteractionSpan>
              날짜 <WideRedContent>{dayAgo}</WideRedContent>
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
      <ButtonArea>
        {user?.id !== sellerId && (
          <>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                <LikeTooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleTooltipClose}
                  open={open}
                  arrow
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={liked ? "마이페이지 > 찜목록에 추가되었습니다 ✅" : "찜목록에서 제거되었습니다 ☑️"}
                >
                  <LikeButton onClick={likeClick} className={liked ? "UsedBookArea--active" : "UsedBookArea--nomal"}>
                    <div>
                      <FavoriteIcon sx={{ paddingTop: 1, fontSize: 30 }} /> 찜
                    </div>
                  </LikeButton>
                </LikeTooltip>
              </div>
            </ClickAwayListener>
            {saleState === "TRADING" && <DisabledButton>현재 거래중인 상품입니다.</DisabledButton>}
            {saleState === "SOLD_OUT" && <DisabledButton>판매완료된 상품입니다.</DisabledButton>}
            {saleState === "SALE" && (
              <>
                <UsedBookDetailButton onClick={handleChatClick}>1: 1채팅 </UsedBookDetailButton>
                <BuyButton onClick={handleOrderClick}>구매하기</BuyButton>
              </>
            )}
          </>
        )}
        {user && user.id === sellerId && (
          <>
            {saleState === "TRADING" && <DisabledButton>현재 거래중인 상품입니다.</DisabledButton>}
            {saleState === "SOLD_OUT" && <DisabledButton>판매완료된 상품입니다.</DisabledButton>}
            {saleState === "SALE" && (
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
            )}
          </>
        )}
      </ButtonArea>
    </UsedBookWrapper>
  );
};

export default UsedBookArea;
