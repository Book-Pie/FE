import { getStoreUserReviewList, usedBookSelector } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import profileImg from "src/assets/image/pie3x.png";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { getShopPage, removeShopPage, setShopPage } from "src/utils/localStorageUtil";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FlexBox,
  RatingContent,
  ReviewDate,
  StoreReviewItemContent,
  StoreReviewItemNickName,
  StoreReviewItemWrapper,
} from "./styles";
import {
  ContentWrapper,
  CountWrapper,
  FlexBoxWrapper,
  PieImg,
  ProductDetailTitle,
  ProfileArea,
  UsedBookStoreInformationWrapper,
} from "../style";

const UsedBookStoreReview = () => {
  const { storeReviewList, pageCount, content } = useTypedSelector(usedBookSelector);
  const [page, setPage] = useState(getShopPage(1));
  const dispatch = useDispatch();
  const { sellerId } = content;

  const handleHasMoreList = useCallback(
    async (page: number) => {
      if (sellerId !== undefined) {
        dispatch(getStoreUserReviewList({ sellerId, page }));
      }
    },
    [dispatch, sellerId],
  );

  useEffect(() => {
    if (storeReviewList.length === 0 && pageCount === 0) handleHasMoreList(page);
  }, [handleHasMoreList, page]);

  const handlePaginationOnChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      handleHasMoreList(value);
      setPage(value);
    },
    [handleHasMoreList],
  );

  useEffect(() => {
    if (getShopPage() === 0) setShopPage(page);
    return () => {
      removeShopPage();
    };
  });

  const reviewList = storeReviewList.map((item, idx) => {
    const { buyerName, content, rating, reviewDate } = item;
    return (
      <StoreReviewItemWrapper key={idx}>
        <FlexBoxWrapper>
          <ProfileArea>
            <PieImg src={profileImg} alt="profileImg" />
          </ProfileArea>
          <ContentWrapper>
            <RatingContent>
              <Rating name="read-only" precision={0.5} value={rating} size="small" readOnly />
            </RatingContent>
            <FlexBox>
              <StoreReviewItemNickName>{buyerName}</StoreReviewItemNickName>
              <ReviewDate>{reviewDate.split("T", 1)}</ReviewDate>
            </FlexBox>
            <StoreReviewItemContent dangerouslySetInnerHTML={{ __html: content }} />
          </ContentWrapper>
        </FlexBoxWrapper>
      </StoreReviewItemWrapper>
    );
  });

  return (
    <UsedBookStoreInformationWrapper height="500px">
      <ProductDetailTitle>
        <div>
          상점후기 <CountWrapper>{pageCount * 3}</CountWrapper>
        </div>
      </ProductDetailTitle>
      {reviewList}
      <Stack mt={5} justifyContent="center" direction="row">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePaginationOnChange}
          variant="outlined"
          shape="rounded"
          size="large"
          sx={{
            ".Mui-selected": {
              background: theme => theme.colors.mainDarkBrown,
              color: theme => theme.colors.white,
            },
          }}
        />
      </Stack>
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookStoreReview;
