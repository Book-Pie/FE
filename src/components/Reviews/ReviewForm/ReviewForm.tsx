import React, { useEffect } from "react";
import { useState } from "react";
import { ButtonArea } from "./style";
import { CancelButton, ClickButton, SubmitButton } from "./SubmitButton";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addComment, editComment } from "modules/Slices/commentSlice";
import { dateFormat } from "src/utils/formatDate";
import { ReviewFormProps } from "./types";
import { HoverRating } from "src/components/Rating/Rating";
import Editor from "src/components/Editor/Editor";

export const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, isMyReview, isDisabled, myReviewContent }) => {
  const { handleSubmit, register, reset } = useForm({ defaultValues: { something: "anything" } });

  // 임시 유저 데이터
  const user_id: number = 5;
  const review_id: number = 6;
  const nickname: string = "테스트 닉네임";
  const reviewLikeCount: number = 0;
  const likeCheck: boolean = false;

  let editStatus = true;
  if (myReviewContent.content === undefined) {
    editStatus = false;
  } else {
    editStatus = true;
  }

  const dispatch = useDispatch();
  const [reviewContent, setContent] = useState(""); // 리뷰 등록
  const [myContent, setMyContent] = useState(myReviewContent.content); // 리뷰 수정
  const [ratingValue, setValue] = useState<number | null>(2); // 별점 추가
  const [editDisabled, editEnabled] = useState(editStatus);

  useEffect(() => {
    setMyContent(myReviewContent.content);
  }, []);

  const handleRatingChange = (event: any, newValue: React.SetStateAction<number | null>) => {
    setValue(newValue);
  };

  const addReview = (e: React.ChangeEvent<any>) => {
    // 로그인 시 리뷰 입력 기능 추가 필요
    dispatch(
      addComment({
        user_id: user_id,
        review_id: review_id,
        nickname: nickname,
        rating: ratingValue,
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

  return (
    <>
      {isMyReview ? (
        editDisabled ? (
          <form onSubmit={handleSubmit(editReview)}>
            <div className="ReviewForm">
              <HoverRating isMyReview={isMyReview} rating={ratingValue} />
              <Editor
                setEditorValue={setContent}
                value={myReviewContent.content}
                limit={100}
                height={100}
                placeholder="리뷰 작성 시 10자 이상 작성해주세요."
                isDisabled={true}
              />
              <ButtonArea>
                <ClickButton onClick={handleEdit}>수정하기</ClickButton>
              </ButtonArea>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(editReview)}>
            <div className="ReviewForm">
              <HoverRating isMyReview={isMyReview} rating={ratingValue} handleChange={handleRatingChange} />
              <Editor
                setEditorValue={setContent}
                value={myContent}
                limit={100}
                height={100}
                placeholder="리뷰 작성 시 10자 이상 작성해주세요."
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
            <HoverRating isMyReview={isMyReview} rating={ratingValue} handleChange={handleRatingChange} />
            <Editor
              setEditorValue={setContent}
              value={reviewContent}
              limit={100}
              height={100}
              placeholder="리뷰 작성 시 10자 이상 작성해주세요."
            />
            <ButtonArea>
              <SubmitButton isDisabled={reviewContent.length < 10} onClick={handleEdit} isFetching={false}>
                리뷰 등록
              </SubmitButton>
            </ButtonArea>
          </div>
        </form>
      )}
    </>
  );
};
