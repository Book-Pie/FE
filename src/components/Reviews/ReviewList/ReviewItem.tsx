import React from "react";
import { commentLike, deleteComment } from "modules/Slices/comment/commentSlice";
import { useDispatch } from "react-redux";
import { Rating } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useTypedSelector } from "modules/store";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import { reviewDateFormat } from "utils/formatUtil";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  ContentWrapper,
  ReviewContent,
  ReviewItemWrapper,
  ReplyDate,
  ContentBottom,
  DeleteButton,
  ClickArea,
  ReviewContentTop,
  ReviewContentBottom,
  ContentArea,
  LikeButton,
} from "./style";
import { ReviewItemProps } from "./types";

export const ReviewItem: React.FC<ReviewItemProps> = ({ content }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reviewId, likeCheck, reviewLikeCount, reviewDate, nickName, rating, userId } = content;
  const commentDate = reviewDateFormat(reviewDate);
  const myUserStatus = useTypedSelector(userReduceSelector);
  const { user, isLoggedIn, token } = myUserStatus;
  const shopId = String(userId);

  const deleteClick = () => {
    if (token) {
      if (window.confirm("댓글을 정말로 삭제하시겠습니까?") === true) {
        dispatch(
          deleteComment({
            id: reviewId,
            token,
          }),
        );
      }
    }
  };

  const likeClick = () => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/signIn");
      }
      return false;
    }
    if (user !== null) {
      if (token) {
        dispatch(
          commentLike({
            reviewId,
            token,
          }),
        );
      }
    }
    return false;
  };

  return (
    <ReviewItemWrapper>
      <ClickArea>{user?.id === userId && <DeleteButton onClick={deleteClick}>x</DeleteButton>}</ClickArea>
      <ReviewContent>
        <ReviewContentTop>
          <Rating name="read-only" precision={0.5} value={rating} size="small" readOnly />
          <Link to={`/shop/${shopId}`}>
            <p>{nickName}</p>
          </Link>
          <ContentBottom>
            <ReplyDate>{commentDate}</ReplyDate>
          </ContentBottom>
        </ReviewContentTop>
        <ReviewContentBottom>
          <ContentWrapper>
            <ContentArea dangerouslySetInnerHTML={{ __html: content.content }} />
            <ClickArea>
              <LikeButton onClick={likeClick}>
                <ThumbUpIcon sx={{ fontSize: 12 }} />
                좋아요
                {likeCheck}
                {reviewLikeCount}
              </LikeButton>
            </ClickArea>
          </ContentWrapper>
        </ReviewContentBottom>
      </ReviewContent>
    </ReviewItemWrapper>
  );
};

export default ReviewItem;
