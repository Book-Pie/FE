import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addComment, editComment } from "src/modules/Slices/comment/commentSlice";
import { dateFormat } from "src/utils/formatUtil";
import { HoverRating } from "src/components/Rating/Rating";
import Editor from "src/components/Editor/Editor";
import { CancelButton, ClickButton, SubmitButton } from "./SubmitButton";
import { ButtonArea } from "./style";
import { ReviewFormProps } from "./types";

export const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, isMyReview, myReviewContent }) => {
  const { handleSubmit } = useForm({ defaultValues: { something: "anything" } });

  // 임시 유저 데이터
  const userId = 5;
  const reviewId = 6;
  const nickname = "테스트 닉네임";
  const reviewLikeCount = 0;
  const likeCheck = false;

  let editStatus = true;
  if (myReviewContent.content === undefined) {
    editStatus = false;
  } else {
    editStatus = true;
  }

  const dispatch = useDispatch();
  const [reviewContent, setContent] = useState(""); // 리뷰 등록
  const [myContent, setMyContent] = useState(myReviewContent.content); // 리뷰 수정
  const [ratingValue, setValue] = useState<number>(2); // 별점 추가
  const [editDisabled, editEnabled] = useState(editStatus);

  useEffect(() => {
    setMyContent(myReviewContent.content);
  }, [myReviewContent.content]);

  const handleRatingChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  const addReview = () => {
    // 로그인 시 리뷰 입력 기능 추가 필요
    dispatch(
      addComment({
        userId,
        reviewId,
        nickname,
        rating: ratingValue,
        content: reviewContent,
        reviewDate: dateFormat(new Date()),
        reviewLikeCount,
        likeCheck,
      }),
    );
    setContent("");
  };

  const editReview = () => {
    dispatch(
      editComment({
        userId,
        reviewId,
        nickname,
        rating,
        content: reviewContent,
        reviewDate: dateFormat(new Date()),
        reviewLikeCount,
        likeCheck,
      }),
    );
    editEnabled(prev => !prev);
  };

  const handleEdit = () => {
    editEnabled(prev => !prev);
  };

  return isMyReview ? (
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
            isDisabled
          />
          <ButtonArea>
            <ClickButton onClick={handleEdit} isDisabled={false}>
              수정하기
            </ClickButton>
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
            <SubmitButton isDisabled={reviewContent.length < 10}>수정완료</SubmitButton>
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
          <SubmitButton isDisabled={reviewContent.length < 10} onClick={handleEdit}>
            리뷰 등록
          </SubmitButton>
        </ButtonArea>
      </div>
    </form>
  );
};
