import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import noComments from "assets/image/noComments.png";
import { useState, useEffect } from "react";
import { usedBookBuyListResponse } from "src/modules/Slices/usedBookDetail/types";
import { usedBookBuyConfirm } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import useSignIn from "src/hooks/useSignIn";
import { useTypedSelector } from "src/modules/store";
import { userReviewSelector } from "src/modules/Slices/userReview/userReviewSlice";
import Modal from "./Modal";
import { BuyContent, BuyTitleContent, ContentText, ContentWrapper, ImgContent, ButtonArea } from "./styles";
import { Empty } from "../SaleList/style";

export interface IContent {
  pages: usedBookBuyListResponse[];
  titleFilter: string | null;
  select: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentList = ({ pages, select, titleFilter, open, setOpen }: IContent) => {
  const { signIn, dispatch } = useSignIn();
  const review = useTypedSelector(userReviewSelector);
  const [selectedItem, setSelectedItem] = useState<usedBookBuyListResponse | null>(null);

  const contents = pages.filter(({ title, state }) => {
    if (titleFilter !== null && title.match(titleFilter) === null) return false;
    if (select !== state && select !== "NONE") return false;
    return true;
  });

  const expandModal = (item: usedBookBuyListResponse) => {
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
    return false;
  };

  return (
    <div>
      {contents.length ? (
        contents.map((item, idx) => (
          <ContentWrapper key={idx}>
            <BuyContent>
              <Link to={`/usedBook/${item.bookId}`}>
                {item.image.length !== 0 && (
                  <ImgContent src={`${process.env.BASE_URL}/image/${item.image}`} alt="usedBookImg" />
                )}
              </Link>
            </BuyContent>
            <BuyContent>
              <ContentText>
                {item.state === "SALE" && "거래취소"}
                {item.state === "TRADING" && "거래중"}
                {item.state === "SOLD_OUT" && "거래완료"}
              </ContentText>
            </BuyContent>
            <BuyTitleContent>
              <ContentText>{item.title}</ContentText>
            </BuyTitleContent>
            <BuyContent>
              <ContentText>{item.price}</ContentText>
            </BuyContent>
            <BuyContent>
              <ContentText>{item.orderDate.split("T", 1)}</ContentText>
            </BuyContent>
            <BuyContent>
              <ButtonArea>
                {item.state === "TRADING" ? (
                  <form onSubmit={buyConfirmSubmit}>
                    <Button variant="outlined" type="submit">
                      구매확정
                      <input type="hidden" value={item.orderId} />
                    </Button>
                  </form>
                ) : item.state === "SOLD_OUT" ? (
                  item.reviewId ? (
                    <Button disabled>리뷰작성완료</Button>
                  ) : (
                    <Button variant="contained" onClick={() => expandModal(item)} type="button">
                      리뷰작성
                    </Button>
                  )
                ) : null}
              </ButtonArea>
            </BuyContent>
            {open ? <Modal open={open} handleClose={handleClose} item={selectedItem} /> : null}
          </ContentWrapper>
        ))
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
