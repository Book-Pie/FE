import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSignIn from "src/hooks/useSignIn";
import { getUsedBookDetailLike, usedBookSelector } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import UsedBookCard from "../UsedBookCard/UsedBookCard";
import { CountWrapper } from "../UsedBookDetail/style";
import { ContentWrapper, Title, UsedBookLikeListWrapper, TitleSpan } from "./styles";

const BookLikeList = () => {
  const dispatch = useDispatch();
  const { signIn } = useSignIn();
  const { isLoggedIn } = signIn;

  useEffect(() => {
    if (isLoggedIn) {
      const { token } = signIn;
      if (token) {
        dispatch(getUsedBookDetailLike(token));
      }
    }
  }, []);

  const { likeList } = useTypedSelector(usedBookSelector);
  const likeCount = likeList.length;
  const usedBookCards = likeList.map((card, idx) => (
    <div key={idx}>
      <UsedBookCard key={idx} card={card} width={100} />
    </div>
  ));

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

export default BookLikeList;
