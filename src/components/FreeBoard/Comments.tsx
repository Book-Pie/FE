import { Button, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { errorHandler } from "api/client";
import useDebounce from "hooks/useDebounce";
import {
  freeboardCommentDeleteAsync,
  freeboardCommentInsertAsync,
  freeboardCommentsAsync,
  freeboardCommentUpdateAsync,
  getCommentContentsSelector,
  subReplyInsertAsync,
} from "modules/Slices/freeBoard/freeBoardSlice";
import { useAppDispatch, useTypedSelector } from "modules/store";
import Pagination from "@mui/material/Pagination";
import Editor from "../Editor/Editor";
import Comment from "./Comment";
import * as Styled from "./style";
import * as Types from "./types";

const Comments = ({ boardId, userId }: Types.CommentsProps) => {
  const [editorValue, setEditorValue] = useState<string>("");
  const [editorLength, setEditorLength] = useState<number>(0);
  const [currentUpdateReplyId, setCurrentUpdateReplyId] = useState<number>(0);
  const coList = useTypedSelector(getCommentContentsSelector(Number(boardId)));
  const debounce = useDebounce();
  const dispatch = useAppDispatch();

  const handleReplyOnClick = useCallback(
    (replyId: number, type: "update" | "delete" | "replyUpdate" | "subRely", value?: string, valeuLength?: number) =>
      () => {
        try {
          if (!userId) throw new Error("로그인은 필수입니다.");
          if (type === "update") setCurrentUpdateReplyId(prev => (replyId === prev ? 0 : replyId));
          if (type === "delete") {
            dispatch(freeboardCommentDeleteAsync({ replyId, boardId }))
              .unwrap()
              .then(message => alert(message));
          }

          if (type === "replyUpdate" && value) {
            if (valeuLength === 0) throw new Error("수정 댓글 내용은 필수입니다.");

            const content = value.replaceAll("<", "&lt;");
            dispatch(
              freeboardCommentUpdateAsync({
                userId,
                replyId,
                content,
              }),
            )
              .unwrap()
              .then(message => {
                setCurrentUpdateReplyId(0);
                alert(message);
              });
          }
          if (type === "subRely" && value) {
            if (valeuLength === 0) throw new Error("댓글 내용은 필수입니다.");
            const content = value.replaceAll("<", "&lt;");
            const payload = {
              content,
              parentReplyId: replyId,
              userId,
            };

            dispatch(
              subReplyInsertAsync({
                boardId,
                payload,
              }),
            );
          }
        } catch (error) {
          const message = errorHandler(error);
          alert(message);
        }
      },

    [boardId, dispatch, userId],
  );

  const handlePaginationOnChange = (_: any, value: number) => {
    dispatch(freeboardCommentsAsync({ boardId, page: value - 1 }));
  };

  const handleCreateOnSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { current } = debounce;
    if (current) clearTimeout(current);
    debounce.current = setTimeout(() => {
      try {
        if (editorLength === 0) throw new Error("댓글 내용은 필수입니다.");
        if (!userId) throw new Error("로그인은 필수입니다.");
        const content = editorValue.replaceAll("<", "&lt;");
        dispatch(
          freeboardCommentInsertAsync({
            userId,
            boardId,
            content,
          }),
        );
      } catch (error) {
        const message = errorHandler(error);
        alert(message);
      }
    }, 300);
  };

  useEffect(() => {
    if (!coList) dispatch(freeboardCommentsAsync({ boardId, page: 0 }));
  }, [dispatch, boardId, coList]);

  return (
    <Styled.CommentsWrapper>
      <Styled.CommentsTop>
        <h1 className="comments__header">
          <span>*</span>댓글쓰기
        </h1>
        <form className="comments_form" onSubmit={handleCreateOnSumit}>
          {userId ? (
            <Editor
              height={100}
              setEditorValue={setEditorValue}
              getEdiotrLength={setEditorLength}
              placeholder="댓글을 입력하세요."
            />
          ) : (
            <div className="comments__noLogin">
              <p>로그인이 필요한 서비스입니다.</p>
            </div>
          )}

          <div>
            <Button
              color="mainDarkBrown"
              variant="contained"
              type="submit"
              disabled={editorLength === 0 ? true : false}
            >
              {editorLength === 0 ? "내용은 필수" : "등록"}
            </Button>
          </div>
        </form>
      </Styled.CommentsTop>
      <Styled.CommentsBottom>
        {coList ? (
          coList.empty ? (
            <Styled.NoComments>댓글이 없습니다.</Styled.NoComments>
          ) : (
            coList.contents[coList.page].map(comment => {
              const { content, nickName, replyDate, replyId, userId: makeUserId, subReply } = comment;
              return (
                <Comment
                  key={replyId}
                  content={content}
                  nickName={nickName}
                  replyDate={replyDate}
                  replyId={replyId}
                  subReply={subReply}
                  isMakeUser={makeUserId === userId}
                  userId={userId}
                  currentUpdateReplyId={currentUpdateReplyId}
                  handleReplyOnClick={handleReplyOnClick}
                />
              );
            })
          )
        ) : null}
      </Styled.CommentsBottom>
      {coList && coList.empty === false && (
        <Stack justifyContent="center" direction="row">
          <Pagination
            siblingCount={0}
            count={coList.totalPages}
            page={coList.page + 1}
            variant="outlined"
            color="darkgray"
            shape="rounded"
            size="large"
            onChange={handlePaginationOnChange}
            sx={{
              ".Mui-selected": {
                background: theme => theme.colors.darkGrey,
                color: theme => theme.colors.white,
              },
            }}
          />
        </Stack>
      )}
    </Styled.CommentsWrapper>
  );
};

export default Comments;
