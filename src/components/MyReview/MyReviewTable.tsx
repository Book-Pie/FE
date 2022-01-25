import { dateFormat2 } from "utils/formatUtil";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import * as Types from "./types";
import * as Styled from "./style";

const MyReviewTable = ({ contents }: Types.MyReviewTableProps) => {
  return (
    <Styled.MyReviewTableWrapper>
      <Grid container className="header">
        <Grid item sm={1} xs={1}>
          <Stack direction="row" alignItems="center" justifyContent="center" height="100%">
            <span>리뷰 번호</span>
          </Stack>
        </Grid>
        <Grid item sm={5} xs={3}>
          <Stack direction="row" alignItems="center" justifyContent="center" height="100%">
            <span>리뷰 내용</span>
          </Stack>
        </Grid>
        <Grid item sm={2} xs={2}>
          <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
            <span>리뷰 별점</span>
          </Stack>
        </Grid>
        <Grid item sm={3} xs={3}>
          <Stack direction="row" alignItems="center" justifyContent="center" height="100%">
            <span>리뷰 등록 시간</span>
          </Stack>
        </Grid>
        <Grid item sm={1} xs={1}>
          <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
            <span>리뷰 좋아요</span>
          </Stack>
        </Grid>
      </Grid>
      {contents.map(({ isbn, content, rating, reviewDate, reviewLikeCount, reviewId }) => (
        <Grid container key={isbn}>
          <Grid item sm={1} xs={1}>
            <Stack direction="row" alignItems="center" justifyContent="center" height="100%">
              <span>{reviewId}</span>
            </Stack>
          </Grid>
          <Grid item sm={5} xs={3}>
            <Stack direction="row" alignItems="center" height="100%">
              <Link to={`/book/${isbn}`}>{content}</Link>
            </Stack>
          </Grid>
          <Grid item sm={2} xs={2}>
            <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
              <Rating name="read-only" value={rating} readOnly />
              <span>{rating} / 5점</span>
            </Stack>
          </Grid>
          <Grid item sm={3} xs={3}>
            <Stack direction="row" alignItems="center" justifyContent="center" height="100%">
              <span> {dateFormat2(reviewDate)}</span>
            </Stack>
          </Grid>
          <Grid item sm={1} xs={1}>
            <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
              <FavoriteIcon sx={{ color: "#ff3d47" }} />
              <span>{reviewLikeCount}개</span>
            </Stack>
          </Grid>
        </Grid>
      ))}
    </Styled.MyReviewTableWrapper>
  );
};

export default MyReviewTable;
