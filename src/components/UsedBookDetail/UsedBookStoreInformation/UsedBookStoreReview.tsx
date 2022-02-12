import { getStoreUserReviewList, usedBookDetailSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "modules/store";
import profileImg from "assets/image/pie3x.png";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { getShopPage, removeShopPage, setShopPage } from "utils/localStorageUtil";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ReviewListEmpty } from "components/Reviews/ReviewList/ReviewListEmpty";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import {
  FlexBox,
  RatingContent,
  ReviewDate,
  StoreReviewItemContent,
  StoreReviewItemNickName,
  StoreReviewItemWrapper,
  StoreReviewNoneProfileImg,
  StoreReviewProfileImg,
} from "./styles";
import {
  ContentWrapper,
  CountWrapper,
  ProductDetailTitle,
  ProfileArea,
  ReviewListEmptyWrapper,
  StoreReviewFlexBoxWrapper,
  UsedBookStoreInformationWrapper,
} from "../style";

const UsedBookStoreReview = () => {
  const { storeReviewList, pageCount, content } = useTypedSelector(usedBookDetailSelector);
  const { params } = useRouteMatch<{ id: string }>();
  const { id } = params;
  const [page, setPage] = useState(getShopPage(1));
  const dispatch = useDispatch();
  const { sellerId, usedBookId } = content;

  const handleHasMoreList = useCallback(
    async (page: number) => {
      if (sellerId !== undefined) {
        dispatch(getStoreUserReviewList({ sellerId, page }));
      }
    },
    [dispatch, sellerId],
  );

  useEffect(() => {
    if (Number(id) === usedBookId && pageCount !== 0 && storeReviewList.length !== 0) {
      handleHasMoreList(1);
    }
  }, [usedBookId]);

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
    const { buyerName, content, rating, reviewDate, buyerId, buyerImage } = item;
    const shopId = String(buyerId);
    return (
      <StoreReviewItemWrapper key={idx}>
        <StoreReviewFlexBoxWrapper>
          <Link to={`/shop/${shopId}`}>
            <ProfileArea>
              {buyerImage ? (
                <StoreReviewProfileImg>
                  <img src={`${process.env.BASE_URL}/image/${buyerImage}`} alt="myProfileImg" />
                </StoreReviewProfileImg>
              ) : (
                <StoreReviewNoneProfileImg>
                  <img src={profileImg} alt="NoneProfileImg" />
                </StoreReviewNoneProfileImg>
              )}
            </ProfileArea>
          </Link>
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
        </StoreReviewFlexBoxWrapper>
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
      {reviewList.length ? (
        reviewList
      ) : (
        <ReviewListEmptyWrapper>
          <ReviewListEmpty title="상점후기" />
        </ReviewListEmptyWrapper>
      )}
      {reviewList.length !== 0 && (
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
      )}
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookStoreReview;
