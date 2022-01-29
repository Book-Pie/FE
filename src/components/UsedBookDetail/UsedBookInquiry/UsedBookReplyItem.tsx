import { useDispatch } from "react-redux";
import profileImg from "assets/image/pie3x.png";
import { Button, ClickArea } from "src/components/Reviews/ReviewList/style";
import useSignIn from "src/hooks/useSignIn";
import { usedBookDetailReplyResponse } from "src/modules/Slices/usedBookDetail/types";
import { deleteUsedBookDetailReply } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
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
  review: usedBookDetailReplyResponse;
}

export const UsedBookReplyItem: React.FC<UsedBookReplyListParam> = props => {
  const { review } = props;
  const { nickName, replyDate, content, replyId, userId } = review;
  const noId = -1;
  const dispatch = useDispatch();
  const { signIn } = useSignIn();
  const { user } = signIn;
  const { id } = user ?? noId;

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
            <div>{replyDate}</div>
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
