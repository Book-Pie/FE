import { useCallback, useEffect, useState } from "react";
import useSignIn from "src/hooks/useSignIn";
import noComments from "assets/image/noComments.png";
import { getShopPage, removeShopPage, setShopPage } from "src/utils/localStorageUtil";
import { useTypedSelector } from "src/modules/store";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {
  getStoreUserReviewList,
  setReviewInit,
  usedBookDetailSelector,
} from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import ReceivedReviewContent from "../UserReview/ReceivedReviewContent";
import { Empty } from "../SaleList/style";
import { ReviewListEmptyParagraph, ReviewListEmptyWrapper } from "../Reviews/ReviewList/style";
import {
  ShopContentWrapper,
  ShopSaleCell,
  ShopSaleTableHeader,
  ShopTitle,
  StoreReviewListCount,
  UserReviewTitleSpan,
} from "./styles";

const ShopUserReview = () => {
  const { dispatch } = useSignIn();
  const headers = ["별점", "구매자명", "상품명", "내용", "작성일"];
  const { storeReviewList, pageCount } = useTypedSelector(usedBookDetailSelector);
  const { shop } = useTypedSelector(userReduceSelector);
  const [page, setPage] = useState(getShopPage(1));
  const sellerId = shop?.id;

  const handleHasMoreList = useCallback(
    async (page: number) => {
      if (sellerId !== undefined) {
        dispatch(getStoreUserReviewList({ sellerId, page }));
      }
    },
    [dispatch, sellerId],
  );

  useEffect(() => {
    setReviewInit();
    if (pageCount !== 0 && storeReviewList.length !== 0) {
      handleHasMoreList(1);
    }
  }, [sellerId]);

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

  const headerList = (
    <ShopSaleTableHeader>
      {headers.map((text, idx) => (
        <ShopSaleCell key={idx}>
          <span>{text}</span>
        </ShopSaleCell>
      ))}
    </ShopSaleTableHeader>
  );

  const receivedMyReviewList = storeReviewList.length ? (
    <ReceivedReviewContent contents={storeReviewList} />
  ) : (
    <Empty>
      <ReviewListEmptyWrapper>
        <ReviewListEmptyParagraph>받은 거래후기가 존재하지 않습니다.</ReviewListEmptyParagraph>
        <img src={noComments} alt="noComments" />
      </ReviewListEmptyWrapper>
    </Empty>
  );

  return (
    <ShopContentWrapper>
      <ShopTitle>
        <UserReviewTitleSpan>
          받은 거래 후기 <StoreReviewListCount>{storeReviewList.length * 2}</StoreReviewListCount>
        </UserReviewTitleSpan>
      </ShopTitle>
      {headerList}
      <div>{receivedMyReviewList}</div>
      {storeReviewList.length !== 0 && (
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
    </ShopContentWrapper>
  );
};

export default ShopUserReview;
