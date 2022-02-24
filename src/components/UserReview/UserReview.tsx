import { useCallback, useEffect, useState } from "react";
import useSignIn from "hooks/useSignIn";
import noComments from "assets/image/noComments.png";
import queryString from "query-string";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { getShopPage, removeShopPage, setShopPage } from "utils/localStorageUtil";
import { useTypedSelector } from "modules/store";
import {
  getMyReceivedUserReviewList,
  getUserReviewList,
  userReviewSelector,
} from "modules/Slices/userReview/userReviewSlice";
import { useMediaQuery } from "@mui/material";
import { CancelButton, FlexBox, UserReviewButtonArea } from "../BuyList/styles";
import { ReviewListEmptyParagraph, ReviewListEmptyWrapper } from "../Reviews/style";
import { Empty } from "../SaleList/style";
import WrittedReviewList from "./WrittedReviewList";
import ReceivedReviewContent from "./ReceivedReviewContent";
import MyPageSkeleton from "../BuyList/MyPageSkeleton";
import { UserReviewCell, UserReviewHeader, UserReviewWrapper } from "./styles";

const UserReview = () => {
  const { signIn, dispatch } = useSignIn();
  const { user } = signIn;
  const [receivedReview, writtedReview] = useState(true);
  const receivedReviewHeader = ["별점", "구매자명", "상품명", "내용", "작성일"];
  const receivedReviewHeader630 = ["상품내용", "내용", "작성일"];
  const writtedReviewHeader = ["별점", "판매자명", "상품명", "내용", "작성일", "기능"];
  const writtedReviewHeader900 = ["상품내용", "내용", "작성일", "기능"];

  const [headers, setHeader] = useState<string[]>(receivedReviewHeader);
  const [page, setPage] = useState(getShopPage(1));
  const [limit] = useState(5);
  const { list } = useTypedSelector(userReviewSelector);
  const { pages, pageCount } = list;
  const max630 = useMediaQuery("(max-width:630px)");
  const min630 = useMediaQuery("(min-width:630px)");
  const max900 = useMediaQuery("(max-width:900px)");
  const min900 = useMediaQuery("(min-width:900px)");

  const receivedReviewClick = () => {
    writtedReview(true);
    if (!max630) {
      setHeader(receivedReviewHeader);
    }
    if (max630) {
      setHeader(receivedReviewHeader630);
    }
  };

  const writtedReviewClick = () => {
    writtedReview(false);
    if (!max900) {
      setHeader(writtedReviewHeader);
    }
    if (max900) {
      setHeader(writtedReviewHeader900);
    }
  };

  const handleHasMoreList = useCallback(
    async (page: number, limit: number) => {
      if (user) {
        const query = queryString.stringify({ id: user.id, page, limit });
        const { token } = signIn;
        if (token) {
          if (receivedReview) {
            dispatch(getMyReceivedUserReviewList({ query, token }));
          } else if (!receivedReview) {
            dispatch(getUserReviewList({ query, token }));
          }
        }
      }
    },
    [user, signIn, receivedReview, dispatch],
  );

  useEffect(() => {
    handleHasMoreList(page, limit);
  }, [receivedReview, handleHasMoreList, page, limit]);

  const handlePaginationOnChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      handleHasMoreList(value, limit);
      setPage(value);
    },
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

  useEffect(() => {
    if (receivedReview) {
      if (max630) {
        setHeader(receivedReviewHeader630);
      }
      if (min630) {
        setHeader(receivedReviewHeader);
      }
    }
  }, [max630, min630]);

  useEffect(() => {
    if (!receivedReview) {
      if (max900) {
        setHeader(writtedReviewHeader900);
      }
      if (min900) {
        setHeader(writtedReviewHeader);
      }
    }
  }, [max900, min900]);

  const headerList = (
    <UserReviewHeader>
      {headers.map((text, idx) => (
        <UserReviewCell key={idx}>
          <span>{text}</span>
        </UserReviewCell>
      ))}
    </UserReviewHeader>
  );

  const writtedReviewList = pages.length ? (
    <WrittedReviewList contents={pages} dispatch={dispatch} signIn={signIn} />
  ) : list.isEmpty ? (
    <Empty>
      <ReviewListEmptyWrapper>
        <ReviewListEmptyParagraph>작성한 거래후기가 존재하지 않습니다.</ReviewListEmptyParagraph>
        <img src={noComments} alt="noComments" />
      </ReviewListEmptyWrapper>
    </Empty>
  ) : (
    Array.from({ length: limit }).map((_, idx) => (
      <FlexBox key={idx}>
        <MyPageSkeleton />
      </FlexBox>
    ))
  );

  const receivedMyReviewList = pages.length ? (
    <ReceivedReviewContent contents={pages} />
  ) : list.isEmpty ? (
    <Empty>
      <ReviewListEmptyWrapper>
        <ReviewListEmptyParagraph>받은 거래후기가 존재하지 않습니다.</ReviewListEmptyParagraph>
        <img src={noComments} alt="noComments" />
      </ReviewListEmptyWrapper>
    </Empty>
  ) : (
    Array.from({ length: limit }).map((_, idx) => (
      <FlexBox key={idx}>
        <MyPageSkeleton />
      </FlexBox>
    ))
  );

  return (
    <UserReviewWrapper>
      <UserReviewButtonArea>
        <CancelButton onClick={receivedReviewClick}>받은 거래 후기</CancelButton>
        <CancelButton onClick={writtedReviewClick}>작성 거래 후기</CancelButton>
      </UserReviewButtonArea>
      {headerList}
      {receivedReview ? <div>{receivedMyReviewList}</div> : <div>{writtedReviewList}</div>}
      {list.isEmpty || (
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
    </UserReviewWrapper>
  );
};

export default UserReview;
