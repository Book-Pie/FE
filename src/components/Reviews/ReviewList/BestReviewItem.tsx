import { Rating } from "@mui/material";
import { useHistory } from "react-router";
import useSignIn from "src/hooks/useSignIn";
import { commentLike } from "src/modules/Slices/comment/commentSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { compareDateFormat } from "src/utils/formatUtil";
import { Link } from "react-router-dom";
import {
  BestCommentNickName,
  BestCommentWrapper,
  BestReviewContent,
  DateWrapper,
  LikeButton,
  LikeButtonWrapper,
} from "./style";
import { BestReviewItemParam } from "./types";

const BestReviewItem = ({ item }: BestReviewItemParam) => {
  const { content, nickName, rating, reviewLikeCount, reviewId, reviewDate, userId } = item;
  const { signIn, dispatch } = useSignIn();
  const history = useHistory();
  const { user, isLoggedIn, token } = signIn;
  const shopId = String(userId);
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

  const date = compareDateFormat(String(reviewDate));
  let dayAgo = "일전";
  if (date === 0) {
    dayAgo = "오늘";
  }

  return (
    <BestCommentWrapper>
      <div>
        <Link to={`/shop/${shopId}`}>
          <BestCommentNickName>{nickName}</BestCommentNickName>
        </Link>
        <Rating name="read-only" precision={0.5} value={rating} size="small" readOnly />
        <DateWrapper>
          {date !== 0 ? (
            <>
              {date} {dayAgo}
            </>
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>{dayAgo}</>
          )}
        </DateWrapper>
      </div>
      <BestReviewContent dangerouslySetInnerHTML={{ __html: content }} />
      <LikeButtonWrapper>
        <LikeButton onClick={likeClick}>
          <ThumbUpIcon sx={{ fontSize: 12 }} />
          좋아요
          {reviewLikeCount}
        </LikeButton>
      </LikeButtonWrapper>
    </BestCommentWrapper>
  );
};

export default BestReviewItem;
