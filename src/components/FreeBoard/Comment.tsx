import { Button } from "@mui/material";
import { memo } from "react";
import { dateFormat2 } from "src/utils/formatUtil";
import { CommentRow } from "./style";
import Editor from "../Editor/Editor";

interface CommentProps {
  userId: number | undefined;
  currentUpdateReplyId: number;
  handleReplyOnClick: (v: number, type: "update" | "delete" | "replyUpdate") => () => void;
  handleReplyUpdateOnChange: (v: string | number) => void;
  makeUserId: number;
  content: string;
  nickName: string;
  replyDate: string;
  replyId: number;
}

const Comment = ({
  content,
  makeUserId,
  nickName,
  replyDate,
  replyId,
  userId,
  currentUpdateReplyId,
  handleReplyOnClick,
  handleReplyUpdateOnChange,
}: CommentProps) => {
  const newContentInnerHTML = content.replaceAll("&lt;", "<");

  return (
    <CommentRow>
      <div>
        <div>
          <span>{nickName}</span>
          <span>{dateFormat2(replyDate)}</span>
        </div>
        {makeUserId === userId && (
          <div>
            <Button color="info" variant="contained" onClick={handleReplyOnClick(replyId, "update")}>
              수정
            </Button>
            <Button color="error" variant="contained" onClick={handleReplyOnClick(replyId, "delete")}>
              삭제
            </Button>
          </div>
        )}
      </div>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="view ql-editor" dangerouslySetInnerHTML={{ __html: newContentInnerHTML }} />
      {replyId === currentUpdateReplyId && (
        <div>
          <h1>수정하기</h1>
          <Editor
            setEditorValue={handleReplyUpdateOnChange}
            getEdiotrLength={handleReplyUpdateOnChange}
            value={newContentInnerHTML}
          />
          <div>
            <Button color="info" variant="contained" onClick={handleReplyOnClick(replyId, "replyUpdate")}>
              수정하기
            </Button>
          </div>
        </div>
      )}
    </CommentRow>
  );
};

export default memo(Comment);
