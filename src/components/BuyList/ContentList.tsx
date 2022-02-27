import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import noComments from "assets/image/noComments.png";
import { useState, useEffect } from "react";
import { UsedBookBuyListResponse } from "modules/Slices/usedBookDetail/types";
import { usedBookBuyCancel, usedBookBuyConfirm } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import useSignIn from "hooks/useSignIn";
import { useTypedSelector } from "modules/store";
import { userReviewSelector } from "modules/Slices/userReview/userReviewSlice";
import { useMediaQuery } from "@mui/material";
import Modal from "./Modal";
import {
  BuyContent,
  BuyTitleContent,
  ContentText,
  ContentWrapper,
  ImgContent,
  ButtonArea,
  ContentTitle,
  ImgContent800,
  ContentListTitle800,
} from "./styles";
import { Empty } from "../SaleList/style";
import { IContent } from "./types";

const ContentList = ({ pages, select, titleFilter, open, setOpen }: IContent) => {
  const { signIn, dispatch } = useSignIn();
  const review = useTypedSelector(userReviewSelector);
  const [selectedItem, setSelectedItem] = useState<UsedBookBuyListResponse | null>(null);
  const max800 = useMediaQuery("(max-width:800px)");

  const contents = pages.filter(({ title, state }) => {
    if (titleFilter !== null && title.match(titleFilter) === null) return false;
    if (select !== state && select !== "NONE") return false;
    return true;
  });

  const expandModal = (item: UsedBookBuyListResponse) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (review.status === "success") {
      setOpen(false);
    }
  }, [review.status, setOpen]);

  const buyConfirmSubmit = (e: any) => {
    const orderId: string = e.target[1].value;
    if (window.confirm("구매확정 하시겠습니까?")) {
      const { token } = signIn;
      if (token) {
        return dispatch(usedBookBuyConfirm({ orderId, token }));
      }
      return alert("재로그인 후 다시 시도하세요.");
    }
    e.preventDefault();
    return false;
  };

  const buyCancelSubmit = (e: any) => {
    const orderId: string = e.target[1].value;
    if (window.confirm("구매취소 하시겠습니까?")) {
      const { token } = signIn;
      if (token) {
        return dispatch(usedBookBuyCancel({ orderId, token }));
      }
      return alert("재로그인 후 다시 시도하세요.");
    }
    e.preventDefault();
    return false;
  };

  return (
    <div>
      {contents.length ? (
        contents.map((item, idx) => {
          const { image, orderDate, orderId, price, reviewId, state, title, bookId } = item;
          return (
            <ContentWrapper key={idx}>
              {state !== "SALE" && (
                <>
                  {max800 ? (
                    <BuyContent>
                      <Link to={`/usedBook/${bookId}`}>
                        {image.length !== 0 && (
                          <ImgContent800 src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
                        )}
                      </Link>
                      <ContentListTitle800> {title}</ContentListTitle800>
                      <div>{price}</div>
                    </BuyContent>
                  ) : (
                    <>
                      <BuyContent>
                        <Link to={`/usedBook/${bookId}`}>
                          {image.length !== 0 && (
                            <ImgContent src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
                          )}
                        </Link>
                      </BuyContent>
                      <BuyTitleContent>
                        <Link to={`/usedBook/${bookId}`}>
                          <ContentTitle>{title}</ContentTitle>
                        </Link>
                      </BuyTitleContent>
                      <BuyContent>
                        <ContentText>{price}</ContentText>
                      </BuyContent>
                    </>
                  )}
                  <BuyContent>
                    <ContentText>
                      {state === "TRADING" && "거래중"}
                      {state === "SOLD_OUT" && "거래완료"}
                    </ContentText>
                  </BuyContent>
                  <BuyContent>
                    <ContentText>{orderDate.split("T", 1)}</ContentText>
                  </BuyContent>
                  <BuyContent>
                    <ButtonArea>
                      {state === "TRADING" ? (
                        <>
                          <form onSubmit={buyConfirmSubmit}>
                            <Button variant="contained" type="submit" color="info">
                              구매확정
                              <input type="hidden" value={orderId} />
                            </Button>
                          </form>
                          <form onSubmit={buyCancelSubmit}>
                            <Button variant="outlined" type="submit" color="error">
                              구매취소
                              <input type="hidden" value={orderId} />
                            </Button>
                          </form>
                        </>
                      ) : state === "SOLD_OUT" ? (
                        reviewId ? (
                          <Button disabled>리뷰작성완료</Button>
                        ) : (
                          <Button variant="contained" onClick={() => expandModal(item)} type="button">
                            리뷰작성
                          </Button>
                        )
                      ) : null}
                      <Link to={`buy/${item.orderId}`}>
                        <Button variant="outlined" color="inherit">
                          구매상세
                        </Button>
                      </Link>
                    </ButtonArea>
                  </BuyContent>
                </>
              )}
              {selectedItem !== null && open ? (
                <Modal open={open} handleClose={handleClose} item={selectedItem} />
              ) : null}
            </ContentWrapper>
          );
        })
      ) : (
        <Empty>
          <p>조건에 맞는 내용이 없습니다.</p>
          <img src={noComments} alt="noComments" />
        </Empty>
      )}
    </div>
  );
};

export default ContentList;
