import { dateFormat2 } from "src/utils/formatUtil";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Button } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { memo, useCallback, useState } from "react";
import { useAppDispatch } from "src/modules/store";
import { useParams } from "react-router";
import { subReplyDeleteAsync, subReplyUpdateAsync } from "src/modules/Slices/freeBoard/freeBoardSlice";
import { errorHandler } from "src/api/http";
import * as Types from "./types";
import Editor from "../Editor/Editor";

const SubReply = ({ content, nickName, replyDate, isMakeUser, replyId, userId }: Types.SubReplyProps) => {
  const [currentUpdateSubReplyId, setCurrentUpdateSubReplyId] = useState<number>(0);
  const disptch = useAppDispatch();
  const { boardId } = useParams<{ boardId: string }>();
  const [subReplyEditorValue, setSubReplyEditorValue] = useState<string>("");
  const [subReplyEditorLength, setSubReplyEditorLength] = useState<number>(0);

  const newContentInnerHTML = content.replaceAll("&lt;", "<");

  const handleSubReplyDeleteOnClick = useCallback(
    (subReplyId: number) => () => {
      disptch(subReplyDeleteAsync({ boardId, subReplyId }));
    },
    [boardId, disptch],
  );

  const handleSUbReplyUpdateOnClick = useCallback(
    (replyId: number) => () => setCurrentUpdateSubReplyId(prev => (replyId === prev ? 0 : replyId)),
    [],
  );

  const handleSubReplyUpdateOnClick = () => {
    try {
      if (!userId) throw new Error("로그인이 필요합니다.");
      if (subReplyEditorLength === 0) throw new Error("댓글 내용은 필수입니다.");
      const content = subReplyEditorValue.replaceAll("<", "&lt;");
      disptch(
        subReplyUpdateAsync({
          boardId,
          payload: {
            content,
            replyId,
            userId,
          },
        }),
      )
        .unwrap()
        .then(message => {
          setCurrentUpdateSubReplyId(0);
          alert(message);
        });
    } catch (error) {
      const message = errorHandler(error);
      alert(message);
    }
  };

  return (
    <div>
      <div className="comment__userinfo">
        <div>
          <SubdirectoryArrowRightIcon sx={{ mr: 0.5, pt: 1 }} />
          <span>{nickName}</span>
          <span>{dateFormat2(replyDate)}</span>
        </div>
        {isMakeUser && (
          <ButtonGroup disableElevation variant="contained" size="small">
            <Button color="info" variant="contained" onClick={handleSUbReplyUpdateOnClick(replyId)}>
              수정
            </Button>
            <Button color="error" variant="contained" onClick={handleSubReplyDeleteOnClick(replyId)}>
              삭제
            </Button>
          </ButtonGroup>
        )}
      </div>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="view ql-editor" dangerouslySetInnerHTML={{ __html: newContentInnerHTML }} />
      {replyId === currentUpdateSubReplyId && (
        <div className="comment__update">
          <h1>대 댓글 수정하기</h1>
          <Editor
            setEditorValue={setSubReplyEditorValue}
            getEdiotrLength={setSubReplyEditorLength}
            value={newContentInnerHTML}
          />
          <div>
            <Button color="info" variant="contained" onClick={handleSubReplyUpdateOnClick}>
              대 댓글 수정하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SubReply);
