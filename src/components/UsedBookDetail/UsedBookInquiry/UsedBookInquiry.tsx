import { useState } from "react";
import { useHistory } from "react-router";
import UsedBookReplyItem from "src/components/UsedBookDetail/UsedBookInquiry/UsedBookReplyItem";
import { ReviewListEmpty } from "src/components/Reviews/ReviewList/ReviewListEmpty";
import Textarea from "src/components/TextArea/Textarea";
import { signInSelector } from "src/modules/Slices/signIn/signInSlice";
import { addUsedBookDetailReply, usedBookSelector } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CountWrapper, ProductDetailTitle, UsedBookStoreInformationWrapper, ReviewListEmptyWrapper } from "../style";

export interface submitParam {
  usedBookId: number;
  userId: number;
  content: string;
}

const UsedBookInquiry = () => {
  const { handleSubmit } = useForm<submitParam>();
  const history = useHistory();
  const dispatch = useDispatch();
  const usedBookContent = useTypedSelector(usedBookSelector);
  const { content } = usedBookContent;
  const { replyCount } = content;
  const { usedBookId } = content;

  const signIn = useTypedSelector(signInSelector);
  const { replyList } = useTypedSelector(usedBookSelector);
  const { isLoggedIn, user } = signIn;

  const [myContent, setContent] = useState<string>("");
  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const name = "상품 문의";

  const addReply: SubmitHandler<submitParam> = () => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/signIn");
      }
      return false;
    }
    return dispatch(
      addUsedBookDetailReply({
        usedBookId,
        userId: user.id,
        content: myContent,
      }),
    );
  };

  return (
    <UsedBookStoreInformationWrapper>
      <form onSubmit={handleSubmit(addReply)}>
        <ProductDetailTitle>
          <div>
            {name} <CountWrapper>{replyCount}</CountWrapper>
          </div>
          <Button variant="outlined" type="submit">
            문의하기
          </Button>
        </ProductDetailTitle>
        <Textarea
          isLoggedIn={isLoggedIn}
          onChange={handleReviewChange}
          checkAuth={() => {
            if (isLoggedIn) {
              return true;
            }
            if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
              history.replace("/signIn");
            }
            return false;
          }}
          value={myContent}
          limit={100}
          height={100}
          placeholder="상품 문의 작성 시 10자 이상 작성해주세요."
        />
      </form>
      {replyList.length !== 0 ? (
        <>
          {replyList.map((reply, idx) => (
            <div key={idx}>
              <UsedBookReplyItem review={reply} />
            </div>
          ))}
        </>
      ) : (
        <ReviewListEmptyWrapper>
          <ReviewListEmpty title={name} />
        </ReviewListEmptyWrapper>
      )}
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookInquiry;
