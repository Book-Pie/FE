import React, { useCallback, useEffect, useState } from "react";
import { ReviewList } from "components/Reviews/ReviewList/ReviewList";
import {
  myReviewComment,
  reviewCommentList,
  commentsSelector,
  reviewBestComment,
} from "modules/Slices/comment/commentSlice";
import { useTypedSelector } from "modules/store";
import queryString from "query-string";
import { useHistory } from "react-router";
import { getShopPage, removeShopPage, setShopPage } from "utils/localStorageUtil";
import useSignIn from "hooks/useSignIn";
import { ReviewsParam } from "./types";
import { ReviewListEmpty } from "../ReviewList/ReviewListEmpty";
import { BestCommentListWrapper, BestReviewsListTitle, Container } from "../ReviewList/style";
import BestReviewItem from "../ReviewList/BestReviewItem";
import { ReviewsContentWrapper } from "./style";
import { ReviewForm } from "./ReviewForm";

export const Reviews = ({ bookId, categoryName }: ReviewsParam) => {
  const { signIn, dispatch } = useSignIn();
  const history = useHistory();
  const reviewSelector = useTypedSelector(commentsSelector);
  const { user, isLoggedIn, token } = signIn;
  const { myCommentCheck, content, myComment, totalElements, totalPages, bestComment } = reviewSelector;
  const [page, setPage] = useState(getShopPage(1));

  const handleHasMoreList = useCallback(
    async (page: number) => {
      const query = queryString.stringify({ page: page - 1 });
      dispatch(reviewCommentList({ bookId, query, token }));
    },
    [user, dispatch, bookId],
  );

  const handlePaginationOnChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      handleHasMoreList(value);
      setPage(value);
    },
    [handleHasMoreList],
  );

  useEffect(() => {
    handleHasMoreList(1);
  }, [dispatch, bookId, handleHasMoreList]);

  useEffect(() => {
    if (user && token) {
      if (myCommentCheck === true) {
        dispatch(myReviewComment({ bookId, token }));
      }
    }
  }, [dispatch, myCommentCheck]);

  useEffect(() => {
    const { content, empty, totalPages } = reviewSelector;
    if (content.length === 0 && totalPages === 0 && !empty) handleHasMoreList(page);
  }, [handleHasMoreList, page]);

  useEffect(() => {
    if (getShopPage() === 1) setShopPage(page);
    return () => {
      removeShopPage();
    };
  });

  useEffect(() => {
    dispatch(
      reviewBestComment({
        bookId,
      }),
    );
  }, [bookId, dispatch]);

  return (
    <ReviewsContentWrapper className="Reviews">
      {!!bestComment.length && (
        <>
          <BestReviewsListTitle>베스트 리뷰</BestReviewsListTitle>
          <BestCommentListWrapper>
            {bestComment.map((item, idx) => (
              <div key={idx}>
                <BestReviewItem item={item} />
              </div>
            ))}
          </BestCommentListWrapper>
        </>
      )}
      {content.length ? (
        <ReviewList
          commentList={content}
          pageCount={totalPages}
          totalCount={totalElements}
          page={page}
          onChange={handlePaginationOnChange}
        />
      ) : (
        <ReviewListEmpty title="리뷰" />
      )}
      <Container>
        <ReviewForm
          isbn={bookId}
          isMyReview={myCommentCheck}
          myComment={myComment}
          categoryName={categoryName}
          checkAuth={() => {
            if (isLoggedIn) {
              return true;
            }
            if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
              history.replace("/signIn");
            }
            return false;
          }}
        />
      </Container>
    </ReviewsContentWrapper>
  );
};
