import React from "react";
import { useState } from "react";
import { ButtonArea, MyReviewTextarea } from "./style";
import { SubmitButton } from "./SubmitButton";
import { ReviewTextarea } from "./ReviewTextarea";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addComment } from "../../../modules/Slices/commentSlice";
import { dateFormat } from "src/utils/formatDate";
import { ReviewFormProps } from "./types";

export const ReviewForm: React.FC<ReviewFormProps> = props => {
  const { handleSubmit, register, reset } = useForm({ defaultValues: { something: "anything" } });

  // 임시 유저 데이터
  const id: number = 6;
  const review_id: number = 6;
  const user_id: number = 5;
  const nickname: string = "테스트 닉네임";
  const rating: number = 3;
  const reviewLikeCount: number = 0;
  const likeCheck: boolean = false;

  const dispatch = useDispatch();
  const [reviewContent, setComments] = useState("");

  const onChangeReviewContent = (e: React.ChangeEvent<any>) => {
    setComments(e.target.value);
  };

  const addReview = (e: React.ChangeEvent<any>) => {
    dispatch(
      addComment({
        id: id,
        review_id: review_id,
        user_id: user_id,
        nickname: nickname,
        rating: rating,
        content: reviewContent,
        reviewDate: dateFormat(new Date()),
        reviewLikeCount: reviewLikeCount,
        likeCheck: likeCheck,
      }),
    );
    setComments("");
  };

  // const deleteReview = e => {
  //   dispatch(
  //     deleteComment({
  //       id: id,
  //     }),
  //   );
  // };

  const { autoFocus, isDisabled } = props;

  const isMyReview = false;
  return (
    <>
      <form onSubmit={handleSubmit(addReview)}>
        {isMyReview ? (
          <div className="ReviewForm">
            <MyReviewTextarea>{reviewContent}</MyReviewTextarea>
            <ButtonArea>
              <SubmitButton
                isDisabled={reviewContent.length < 10}
                // onClick={() => ()}
                isFetching={false}
              >
                수정 완료
              </SubmitButton>
            </ButtonArea>
          </div>
        ) : (
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
                isFetching={false}
              >
                리뷰 등록
              </SubmitButton>
            </ButtonArea>
          </div>
        )}
      </form>
    </>
  );
};
