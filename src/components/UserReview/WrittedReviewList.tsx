import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { Dispatch, useState } from "react";
import { Link } from "react-router-dom";
import { SignInReduce } from "modules/Slices/user/types";
import { GetUserReceivedReviewListData } from "modules/Slices/userReview/types";
import { deleteUserReview } from "modules/Slices/userReview/userReviewSlice";
import { RatingContent, RatingScore } from "components/BookDetail/style";
import Modal from "../BuyList/Modal";
import { ColorContent, ContentItem, ContentWrapper, FlexBox, TitleContentItem } from "../BuyList/styles";

export interface WrittedReviewListProps {
  contents: GetUserReceivedReviewListData[];
  dispatch: Dispatch<any>;
  signIn: SignInReduce;
}

const WrittedReviewList = ({ contents, dispatch, signIn }: WrittedReviewListProps) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GetUserReceivedReviewListData | null>(null);

  const expandModal = (item: GetUserReceivedReviewListData) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUserReviewSubmit = (e: any) => {
    e.preventDefault();
    const userReviewId: number = e.target[1].value;
    if (window.confirm("해당 리뷰를 삭제하시겠습니까?")) {
      const { token } = signIn;
      if (token) {
        return dispatch(deleteUserReview({ userReviewId, token }));
      }
    }
    return false;
  };

  return (
    <div>
      {contents.map((item, idx) => {
        return (
          <ContentWrapper key={idx}>
            <ContentItem>
              <RatingContent>
                <Rating name="read-only" precision={0.5} value={item.rating} size="small" readOnly />
                <br />
                <RatingScore>{item.rating}점</RatingScore>
              </RatingContent>
            </ContentItem>
            <ContentItem>{item.sellerName}</ContentItem>
            <TitleContentItem>
              <Link to={`/usedBook/${item.usedBookId}`}>
                <ColorContent>{item.usedBookTitle}</ColorContent>
              </Link>
            </TitleContentItem>
            <ContentItem>{item.content}</ContentItem>
            <ContentItem>{item.reviewDate.split("T", 1)}</ContentItem>
            <ContentItem>
              <FlexBox>
                <Button variant="contained" onClick={() => expandModal(item)} type="button">
                  수정
                </Button>
                <form onSubmit={deleteUserReviewSubmit}>
                  <Button variant="outlined" type="submit">
                    삭제
                    <input type="hidden" value={item.userReviewId} />
                  </Button>
                </form>
              </FlexBox>
            </ContentItem>
            {open ? <Modal open={open} handleClose={handleClose} item={selectedItem} /> : null}
          </ContentWrapper>
        );
      })}
    </div>
  );
};

export default WrittedReviewList;
