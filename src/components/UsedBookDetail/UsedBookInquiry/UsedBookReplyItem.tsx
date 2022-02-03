import { useDispatch } from "react-redux";
import profileImg from "assets/image/pie3x.png";
import { ClickArea } from "components/Reviews/ReviewList/style";
import { Button } from "@mui/material";
import { UsedBookDetailReplyResponse } from "modules/Slices/usedBookDetail/types";
import { deleteUsedBookDetailReply, editUsedBookDetailReply } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { compareDateFormat } from "utils/formatUtil";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import Textarea from "src/components/TextArea/Textarea";
import { useTypedSelector } from "src/modules/store";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useHistory } from "react-router";
import { DateContent, SecretItem } from "./styles";
import {
  ContentWrapper,
  FlexBox,
  FlexBoxWrapper,
  PieImg,
  ProfileArea,
  ReplyItemContent,
  ReplyItemNickName,
  ReplyItemWrapper,
} from "../style";

export interface UsedBookReplyListParam {
  review: UsedBookDetailReplyResponse;
}

export const UsedBookReplyItem = ({ review }: UsedBookReplyListParam) => {
  const { nickName, replyDate, content, replyId, userId, secret } = review;
  const sx = { width: "12px", fontSize: "12px", padding: "2px", right: "20px" };
  const noId = -1;
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useTypedSelector(userReduceSelector);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [myContent, setContent] = useState<string>(content);
  const { id } = user ?? noId;
  const date = compareDateFormat(replyDate);
  let dayAgo = "일전";
  if (date === 0) {
    dayAgo = "오늘";
  }

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const deleteClick = () => {
    if (window.confirm("상품문의 댓글을 정말로 삭제하시겠습니까?") === true) {
      dispatch(
        deleteUsedBookDetailReply({
          id: replyId,
        }),
      );
    }
  };

  const handleUpdateClick = () => {
    setIsUpdate(!isUpdate);
  };

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate);
    setContent(content);
  };

  const editReview = () => {
    if (myContent.length <= 10) {
      alert("댓글을 10자 이상 입력해주세요.");
    } else if (window.confirm("댓글을 정말로 수정하시겠습니까?") === true) {
      dispatch(
        editUsedBookDetailReply({
          userId: id,
          replyId,
          content: myContent,
          secret,
        }),
      );
      setIsUpdate(!isUpdate);
    }
    return false;
  };

  return (
    <ReplyItemWrapper>
      <FlexBoxWrapper>
        <FlexBox>
          <ProfileArea>
            <PieImg src={profileImg} alt="profileImg" />
          </ProfileArea>
          <ContentWrapper>
            <ClickArea>
              {id === userId && !isUpdate && (
                <>
                  <Button
                    variant="contained"
                    color="mainDarkBrown"
                    sx={{ ...sx, marginRight: "10px" }}
                    onClick={handleUpdateClick}
                  >
                    수정
                  </Button>
                  <Button variant="contained" color="mainLightBrown" sx={sx} onClick={deleteClick}>
                    삭제
                  </Button>
                </>
              )}
              {id === userId && isUpdate && (
                <>
                  <Button
                    variant="contained"
                    color="mainDarkBrown"
                    sx={{ ...sx, marginRight: "10px" }}
                    onClick={editReview}
                  >
                    수정
                  </Button>
                  <Button variant="contained" color="mainLightBrown" sx={sx} onClick={handleUpdateCancel}>
                    취소
                  </Button>
                </>
              )}
            </ClickArea>
            {date !== 0 ? (
              <DateContent>
                {date} {dayAgo}
              </DateContent>
            ) : (
              <DateContent>{dayAgo}</DateContent>
            )}
            {secret ? (
              <ReplyItemNickName>
                {nickName} <LockIcon fontSize="small" color="disabled" />
              </ReplyItemNickName>
            ) : (
              <ReplyItemNickName>{nickName}</ReplyItemNickName>
            )}
            {id !== userId && secret ? (
              <SecretItem>비밀댓글입니다.</SecretItem>
            ) : isUpdate ? (
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
            ) : (
              <ReplyItemContent dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </ContentWrapper>
        </FlexBox>
      </FlexBoxWrapper>
    </ReplyItemWrapper>
  );
};

export default UsedBookReplyItem;
