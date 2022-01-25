import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { Dispatch } from "react";
import { Link } from "react-router-dom";
import { ISignInReduce } from "src/modules/Slices/signIn/types";
import { getUserReceivedReviewListData } from "src/modules/Slices/userReview/types";
import { deleteUserReview } from "src/modules/Slices/userReview/userReviewSlice";
import { RatingContent, RatingScore } from "src/pages/BookDetail/style";
import { ColorContent, ContentItem, ContentWrapper, FlexBox, TitleContentItem } from "../BuyList/styles";

export interface WrittedReviewListProps {
  contents: getUserReceivedReviewListData[];
  dispatch: Dispatch<any>;
  signIn: ISignInReduce;
}

const WrittedReviewList = ({ contents, dispatch, signIn }: WrittedReviewListProps) => {
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
      {contents.map((v, idx) => {
        return (
          <ContentWrapper key={idx}>
            <ContentItem>
              <RatingContent>
                <Rating name="read-only" precision={0.5} value={v.rating} size="small" readOnly />
                <br />
                <RatingScore>{v.rating}점</RatingScore>
              </RatingContent>
            </ContentItem>
            <ContentItem>{v.sellerName}</ContentItem>
            <TitleContentItem>
              <Link to={`/usedBook/${v.usedBookId}`}>
                <ColorContent>{v.usedBookTitle}</ColorContent>
              </Link>
            </TitleContentItem>
            <ContentItem>{v.content}</ContentItem>
            <ContentItem>{v.reviewDate.split("T", 1)}</ContentItem>
            <ContentItem>
              <FlexBox>
                <form>
                  <Button variant="contained" type="submit">
                    수정
                    <input type="hidden" value={v.userReviewId} />
                  </Button>
                </form>
                <form onSubmit={deleteUserReviewSubmit}>
                  <Button variant="outlined" type="submit">
                    삭제
                    <input type="hidden" value={v.userReviewId} />
                  </Button>
                </form>
              </FlexBox>
            </ContentItem>
          </ContentWrapper>
        );
      })}
    </div>
  );
};

export default WrittedReviewList;
