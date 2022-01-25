import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import useSignIn from "src/hooks/useSignIn";
import { usedBookBuyListResponse } from "src/modules/Slices/usedBookDetail/types";
import { addUserReview } from "src/modules/Slices/userReview/userReviewSlice";
import { RegisterButton, TextReviewArea } from "src/pages/Review/styles";
import { HoverRating } from "../Rating/Rating";
import { ButtonArea, CancelButton, ModalContent, BuyContent, FlexWrapper, ImgContent, Text } from "./styles";
import { addUserReviewSubmitParam } from "./types";

export interface userReviewModalProps {
  open: boolean;
  item: usedBookBuyListResponse | null;
  handleClose: () => void;
}

const Modal = (props: userReviewModalProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { signIn } = useSignIn();
  const { isLoggedIn } = signIn;
  const { open, handleClose, item } = props;
  const { handleSubmit, register, setValue } = useForm<addUserReviewSubmitParam>();
  const [ratingValue, setRatingValue] = useState<number>(0);

  if (!item) throw new Error("거래상품이 존재하지 않습니다.");
  const { bookId, buyerNickName, image, orderDate, orderId, price, sellerNickName, state, title } = item;

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
    const { token } = signIn;
    if (token) {
      return dispatch(addUserReview({ data, token }));
    }
    return false;
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { width: "80%", height: 700 } }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>중고거래 리뷰 작성</DialogTitle>
        <DialogContent>
          <DialogContentText>리뷰를 작성 해주세요.</DialogContentText>
          <FlexWrapper>
            <BuyContent>
              <Link to={`/usedBook/${bookId}`}>
                {image.length !== 0 && <ImgContent src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />}
              </Link>
            </BuyContent>
            <BuyContent>
              <ModalContent color="#bbb">{orderDate.split("T", 1)}</ModalContent>
              <ModalContent color="#bbb">{sellerNickName}</ModalContent>
              <ModalContent color="#52a4c3">{title}</ModalContent>
              <ModalContent>가격 {price}</ModalContent>
              <input type="hidden" value={orderId} {...register("orderId")} />
            </BuyContent>
          </FlexWrapper>
          <HoverRating rating={ratingValue} handleChange={handleRatingChange} />
          <input type="hidden" value={ratingValue} {...register("rating")} />
          <TextReviewArea>
            <Text placeholder="중고거래에 대한 솔직한 후기를 남겨주세요." {...register("content")} />
          </TextReviewArea>
          <div>
            <ButtonArea>
              <CancelButton onClick={handleClose}>취소</CancelButton>
              <RegisterButton type="submit">등록</RegisterButton>
            </ButtonArea>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default Modal;
