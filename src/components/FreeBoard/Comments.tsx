import { Button, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { errorHandler } from "src/api/http";
import useDebounce from "src/hooks/useDebounce";
import {
  commentDeleteAsync,
  commentInsertAsync,
  commentListAsync,
  commentUpdateAsync,
  getCommentContentsSelector,
} from "src/modules/Slices/freeBoard/freeBoardSlice";
import { useAppDispatch, useTypedSelector } from "src/modules/store";
import Pagination from "@mui/material/Pagination";
import Editor from "../Editor/Editor";
import Comment from "./Comment";
import { NoComments, CommentsBottom, CommentsTop, CommentsWrapper } from "./style";
import * as Types from "./types";

const Comments = ({ boardId, userId }: Types.CommentsProps) => {
  const [editorValue, setEditorValue] = useState<string>("");
  const [editorLength, setEditorLength] = useState<number>(0);
  const [currentUpdateReplyId, setCurrentUpdateReplyId] = useState<number>(0);
  const [updateEditorValue, setUpdateEditorValue] = useState<string>("");
  const [updateEditorLength, setUpdateEditorLength] = useState<number>(0);
  const coList = useTypedSelector(getCommentContentsSelector(Number(boardId)));
  const debounce = useDebounce();
  const dispatch = useAppDispatch();

  const handleReplyUpdateOnChange = (param: string | number) => {
    if (typeof param === "number") {
      setUpdateEditorLength(param);
    } else {
      setUpdateEditorValue(param);
    }
  };

  const handleReplyOnClick = useCallback(
    (replyId: number, type: "update" | "delete" | "replyUpdate") => () => {
      if (type === "update") {
        setCurrentUpdateReplyId(prev => (replyId === prev ? 0 : replyId));
      }

      if (type === "delete") {
        dispatch(commentDeleteAsync({ replyId, boardId }))
          .unwrap()
          .then(message => alert(message));
      }

      if (type === "replyUpdate") {
        try {
          if (updateEditorLength === 0) throw new Error("수정 댓글 내용은 필수입니다.");
          if (!userId) throw new Error("로그인은 필수입니다.");
          const content = updateEditorValue.replaceAll("<", "&lt;");
          dispatch(
            commentUpdateAsync({
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
        } catch (error) {
          const message = errorHandler(error);
          alert(message);
        }
      }
    },
    [boardId, dispatch, updateEditorLength, updateEditorValue, userId],
  );

  const handlePaginationOnChange = (_: any, value: number) => {
    dispatch(commentListAsync({ boardId, page: value - 1 }));
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
          commentInsertAsync({
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
    if (!coList) dispatch(commentListAsync({ boardId, page: 0 }));
  }, [dispatch, boardId, coList]);

  const pagiNation = coList ? (
    coList.empty ? null : (
      <Stack mt={5} justifyContent="center" direction="row">
        <Pagination
          count={coList.totalPages}
          page={coList.page + 1}
          variant="outlined"
          shape="rounded"
          size="large"
          onChange={handlePaginationOnChange}
          sx={{
            ".Mui-selected": {
              background: theme => theme.colors.mainDarkBrown,
              color: theme => theme.colors.white,
            },
          }}
        />
      </Stack>
    )
  ) : null;

  return (
    <CommentsWrapper>
      <CommentsTop>
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
      </CommentsTop>
      <CommentsBottom>
        {coList ? (
          coList.empty ? (
            <NoComments>댓글이 없습니다.</NoComments>
          ) : (
            coList.contents[coList.page].map(comment => {
              const { content, nickName, replyDate, replyId, userId: makeUserId } = comment;
              return (
                <Comment
                  key={replyId}
                  content={content}
                  nickName={nickName}
                  replyDate={replyDate}
                  replyId={replyId}
                  makeUserId={makeUserId}
                  userId={userId}
                  currentUpdateReplyId={currentUpdateReplyId}
                  handleReplyUpdateOnChange={handleReplyUpdateOnChange}
                  handleReplyOnClick={handleReplyOnClick}
                />
              );
            })
          )
        ) : null}
      </CommentsBottom>
      {pagiNation}
    </CommentsWrapper>
  );
};

export default Comments;
