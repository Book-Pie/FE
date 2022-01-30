import { dateArrayFormat } from "utils/formatUtil";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import * as Types from "./types";
import * as Styled from "./style";

const MyReviewTable = ({ contents }: Types.MyReviewTableProps) => {
  const min900 = useMediaQuery("(min-width:900px)");

  return (
    <Styled.MyReviewTableWrapper>
      {min900 && (
        <Grid container className="header">
          <Grid item md={1}>
            <Styled.MyReviewCell>
              <span>번호</span>
            </Styled.MyReviewCell>
          </Grid>
          <Grid item md={5}>
            <Styled.MyReviewCell>
              <span>리뷰내용</span>
            </Styled.MyReviewCell>
          </Grid>
          <Grid item md={2.5}>
            <Styled.MyReviewCell>
              <span>작성시간</span>
            </Styled.MyReviewCell>
          </Grid>
          <Grid item md={2.5}>
            <Styled.MyReviewCell>
              <span>리뷰별점</span>
            </Styled.MyReviewCell>
          </Grid>
          <Grid item md={1}>
            <Styled.MyReviewCell>
              <span>좋아요</span>
            </Styled.MyReviewCell>
          </Grid>
        </Grid>
      )}
      {contents.map(({ isbn, content, rating, reviewDate, reviewLikeCount, reviewId }) => (
        <Grid container key={isbn} rowGap={{ xs: 2, sm: 1 }}>
          <Grid item xs={12} sm={1} md={1}>
            <Styled.MyReviewCell>
              <span>{reviewId}.</span>
            </Styled.MyReviewCell>
          </Grid>
          <Grid item xs={12} sm={10} md={5}>
            <Styled.MyReviewCell className="content">
              <Link to={`/book/${isbn}`}>{content}</Link>
            </Styled.MyReviewCell>
          </Grid>
          <Grid item xs={12} sm={6} md={2.5}>
            <Styled.MyReviewCell>
              <span> {dateArrayFormat(reviewDate)[0]}</span>
              <span> {dateArrayFormat(reviewDate)[1]}</span>
            </Styled.MyReviewCell>
          </Grid>
          <Grid item xs={8} sm={4.5} md={2.5}>
            <Styled.MyReviewCell>
              <Rating name="read-only" value={rating} readOnly size={min900 ? undefined : "small"} />
              <span>{rating} / 5점</span>
            </Styled.MyReviewCell>
          </Grid>
          <Grid item xs={4} sm={1.5} md={1}>
            <Styled.MyReviewCell>
              <FavoriteIcon sx={{ color: "#ff3d47" }} fontSize={min900 ? undefined : "small"} />
              <span>{reviewLikeCount}개</span>
            </Styled.MyReviewCell>
          </Grid>
        </Grid>
      ))}
    </Styled.MyReviewTableWrapper>
  );
};

export default MyReviewTable;
