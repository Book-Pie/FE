import { useCallback, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import UsedBookReplyItem from "components/UsedBookDetail/UsedBookReplyItem";
import { ReviewListEmpty } from "components/Reviews/ReviewListEmpty";
import Textarea from "components/TextArea/Textarea";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import {
  addUsedBookDetailReply,
  usedBookDetailReplyList,
  usedBookDetailSelector,
  setReviewInit,
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
import { CountWrapper, ProductDetailTitle, UsedBookStoreInformationWrapper, ReviewListEmptyWrapper } from "./style";
import { SubmitParam } from "./types";

const UsedBookInquiry = () => {
  const { handleSubmit } = useForm<SubmitParam>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { params } = useRouteMatch<{ id: string }>();
  const { id } = params;
  const { content, replyList, totalElements, totalPages } = useTypedSelector(usedBookDetailSelector);
  const { isLoggedIn, user } = useTypedSelector(userReduceSelector);
  const { usedBookId, sellerId, sellerName } = content;
  const [myContent, setContent] = useState<string>("");
  const [page, setPage] = useState(getUsedBookReplyPage());
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleHasMoreList = useCallback(
    async (page: number) => {
      if (usedBookId !== undefined) {
        dispatch(usedBookDetailReplyList({ usedBookId, page }));
      }
    },
    [dispatch, usedBookId],
  );

  // ?????? ????????? ??????
  useEffect(() => {
    setReviewInit();
    if (Number(id) === usedBookId) {
      handleHasMoreList(0);
    }
  }, [usedBookId]);

  useEffect(() => {
    if (getUsedBookReplyPage() === 0) setUsedBookReplyPage(page);
    return () => {
      removeUsedBookReplyPage();
    };
  });

  // ?????? ????????? ??????
  const handlePaginationOnChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      if (totalPages === 1) return;
      handleHasMoreList(value - 1);
      setPage(value - 1);
    },
    [handleHasMoreList, totalPages],
  );

  const addReply: SubmitHandler<SubmitParam> = () => {
    if (!isLoggedIn) {
      if (window.confirm("???????????? ???????????????. ????????? ???????????? ?????????????????????????")) {
        history.replace("/signIn");
      }
      return false;
    }
    if (user !== null && usedBookId) {
      dispatch(
        addUsedBookDetailReply({
          usedBookId,
          userId: user.id,
          content: myContent,
          secret: isChecked,
        }),
      );
      setIsChecked(false);
      return setContent("");
    }
    return false;
  };

  return (
    <UsedBookStoreInformationWrapper width="80">
      <form onSubmit={handleSubmit(addReply)}>
        <ProductDetailTitle>
          <div>
            ?????? ?????? <CountWrapper>{totalElements}</CountWrapper>
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
                  ????????????
                </Box>
              }
            />
            {myContent.length >= 10 ? (
              <Button variant="contained" type="submit" color="mainDarkBrown">
                ????????????
              </Button>
            ) : (
              <Button variant="contained" type="submit" color="mainLightBrown" disabled>
                ????????????
              </Button>
            )}
          </div>
        </ProductDetailTitle>
        <Textarea
          isLoggedIn={isLoggedIn}
          onChange={handleReviewChange}
          value={myContent}
          placeholder="?????? ?????? ?????? ??? 10??? ?????? ??????????????????."
          checkAuth={() => {
            if (isLoggedIn) {
              return true;
            }
            if (window.confirm("???????????? ???????????????. ????????? ???????????? ?????????????????????????")) {
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
              {sellerId && sellerName && (
                <UsedBookReplyItem idx={idx} review={reply} sellerId={sellerId} sellerName={sellerName} page={page} />
              )}
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
          <ReviewListEmpty title="????????????" />
        </ReviewListEmptyWrapper>
      )}
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookInquiry;
