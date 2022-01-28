import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import UsedBookReplyItem from "src/components/UsedBookDetail/UsedBookInquiry/UsedBookReplyItem";
import { ReviewListEmpty } from "src/components/Reviews/ReviewList/ReviewListEmpty";
import Textarea from "src/components/TextArea/Textarea";
import { signInSelector } from "src/modules/Slices/signIn/signInSlice";
import {
  addUsedBookDetailReply,
  usedBookDetailReplyList,
  usedBookSelector,
} from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { getUsedBookReplyPage, removeUsedBookReplyPage, setUsedBookReplyPage } from "src/utils/localStorageUtil";
import { CountWrapper, ProductDetailTitle, UsedBookStoreInformationWrapper, ReviewListEmptyWrapper } from "../style";

export interface submitParam {
  usedBookId: number;
  userId: number;
  content: string;
}

const UsedBookInquiry = () => {
  const { handleSubmit } = useForm<submitParam>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { content, replyList, totalElements, totalPages } = useTypedSelector(usedBookSelector);
  const { isLoggedIn, user } = useTypedSelector(signInSelector);
  const { usedBookId } = content;
  const [myContent, setContent] = useState<string>("");
  const [page, setPage] = useState(getUsedBookReplyPage());

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleHasMoreList = useCallback(
    async (page: number) => {
      if (usedBookId !== undefined) {
        dispatch(usedBookDetailReplyList({ usedBookId, page }));
      }
    },
    [dispatch, usedBookId],
  );

  useEffect(() => {
    if (replyList.length === 0 && totalPages === 0) {
      handleHasMoreList(page);
    }
  }, [handleHasMoreList, page]);

  useEffect(() => {
    if (getUsedBookReplyPage() === 0) setUsedBookReplyPage(page);
    return () => {
      removeUsedBookReplyPage();
    };
  });

  const handlePaginationOnChange1 = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      if (totalPages === 1) return;
      handleHasMoreList(value - 1);
      setPage(value - 1);
    },
    [handleHasMoreList, totalPages],
  );

  const addReply: SubmitHandler<submitParam> = () => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/signIn");
      }
      return false;
    }
    if (user !== null) {
      dispatch(
        addUsedBookDetailReply({
          usedBookId,
          userId: user.id,
          content: myContent,
        }),
      );
      return setContent("");
    }
    return false;
  };

  return (
    <UsedBookStoreInformationWrapper>
      <form onSubmit={handleSubmit(addReply)}>
        <ProductDetailTitle>
          <div>
            상품 문의 <CountWrapper>{totalElements}</CountWrapper>
          </div>
          <Button variant="outlined" type="submit">
            문의하기
          </Button>
        </ProductDetailTitle>
        <Textarea
          isLoggedIn={isLoggedIn}
          onChange={handleReviewChange}
          checkAuth={() => {
            if (isLoggedIn) {
              return true;
            }
            if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
              history.replace("/signIn");
            }
            return false;
          }}
          value={myContent}
          limit={100}
          height={100}
          placeholder="상품 문의 작성 시 10자 이상 작성해주세요."
        />
      </form>
      {replyList.length !== 0 ? (
        <>
          {replyList.map((reply, idx) => (
            <div key={idx}>
              <UsedBookReplyItem review={reply} />
            </div>
          ))}
          <Stack mt={5} justifyContent="center" direction="row">
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={handlePaginationOnChange1}
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
        </>
      ) : (
        <ReviewListEmptyWrapper>
          <ReviewListEmpty title="상품문의" />
        </ReviewListEmptyWrapper>
      )}
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookInquiry;
