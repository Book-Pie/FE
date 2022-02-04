import { Grid, Skeleton, Stack } from "@mui/material";
import { memo } from "react";
import { Link } from "react-router-dom";
import { make1000UnitsCommaFormet } from "utils/formatUtil";
import * as Styled from "./style";
import * as Types from "./types";

const SearchReviewCard = ({ page }: Types.SearchReviewCardProp) => {
  let content = (
    <>
      <Skeleton variant="rectangular" height={300} animation="pulse" />
      <Stack direction="column" gap={1} padding={1.7}>
        <Skeleton variant="text" height={35} animation="pulse" />
        <Skeleton variant="text" height={20} animation="pulse" />
        <Stack direction="row" gap={1}>
          <Skeleton variant="rectangular" height={95} width="100%" animation="pulse" />
        </Stack>
      </Stack>
    </>
  );

  if (typeof page === "object") {
    const { isbn13, cover, title, priceSales, priceStandard, description, author } = page;
    content = (
      <Link to={`/book/category/${isbn13}`}>
        <Styled.SearchImg src={cover} alt="cover" />
        <div className="content">
          <Styled.SearchTitle>{title}</Styled.SearchTitle>
          <p className="author">{author !== "" && ` ${author}`}</p>
          <div className="state">
            <span className="state--lineThrough">정가 {make1000UnitsCommaFormet(String(priceStandard))}원</span>
            <span className="info">{make1000UnitsCommaFormet(String(priceSales))}원</span>
          </div>
          <div className="description">{description.replaceAll("&gt;", ">").replaceAll("&lt;", "<")}</div>
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

export default memo(SearchReviewCard);
