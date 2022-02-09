import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSignIn from "hooks/useSignIn";
import { getUsedBookLikeList, usedBookDetailSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "modules/store";
import noComments from "assets/image/noComments.png";
import UsedBookCard from "components/UsedBookList/UsedBookCard";
import { ReviewListEmptyParagraph, ReviewListEmptyWrapper } from "../Reviews/ReviewList/style";
import { CountWrapper } from "../UsedBookDetail/style";
import { ContentWrapper, Title, UsedBookLikeListWrapper, TitleSpan, EmptyWrapper, UsedBookLikeImg } from "./styles";

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

  const { likeList } = useTypedSelector(usedBookDetailSelector);
  const likeCount = likeList.length;

  return (
    <ContentWrapper>
      <Title>
        <TitleSpan>찜목록</TitleSpan>
        <CountWrapper>{likeCount}</CountWrapper>
      </Title>
      {likeList.length !== 0 && (
        <UsedBookLikeListWrapper>
          {likeList.map((card, idx) => (
            <div key={idx}>
              <UsedBookCard key={idx} card={card} width={100} />
            </div>
          ))}
        </UsedBookLikeListWrapper>
      )}

      {likeList.length === 0 && (
        <ReviewListEmptyWrapper>
          <EmptyWrapper>
            <UsedBookLikeImg src={noComments} alt="noComments" />
            <ReviewListEmptyParagraph>찜목록이 존재하지 않습니다.</ReviewListEmptyParagraph>
          </EmptyWrapper>
        </ReviewListEmptyWrapper>
      )}
    </ContentWrapper>
  );
};

export default UsedBookLikeList;
