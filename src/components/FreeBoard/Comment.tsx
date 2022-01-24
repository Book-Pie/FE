import Button from "@mui/material/Button";
import { memo, useCallback, useState } from "react";
import { dateFormat2 } from "src/utils/formatUtil";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useTypedSelector } from "src/modules/store";
import { signInSelector } from "src/modules/Slices/signIn/signInSlice";
import * as Styled from "./style";
import Editor from "../Editor/Editor";
import * as Types from "./types";
import SubReply from "./SubReply";

const Comment = ({
  content,
  nickName,
  replyDate,
  replyId,
  subReply,
  currentUpdateReplyId,
  isMakeUser,
  userId,
  handleReplyOnClick,
}: Types.CommentProps) => {
  const [isSubReplyAdd, setIsSubReplyAdd] = useState<boolean>();
  const [updateEditorValue, setUpdateEditorValue] = useState<string>("");
  const [updateEditorLength, setUpdateEditorLength] = useState<number>(0);
  const [subReplyEditorValue, setSubReplyEditorValue] = useState<string>("");
  const [subReplyEditorLength, setSubReplyEditorLength] = useState<number>(0);
  const { isLoggedIn } = useTypedSelector(signInSelector);
  const newContentInnerHTML = content.replaceAll("&lt;", "<");

  const handleEditorOnChange = useCallback(
    (type: "update" | "reply") => (param: string | number) => {
      if (type === "update") {
        if (typeof param === "number") {
          setUpdateEditorLength(param);
        } else {
          setUpdateEditorValue(param);
        }
      }

      if (type === "reply") {
        if (typeof param === "number") {
          setSubReplyEditorLength(param);
        } else {
          setSubReplyEditorValue(param);
        }
      }
    },
    [],
  );

  const handleReplyAddOnClick = useCallback(() => setIsSubReplyAdd(prev => !prev), []);

  return (
    <Styled.CommentRow>
      <div className="comment__userinfo">
        <div>
          <span>{nickName}</span>
          <span>{dateFormat2(replyDate)}</span>
        </div>
        <ButtonGroup variant="contained" size="small">
          {isLoggedIn && (
            <Button color="mainDarkBrown" variant="contained" onClick={handleReplyAddOnClick}>
              댓글쓰기
            </Button>
          )}
          {isMakeUser && (
            <>
              <Button color="info" variant="contained" onClick={handleReplyOnClick(replyId, "update")}>
                수정
              </Button>
              <Button color="error" variant="contained" onClick={handleReplyOnClick(replyId, "delete")}>
                삭제
              </Button>
            </>
          )}
        </ButtonGroup>
      </div>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="view ql-editor" dangerouslySetInnerHTML={{ __html: newContentInnerHTML }} />
      {replyId === currentUpdateReplyId && (
        <div className="comment__update">
          <h1>수정하기</h1>
          <Editor
            setEditorValue={handleEditorOnChange("update")}
            getEdiotrLength={handleEditorOnChange("update")}
            value={newContentInnerHTML}
          />
          <div>
            <Button
              color="info"
              variant="contained"
              onClick={handleReplyOnClick(replyId, "replyUpdate", updateEditorValue, updateEditorLength)}
            >
              수정하기
            </Button>
          </div>
        </div>
      )}
      {isSubReplyAdd && (
        <div className="comment__subReply">
          <h1>댓글쓰기</h1>
          <Editor setEditorValue={handleEditorOnChange("reply")} getEdiotrLength={handleEditorOnChange("reply")} />
          <div>
            <Button
              color="info"
              variant="contained"
              onClick={handleReplyOnClick(replyId, "subRely", subReplyEditorValue, subReplyEditorLength)}
            >
              댓글등록
            </Button>
          </div>
        </div>
      )}
      <Styled.SubRely>
        {subReply.map(({ replyId, content, nickName, replyDate, userId: makeId }) => (
          <SubReply
            key={replyId}
            replyId={replyId}
            content={content}
            nickName={nickName}
            replyDate={replyDate}
            isMakeUser={makeId === userId}
            userId={userId}
          />
        ))}
      </Styled.SubRely>
    </Styled.CommentRow>
  );
};

export default memo(Comment);
