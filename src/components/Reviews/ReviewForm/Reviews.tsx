import React, { useCallback, useEffect, useState } from "react";
import { ReviewList } from "components/Reviews/ReviewList/ReviewList";
import { ReviewWrite } from "components/Reviews/ReviewWrite";
import { myReviewComment, reviewCommentList, commentsSelector } from "src/modules/Slices/comment/commentSlice";
import { useTypedSelector } from "src/modules/store";
import queryString from "query-string";
import { useHistory } from "react-router";
import { getShopPage, removeShopPage, setShopPage } from "src/utils/localStorageUtil";
import useSignIn from "src/hooks/useSignIn";
import useDelay from "src/hooks/useDelay";
import { errorHandler } from "src/api/http";
import Loading from "src/elements/Loading";
import { ReviewsParams } from "./types";
import { ReviewListEmpty } from "../ReviewList/ReviewListEmpty";

export const Reviews: React.FC<ReviewsParams> = ({ bookId }) => {
  const { signIn, dispatch } = useSignIn();
  const history = useHistory();
  const reviewSelector = useTypedSelector(commentsSelector);

  const { user, isLoggedIn } = signIn;
  const { id } = user ?? -1;

  const { myCommentCheck, content, myComment, pageable, totalElements, totalPages } = reviewSelector;
  const { pageNumber } = pageable;
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(getShopPage(0));
  const delay = useDelay(500);

  const handleHasMoreList = useCallback(
    async (page: number) => {
      if (user) {
        const { id } = user;
        const query = queryString.stringify({ page });
        try {
          setIsLoading(true);
          await delay();
          dispatch(reviewCommentList({ bookId, id, query }));
        } catch (error: any) {
          alert(errorHandler(error));
        } finally {
          setIsLoading(false);
        }
      }
    },
    [user, delay, dispatch],
  );

  const handlePaginationOnChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      handleHasMoreList(value - 1);
      setPage(value - 1);
    },
    [handleHasMoreList],
  );

  useEffect(() => {
    dispatch(reviewCommentList({ bookId, id }));
    if (myCommentCheck === true) {
      dispatch(myReviewComment({ bookId, id }));
    }
  }, []);

  useEffect(() => {
    const { content, empty, totalPages } = reviewSelector;
    if (content.length === 0 && totalPages === 0 && !empty) handleHasMoreList(page);
  }, [handleHasMoreList, page]);

  useEffect(() => {
    if (getShopPage() === 0) setShopPage(page);
    return () => {
      removeShopPage();
    };
  });

  return (
    <div className="Reviews">
      <Loading isLoading={isLoading} />
      {/* 정렬 부분 */}
      {/* <ReviewListHeader bookId={bookId} />*/}
      {content.length ? (
        <ReviewList
          commentList={content}
          myCommentId={id}
          pageCount={totalPages}
          totalCount={totalElements}
          page={pageNumber}
          onChange={handlePaginationOnChange}
        />
      ) : (
        <ReviewListEmpty title="리뷰" />
      )}
      <ReviewWrite
        bookId={bookId}
        myReviewCheck={myCommentCheck}
        myComment={myComment}
        myCommentId={id}
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
    </div>
  );
};
