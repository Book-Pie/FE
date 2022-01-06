import React, { useEffect } from "react";
import { useState } from "react";
import { ButtonArea } from "./style";
import { CancelButton, ClickButton, SubmitButton } from "./SubmitButton";
import { ReviewTextarea } from "./ReviewTextarea";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addComment, editComment } from "../../../modules/Slices/commentSlice";
import { dateFormat } from "src/utils/formatDate";
import { ReviewFormProps } from "./types";

export const ReviewForm: React.FC<ReviewFormProps> = ({
  bookId,
  isMyReview,
  autoFocus,
  isDisabled,
  myReviewContent,
}) => {
  const { handleSubmit, register, reset } = useForm({ defaultValues: { something: "anything" } });

  // 임시 유저 데이터
  const user_id: number = 5;
  const review_id: number = 6;
  const nickname: string = "테스트 닉네임";
  const rating: number = 3;
  const reviewLikeCount: number = 0;
  const likeCheck: boolean = false;

  console.log("ReviewForm myReviewContent 데이터 state : ", myReviewContent.content);

  let editStatus = true;
  if (myReviewContent.content === undefined) {
    editStatus = false;
  } else {
    editStatus = true;
  }

  const dispatch = useDispatch();
  const [reviewContent, setContent] = useState(""); // 리뷰 등록
  const [myContent, setMyContent] = useState(myReviewContent.content); // 리뷰 수정
  const [editDisabled, editEnabled] = useState(editStatus);

  useEffect(() => {
    setMyContent(myReviewContent.content);
  }, []);

  const onChangeReviewContent = (e: React.ChangeEvent<any>) => {
    setContent(e.target.value);
  };

  const addReview = (e: React.ChangeEvent<any>) => {
    // 로그인 시 리뷰 입력 기능 추가 필요
    dispatch(
      addComment({
        user_id: user_id,
        review_id: review_id,
        nickname: nickname,
        rating: rating,
        content: reviewContent,
        reviewDate: dateFormat(new Date()),
        reviewLikeCount: reviewLikeCount,
        likeCheck: likeCheck,
      }),
    );
    setContent("");
  };

  const editReview = (e: React.ChangeEvent<any>) => {
    dispatch(
      editComment({
        user_id: user_id,
        review_id: review_id,
        nickname: nickname,
        rating: rating,
        content: reviewContent,
        reviewDate: dateFormat(new Date()),
        reviewLikeCount: reviewLikeCount,
        likeCheck: likeCheck,
      }),
    );
    editEnabled(prev => !prev);
  };

  const handleEdit = () => {
    editEnabled(prev => !prev);
  };

  console.log("ReviewForm myReviewContent 데이터 : ", myReviewContent);
  console.log("ReviewForm myReviewContent 배열 데이터 : ", myReviewContent[0]);

  console.log("ReviewForm myReviewContent?.content 데이터 : ", myReviewContent?.content);
  console.log("ReviewForm myReviewContent.content 데이터 : ", myReviewContent.content);

  console.log("ReviewForm myContent 데이터 : ", myContent);

  console.log("ReviewForm isMyReview 데이터 : ", isMyReview);
  console.log("editDisabled 값 확인 ~~ ", editDisabled);

  return (
    <>
      {/* {true ? ( */}
      {/* {myReviewContent ? ( */}
      {isMyReview ? (
        editDisabled ? (
          <form onSubmit={handleSubmit(editReview)}>
            <div className="ReviewForm">
              <ReviewTextarea autoFocus={autoFocus} content={myReviewContent.content} isDisabled={true} />
              <ButtonArea>
                <ClickButton onClick={handleEdit}>수정하기</ClickButton>
              </ButtonArea>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(editReview)}>
            <div className="ReviewForm">
              <ReviewTextarea
                autoFocus={autoFocus}
                content={myContent}
                onChange={onChangeReviewContent}
                isDisabled={editDisabled}
              />
              <ButtonArea>
                <CancelButton onClick={handleEdit}>취소하기</CancelButton>
                <SubmitButton isDisabled={reviewContent.length < 10} isFetching={false}>
                  수정완료
                </SubmitButton>
              </ButtonArea>
            </div>
          </form>
        )
      ) : (
        <form onSubmit={handleSubmit(addReview)}>
          <div className="ReviewForm">
            <ReviewTextarea
              autoFocus={autoFocus}
              content={reviewContent}
              // onClick={this.checkAuth}
              onChange={onChangeReviewContent}
              isDisabled={isDisabled}
            />
            <ButtonArea>
              <SubmitButton
                isDisabled={reviewContent.length < 10}
                // onClick={() => ())}
                onClick={handleEdit}
                isFetching={false}
              >
                리뷰 등록
              </SubmitButton>
            </ButtonArea>
          </div>
        </form>
      )}
    </>
  );
};
