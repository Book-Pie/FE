import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSignIn from "hooks/useSignIn";
import { getUsedBookLikeList, usedBookSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "modules/store";
import noComments from "assets/image/noComments.png";
import styled from "styled-components";
import UsedBookCard from "components/UsedBookList/UsedBookCard";
import { ReviewListEmptyParagraph, ReviewListEmptyWrapper } from "../Reviews/ReviewList/style";
import { CountWrapper } from "../UsedBookDetail/style";
import { ContentWrapper, Title, UsedBookLikeListWrapper, TitleSpan } from "./styles";

const UsedBookLikeList = () => {
  const dispatch = useDispatch();
  const { signIn } = useSignIn();
  const { isLoggedIn } = signIn;

  useEffect(() => {
    if (isLoggedIn) {
      const { token } = signIn;
      if (token) {
        dispatch(getUsedBookLikeList(token));
      }
    }
  }, []);

  const { likeList } = useTypedSelector(usedBookSelector);
  const likeCount = likeList.length;
  const usedBookCards =
    likeList.length !== 0 ? (
      likeList.map((card, idx) => (
        <div key={idx}>
          <UsedBookCard key={idx} card={card} width={100} />
        </div>
      ))
    ) : (
      <ReviewListEmptyWrapper>
        <ReviewListEmptyParagraph>찜목록이 존재하지 않습니다.</ReviewListEmptyParagraph>
        <img src={noComments} alt="noComments" />
      </ReviewListEmptyWrapper>
    );

  return (
    <ContentWrapper>
      <Title>
        <TitleSpan>찜목록</TitleSpan>
        <CountWrapper>{likeCount}</CountWrapper>
      </Title>
      <UsedBookLikeListWrapper>{usedBookCards}</UsedBookLikeListWrapper>
    </ContentWrapper>
  );
};

export const GridEmpty = styled.div`
  justify-content: center;
`;

export default UsedBookLikeList;
