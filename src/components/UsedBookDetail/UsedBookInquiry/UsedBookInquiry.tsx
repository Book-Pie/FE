import { useCallback, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import UsedBookReplyItem from "components/UsedBookDetail/UsedBookInquiry/UsedBookReplyItem";
import { ReviewListEmpty } from "components/Reviews/ReviewList/ReviewListEmpty";
import Textarea from "components/TextArea/Textarea";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import {
  addUsedBookDetailReply,
  usedBookDetailReplyList,
  usedBookSelector,
} from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import Checkbox from "@mui/material/Checkbox";
import LockIcon from "@mui/icons-material/Lock";
import { useTypedSelector } from "modules/store";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { getUsedBookReplyPage, removeUsedBookReplyPage, setUsedBookReplyPage } from "utils/localStorageUtil";
import { Box, FormControlLabel } from "@mui/material";
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
  const { params } = useRouteMatch<{ id: string }>();
  const { id } = params;
  const { content, replyList, totalElements, totalPages } = useTypedSelector(usedBookSelector);
  const { isLoggedIn, user } = useTypedSelector(userReduceSelector);
  const { usedBookId } = content;
  const [myContent, setContent] = useState<string>("");
  const [page, setPage] = useState(getUsedBookReplyPage());
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

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
    if (Number(id) === usedBookId && totalPages !== 0 && replyList.length !== 0) {
      handleHasMoreList(0);
    }
  }, [usedBookId]);

  useEffect(() => {
    if (replyList.length === 0 && totalPages === 0 && Number(id) === usedBookId) {
      handleHasMoreList(page);
    }
  }, [handleHasMoreList, page]);

  useEffect(() => {
    if (getUsedBookReplyPage() === 0) setUsedBookReplyPage(page);
    return () => {
      removeUsedBookReplyPage();
    };
  });

  const handlePaginationOnChange = useCallback(
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
          secret: isChecked,
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
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<LockIcon fontSize="small" color="disabled" />}
                  checkedIcon={<LockIcon fontSize="small" color="action" />}
                  name="secret"
                  onChange={handleCheck}
                  checked={isChecked}
                />
              }
              label={
                <Box component="div" fontSize={14} color="#717374">
                  비밀댓글
                </Box>
              }
            />
            {myContent.length >= 10 ? (
              <Button variant="contained" type="submit" color="mainDarkBrown">
                문의하기
              </Button>
            ) : (
              <Button variant="contained" type="submit" color="mainLightBrown" disabled>
                문의하기
              </Button>
            )}
          </div>
        </ProductDetailTitle>
        <Textarea
          isLoggedIn={isLoggedIn}
          onChange={handleReviewChange}
          value={myContent}
          limit={100}
          height={100}
          placeholder="상품 문의 작성 시 10자 이상 작성해주세요."
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
