import { SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSignIn from "hooks/useSignIn";
import {
  deleteUsedBookLike,
  getUsedBookLikeList,
  usedBookDetailSelector,
} from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "modules/store";
import noComments from "assets/image/noComments.png";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { ReviewListEmptyParagraph, ReviewListEmptyWrapper } from "../Reviews/style";
import { CountWrapper } from "../UsedBookDetail/style";
import {
  ContentWrapper,
  EmptyWrapper,
  UsedBookLikeImg,
  UsedBookLikeTitleSpan,
  UsedBookLikeTitle,
  Header,
  UsedBookLikeListWrapper,
  LikeCardWrapper,
} from "./styles";
import { StateEnumType } from "../UsedBookList/types";

const UsedBookLikeList = () => {
  const dispatch = useDispatch();
  const { signIn } = useSignIn();
  const { isLoggedIn } = signIn;
  const STATE_ENUM: StateEnumType = {
    SALE: "판매 중",
    SOLD_OUT: "판매완료",
    TRADING: "거래 중",
  };
  const { token } = useTypedSelector(userReduceSelector);

  const [checkItems, setCheckItems] = useState<number[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      const { token } = signIn;
      if (token) {
        dispatch(getUsedBookLikeList(token));
      }
    }
  }, []);

  const { likeList } = useTypedSelector(usedBookDetailSelector);

  // 개별선택
  function checkHandler(checked: boolean, id: number) {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      // 체크해제
      setCheckItems(checkItems.filter(o => o !== id));
    }
  }

  // 전체선택
  function checkAllHandler(checked: boolean) {
    if (checked) {
      const ids: SetStateAction<number[]> = [];
      likeList.forEach(v => ids.push(v.id));
      setCheckItems(ids);
    } else {
      setCheckItems([]);
    }
  }

  const deleteLikeClick = (e: React.FormEvent<HTMLFormElement>) => {
    if (checkItems.length === 0) return alert("삭제할 찜상품을 선택해주세요.");
    if (window.confirm("선택한 찜 상품을 삭제하시겠습니까?") === true) {
      if (token) {
        return dispatch(deleteUsedBookLike({ checkItems, token }));
      }
      return alert("로그인이 필요한 서비스 입니다.");
    }
    e.preventDefault();
    return false;
  };

  return (
    <ContentWrapper>
      <UsedBookLikeTitle>
        <UsedBookLikeTitleSpan>찜목록</UsedBookLikeTitleSpan>
        <CountWrapper>{likeList.length}</CountWrapper>
      </UsedBookLikeTitle>
      {likeList.length !== 0 && (
        <Header>
          <form onSubmit={deleteLikeClick}>
            <FormControlLabel
              control={<Checkbox color="info" onChange={e => checkAllHandler(e.target.checked)} />}
              label="전체선택"
            />
            <Button variant="outlined" color="info" type="submit">
              선택삭제
            </Button>
          </form>
        </Header>
      )}
      {likeList.length !== 0 && (
        <UsedBookLikeListWrapper>
          {likeList.map((card, idx) => {
            const { id, image, price, title, state } = card;
            return (
              <div key={idx}>
                <LikeCardWrapper width={13}>
                  <div className="usedBookCard__imgBox">
                    <label htmlFor={String(id)}>
                      <Checkbox
                        id={String(id)}
                        checked={checkItems.indexOf(id) >= 0 ? true : false}
                        color="info"
                        onChange={e => checkHandler(e.target.checked, id)}
                      />
                      <img src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
                    </label>
                  </div>
                  <Link to={`/usedBook/${id}`}>
                    <div className="usedBookCard__content">
                      <p className="usedBookCard__title">{title}</p>
                      <div className="usedBookCard__price">
                        <strong>판매가</strong>
                        <span>:</span>
                        <span> {make1000UnitsCommaFormet(`${price}`)}원</span>
                      </div>
                      <p className={`${state === "SOLD_OUT" ? "red" : ""} usedBookCard__state`}>{STATE_ENUM[state]}</p>
                    </div>
                  </Link>
                </LikeCardWrapper>
              </div>
            );
          })}
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
