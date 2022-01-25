import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSignIn from "src/hooks/useSignIn";
import noComments from "assets/image/noComments.png";
import queryString from "query-string";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { getShopPage, removeShopPage, setShopPage } from "src/utils/localStorageUtil";
import useDelay from "src/hooks/useDelay";
import { getReceivedReviewList, getWrittedReviewList } from "src/api/my/my";
import { errorHandler } from "src/api/http";
import { CancelButton, HeaderTitle, UserReviewButtonArea, UserReviewHeaderWrapper } from "../BuyList/styles";
import { ReviewListEmptyParagraph, ReviewListEmptyWrapper } from "../Reviews/ReviewList/style";
import { Empty } from "../SaleList/style";
import WrittedReviewList from "./WrittedReviewList";
import ReceivedReviewContent from "./ReceivedReviewContent";
import { ReceivedReviewList, ReceivedReviewListAxiosResponse } from "./types";

const UserReview = () => {
  const dispatch = useDispatch();
  const { signIn } = useSignIn();
  const { user } = signIn;
  const [receivedReview, writtedReview] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const receivedReviewHeader = ["별점", "구매자명", "상품명", "내용", "작성일"];
  const writtedReviewHeader = ["별점", "판매자명", "상품명", "내용", "작성일", "기능"];
  const [headers, setHeader] = useState<string[]>(receivedReviewHeader);
  const [limit, setLimit] = useState(5);
  const [list, setList] = useState<ReceivedReviewList>({
    page: getShopPage(1),
    pageCount: 0,
    pages: [],
    isEmpty: false,
  });
  const { pages, page, pageCount } = list;
  const delay = useDelay(500);

  const receivedReviewClick = () => {
    writtedReview(true);
    setHeader(receivedReviewHeader);
  };

  const writtedReviewClick = () => {
    writtedReview(false);
    setHeader(writtedReviewHeader);
  };

  const handleHasMoreList = useCallback(
    async (page: number, limit: number) => {
      if (user) {
        const query = queryString.stringify({ id: user.id, page, limit });
        try {
          setIsLoading(true);
          await delay();
          const { token } = signIn;
          if (token) {
            if (receivedReview) {
              const { data } = await getReceivedReviewList<ReceivedReviewListAxiosResponse>(query, token);
              const { pageCount, pages } = data.data;
              setList({
                pageCount,
                pages,
                page,
                isEmpty: pages.length === 0 ? true : false,
              });
            } else if (!receivedReview) {
              const { data } = await getWrittedReviewList<ReceivedReviewListAxiosResponse>(query, token);
              const { pageCount, pages } = data.data;
              setList({
                pageCount,
                pages,
                page,
                isEmpty: pages.length === 0 ? true : false,
              });
            }
          }
        } catch (error: any) {
          alert(errorHandler(error));
        } finally {
          setIsLoading(false);
        }
      }
    },
    [user, delay, signIn, receivedReview],
  );

  useEffect(() => {
    handleHasMoreList(page, limit);
  }, [receivedReview, handleHasMoreList, page, limit]);

  const handlePaginationOnChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => handleHasMoreList(value, limit),
    [handleHasMoreList, limit],
  );

  useEffect(() => {
    const { pages, pageCount, isEmpty, page } = list;
    if (pages.length === 0 && pageCount === 0 && !isEmpty) handleHasMoreList(page, limit);
  }, [handleHasMoreList, list, limit]);

  useEffect(() => {
    if (getShopPage() === 0) setShopPage(page);
    return () => {
      removeShopPage();
    };
  });

  const headerList = headers.map((header, idx) => (
    <div key={idx}>
      <HeaderTitle>{header}</HeaderTitle>
    </div>
  ));

  const writtedReviewList = pages.length ? (
    <WrittedReviewList contents={pages} dispatch={dispatch} signIn={signIn} />
  ) : (
    <Empty>
      <ReviewListEmptyWrapper>
        <ReviewListEmptyParagraph>작성한 거래후기가 존재하지 않습니다.</ReviewListEmptyParagraph>
        <img src={noComments} alt="noComments" />
      </ReviewListEmptyWrapper>
    </Empty>
  );

  const receivedMyReviewList = pages.length ? (
    <ReceivedReviewContent contents={pages} />
  ) : (
    <Empty>
      <ReviewListEmptyWrapper>
        <ReviewListEmptyParagraph>받은 거래후기가 존재하지 않습니다.</ReviewListEmptyParagraph>
        <img src={noComments} alt="noComments" />
      </ReviewListEmptyWrapper>
    </Empty>
  );

  return (
    <div>
      <UserReviewButtonArea>
        <CancelButton onClick={receivedReviewClick}>받은 거래 후기</CancelButton>
        <CancelButton onClick={writtedReviewClick}>작성 거래 후기</CancelButton>
      </UserReviewButtonArea>
      <UserReviewHeaderWrapper>{headerList}</UserReviewHeaderWrapper>
      {receivedReview ? <div>{receivedMyReviewList}</div> : <div>{writtedReviewList}</div>}
      {list.isEmpty || (
        <Stack mt={5} justifyContent="center" direction="row">
          <Pagination
            count={pageCount || limit}
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
    </div>
  );
};

export default UserReview;
