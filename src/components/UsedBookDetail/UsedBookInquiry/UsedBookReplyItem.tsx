import { useDispatch } from "react-redux";
import profileImg from "assets/image/pie3x.png";
import { Button, ClickArea } from "components/Reviews/ReviewList/style";
import useSignIn from "hooks/useSignIn";
import { UsedBookDetailReplyResponse } from "modules/Slices/usedBookDetail/types";
import { deleteUsedBookDetailReply } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { compareDateFormat } from "utils/formatUtil";
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
import { DateContent } from "./styles";

export interface UsedBookReplyListParam {
  review: UsedBookDetailReplyResponse;
}

export const UsedBookReplyItem: React.FC<UsedBookReplyListParam> = props => {
  const { review } = props;
  const { nickName, replyDate, content, replyId, userId } = review;
  const noId = -1;
  const dispatch = useDispatch();
  const { signIn } = useSignIn();
  const { user } = signIn;
  const { id } = user ?? noId;
  const date = compareDateFormat(replyDate);
  let dayAgo = "일전";
  if (date === 0) {
    dayAgo = "오늘";
  }

  const deleteClick = () => {
    if (window.confirm("상품문의 댓글을 정말로 삭제하시겠습니까?") === true) {
      deleteReview(replyId);
    }
  };

  const deleteReview = (replyId: number) => {
    dispatch(
      deleteUsedBookDetailReply({
        id: replyId,
      }),
    );
  };

  return (
    <ReplyItemWrapper>
      <FlexBoxWrapper>
        <FlexBox>
          <ProfileArea>
            <PieImg src={profileImg} alt="profileImg" />
          </ProfileArea>
          <ContentWrapper>
            {date !== 0 ? (
              <DateContent>
                {date} {dayAgo}
              </DateContent>
            ) : (
              <DateContent>{dayAgo}</DateContent>
            )}
            <ReplyItemNickName>{nickName}</ReplyItemNickName>
            <ReplyItemContent dangerouslySetInnerHTML={{ __html: content }} />
          </ContentWrapper>
        </FlexBox>
        <ClickArea>{id === userId && <Button onClick={deleteClick}>x</Button>}</ClickArea>
      </FlexBoxWrapper>
    </ReplyItemWrapper>
  );
};

export default UsedBookReplyItem;
