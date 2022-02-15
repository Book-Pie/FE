import { useDispatch } from "react-redux";
import profileImg from "assets/image/pie3x.png";
import { ClickArea } from "components/Reviews/style";
import { Button } from "@mui/material";
import { deleteUsedBookDetailReply, editUsedBookDetailReply } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { compareDateFormat } from "utils/formatUtil";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import Textarea from "src/components/TextArea/Textarea";
import { useTypedSelector } from "src/modules/store";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  ContentWrapper,
  FlexBoxWrapper,
  FlexBox,
  ReplyItemContent,
  ReplyItemNickName,
  ReplyItemWrapper,
  DateContent,
  NoneProfileImg,
  ProfileImg,
  SecretItem,
} from "./style";
import SubReply from "./SubReply";
import { UsedBookReplyListParam } from "./types";

export const UsedBookReplyItem = ({ review, sellerId, sellerName, page }: UsedBookReplyListParam) => {
  const { nickName, replyDate, content, replyId, userId, secret, subReply, profile } = review;
  const sx = { width: "12px", fontSize: "12px", padding: "2px", right: "20px" };
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useTypedSelector(userReduceSelector);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [myContent, setContent] = useState<string>(content);
  const [isSubReplyAdd, setIsSubReplyAdd] = useState<boolean>(false);
  const date = compareDateFormat(replyDate);
  const shopId = String(userId);
  let dayAgo = "일전";
  if (date === 0) {
    dayAgo = "오늘";
  }

  const handleUpdateClick = () => {
    setIsUpdate(true);
    setContent(content);
  };

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate);
    setContent(content);
  };

  const handleSubReplyClick = () => {
    setIsSubReplyAdd(!isSubReplyAdd);
  };

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

  const editReview = () => {
    if (myContent.length <= 10) {
      alert("댓글을 10자 이상 입력해주세요.");
    } else if (window.confirm("댓글을 정말로 수정하시겠습니까?") === true) {
      dispatch(
        editUsedBookDetailReply({
          replyId,
          content: myContent,
        }),
      );
      setIsUpdate(!isUpdate);
    }
  };

  return (
    <>
      <ReplyItemWrapper>
        <FlexBoxWrapper>
          <FlexBox>
            <Link to={`/shop/${shopId}`}>
              {profile ? (
                <ProfileImg storeReview>
                  <img src={`${process.env.BASE_URL}/image/${profile}`} alt="myProfileImg" />
                </ProfileImg>
              ) : (
                <NoneProfileImg storeReview>
                  <img src={profileImg} alt="myProfileImg" />
                </NoneProfileImg>
              )}
            </Link>
            <ContentWrapper>
              <ClickArea>
                {user && user.id === sellerId && (
                  <Button
                    variant="contained"
                    color="mainDarkBrown"
                    sx={{ ...sx, marginRight: "10px" }}
                    onClick={handleSubReplyClick}
                  >
                    답글
                  </Button>
                )}
                {user && user.id === userId && !isUpdate && (
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
                {user && user.id === userId && isUpdate && (
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
              {date !== 0 && (
                <DateContent>
                  {date} {dayAgo}
                </DateContent>
              )}
              {date === 0 && <DateContent>{dayAgo}</DateContent>}
              {secret && (
                <ReplyItemNickName>
                  {nickName} <LockIcon fontSize="small" color="disabled" />
                </ReplyItemNickName>
              )}
              {!secret && <ReplyItemNickName>{nickName}</ReplyItemNickName>}
              {user && user.id !== userId && user.id !== sellerId && secret ? (
                <SecretItem>비밀댓글입니다.</SecretItem>
              ) : isUpdate ? (
                <Textarea
                  isLoggedIn={isLoggedIn}
                  onChange={handleReviewChange}
                  value={myContent}
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
      {subReply && (
        <SubReply
          subReply={subReply[0]}
          replyId={replyId}
          sx={sx}
          sellerName={sellerName}
          sellerId={sellerId}
          page={page}
        />
      )}
      {isSubReplyAdd && (
        <SubReply
          replyId={replyId}
          isSubReplyAdd={isSubReplyAdd}
          sx={sx}
          sellerName={sellerName}
          sellerId={sellerId}
          page={page}
        />
      )}
    </>
  );
};

export default UsedBookReplyItem;
