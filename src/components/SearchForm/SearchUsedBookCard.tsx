import { Grid, Skeleton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { make1000UnitsCommaFormet } from "utils/formatUtil";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { StateEnumType } from "components/SaleList/types";
import { useMemo } from "react";
import * as Styled from "./style";
import * as Types from "./types";

const SearchUsedBookCard = ({ page }: Types.SearchUsedBookCardProp) => {
  const STATE_ENUM: StateEnumType = useMemo(
    () => ({
      SALE: "판매 중",
      TRADING: "거래 중",
      SOLD_OUT: "판매 완료",
    }),
    [],
  );

  let content = (
    <>
      <Skeleton variant="rectangular" height={300} animation="pulse" />
      <Stack direction="column" gap={1} padding={1.7}>
        <Skeleton variant="text" height={35} animation="pulse" />
        <Skeleton variant="text" height={20} animation="pulse" />
        <Stack direction="row" gap={1}>
          <Skeleton variant="rectangular" height={20} width={20} animation="pulse" />
          <Skeleton variant="rectangular" height={20} width={20} animation="pulse" />
          <Skeleton variant="rectangular" height={20} width={20} animation="pulse" />
          <Skeleton variant="rectangular" height={20} width={20} animation="pulse" />
        </Stack>
      </Stack>
    </>
  );

  if (typeof page === "object") {
    const { id, image, likeCount, price, replyCount, state, title } = page;
    content = (
      <Link to={`/usedBook/${id}`}>
        <Styled.SearchImg src={`${process.env.BASE_URL}/image/${image}`} alt="usedbookImg" />
        <div className="content">
          <Styled.SearchTitle>{title}</Styled.SearchTitle>
          <div className="state">
            <span>{STATE_ENUM[state]}</span> <span className="info">{make1000UnitsCommaFormet(String(price))}원</span>
          </div>
          <div className="like">
            <FavoriteIcon sx={{ color: "#ff3d47" }} />
            <span>{likeCount}</span>
            <InsertCommentIcon />
            <span>{replyCount}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Grid item xs={6} sm={6} md={3}>
      <Styled.SearchCard>{content}</Styled.SearchCard>
    </Grid>
  );
};

export default SearchUsedBookCard;
