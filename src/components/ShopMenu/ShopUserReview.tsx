import { useCallback, useEffect, useState } from "react";
import useSignIn from "src/hooks/useSignIn";
import { getShopPage, removeShopPage, setShopPage } from "src/utils/localStorageUtil";
import { useTypedSelector } from "src/modules/store";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {
  getStoreUserReviewList,
  setReviewInit,
  usedBookDetailSelector,
} from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useMediaQuery } from "@mui/material";
import ReceivedReviewContent from "../UserReview/ReceivedReviewContent";
import {
  Column,
  EmptyListWrapper,
  ShopContentWrapper,
  ShopSaleCell,
  ShopSaleTableHeader,
  ShopTitle,
  StoreReviewListCount,
  UserReviewTitleSpan,
} from "./styles";

const ShopUserReview = () => {
  const { dispatch } = useSignIn();
  const ShopUserReviewheaders = ["별점", "구매자명", "상품명", "내용", "작성일"];
  const ShopUserReviewheaders630 = ["상품내용", "내용", "작성일"];
  const max630 = useMediaQuery("(max-width:630px)");
  const min630 = useMediaQuery("(min-width:630px)");
  const [headers, setHeader] = useState<string[]>(ShopUserReviewheaders);
  const { storeReviewList, pageCount, storeReviewListTotal } = useTypedSelector(usedBookDetailSelector);
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

  useEffect(() => {
    if (max630) {
      setHeader(ShopUserReviewheaders630);
    }
    if (min630) {
      setHeader(ShopUserReviewheaders);
    }
  }, [max630, min630]);

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
    <EmptyListWrapper>
      <Column>
        <RateReviewIcon sx={{ fontSize: "3rem", color: "#c9c9ca", marginBottom: "0.5rem" }} />
        <div>받은 거래 후기가 없습니다.</div>
      </Column>
    </EmptyListWrapper>
  );

  return (
    <ShopContentWrapper>
      <ShopTitle>
        <UserReviewTitleSpan>
          받은 거래 후기 <StoreReviewListCount>{storeReviewListTotal}</StoreReviewListCount>
        </UserReviewTitleSpan>
      </ShopTitle>
      {storeReviewList.length !== 0 && headerList}
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
