import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import useSignIn from "src/hooks/useSignIn";
import { ModalItemParam } from "src/modules/Slices/usedBookDetail/types";
import { addUserReview, editUserReview } from "src/modules/Slices/userReview/userReviewSlice";
import { RegisterButton, TextReviewArea } from "src/pages/Review/styles";
import { HoverRating } from "../Rating/Rating";
import { ButtonArea, CancelButton, ModalContent, BuyContent, FlexWrapper, ImgContent, Text } from "./styles";
import { addUserReviewSubmitParam } from "./types";

export interface userReviewModalProps {
  open: boolean;
  item: ModalItemParam | null;
  handleClose: () => void;
}

const Modal = (props: userReviewModalProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { signIn } = useSignIn();
  const { isLoggedIn } = signIn;
  const { handleSubmit, register, setValue } = useForm<addUserReviewSubmitParam>();

  const { open, handleClose, item } = props;
  if (!item) throw new Error("거래상품이 존재하지 않습니다.");
  const {
    bookId,
    reviewDate,
    usedBookTitle,
    image,
    orderDate,
    orderId,
    price,
    sellerNickName,
    sellerName,
    title,
    userReviewId,
  } = item;
  let { rating, content } = item;

  if (rating === undefined) {
    rating = 0;
  }
  if (content === undefined) {
    content = "";
  }

  const [ratingValue, setRatingValue] = useState<number>(rating);
  const [reviewContent, setReviewContent] = useState<string>(content);

  const handleRatingChange = (e: React.SyntheticEvent<Element, Event>, value: number | null) => {
    if (value !== null) {
      setRatingValue(value);
      setValue("rating", value);
    }
  };

  const onSubmit = (data: addUserReviewSubmitParam) => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/signIn");
      }
      return false;
    }
    if (orderId) {
      const { token } = signIn;
      if (token) {
        dispatch(addUserReview({ data, token }));
        return handleClose();
      }
    } else if (userReviewId) {
      const { token } = signIn;
      if (token) {
        dispatch(editUserReview({ data, token }));
        return handleClose();
      }
      return false;
    }
    return false;
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { width: "80%", height: 700 } }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          중고거래 리뷰
          {orderDate && " 작성"}
          {reviewDate && " 수정"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            리뷰를 {orderDate && "작성"}
            {reviewDate && "수정"} 해주세요.
          </DialogContentText>
          <FlexWrapper>
            <BuyContent>
              <Link to={`/usedBook/${bookId}`}>
                <ImgContent src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
              </Link>
            </BuyContent>
            <BuyContent>
              <ModalContent color="#bbb">
                {orderDate && orderDate.split("T", 1)}
                {reviewDate && reviewDate.split("T", 1)}
              </ModalContent>
              <ModalContent color="#bbb">
                {sellerNickName && sellerNickName}
                {sellerName && sellerName}
              </ModalContent>
              <ModalContent color="#52a4c3">
                {title && title}
                {usedBookTitle && usedBookTitle}
              </ModalContent>
              <ModalContent>가격 {price}</ModalContent>
              {orderId && <input type="hidden" value={orderId} {...register("orderId")} />}
              {userReviewId && <input type="hidden" value={userReviewId} {...register("userReviewId")} />}
            </BuyContent>
          </FlexWrapper>
          <HoverRating rating={ratingValue} handleChange={handleRatingChange} />
          <input type="hidden" value={ratingValue} {...register("rating")} />
          <TextReviewArea>
            <Text
              placeholder="중고거래에 대한 솔직한 후기를 남겨주세요."
              value={reviewContent}
              {...register("content", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setReviewContent(e.target.value);
                },
              })}
            />
          </TextReviewArea>
          <div>
            <ButtonArea>
              <CancelButton onClick={handleClose}>취소</CancelButton>
              <RegisterButton type="submit">
                {orderDate && "등록"}
                {reviewDate && "수정"}
              </RegisterButton>
            </ButtonArea>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default Modal;
