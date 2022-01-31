import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addComment, editComment } from "modules/Slices/comment/commentSlice";
import { HoverRating } from "components/Rating/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTypedSelector } from "modules/store";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import { getMyRating, getMyReview, removeMyReview, setMyRating, setMyReview } from "utils/localStorageUtil";
import { reviewDateFormat } from "utils/formatUtil";
import Textarea from "components/TextArea/Textarea";
import { ButtonArea, TextareaAutosize, TextWrapper, MyReviwContent } from "./style";
import { ReviewFormProps } from "./types";

export const ReviewForm: React.FC<ReviewFormProps> = ({ isbn, isMyReview, myComment, userId, checkAuth }) => {
  const { handleSubmit } = useForm({ defaultValues: { something: "anything" } });
  const { reviewDate } = myComment ?? "";
  const commentDate = reviewDateFormat(reviewDate);
  const myUserStatus = useTypedSelector(userReduceSelector);
  const { isLoggedIn } = myUserStatus ?? false;

  let editStatus = false;
  let myRatingDefault = 3;

  if (myComment === null) {
    editStatus = false;
  } else {
    editStatus = true;
    myRatingDefault = myComment.rating;
  }

  const dispatch = useDispatch();
  const [reviewContent, setContent] = useState(""); // 리뷰 등록
  const [ratingValue, setValue] = useState(myRatingDefault); // 별점 추가
  const [editDisabled, editEnabled] = useState(editStatus);

  const handleRatingChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleReviewChange = (event: any) => {
    setContent(event.target.value);
  };

  const addReview = () => {
    dispatch(
      addComment({
        isbn,
        userId,
        content: reviewContent,
        rating: ratingValue,
      }),
    );
    editEnabled(true);
  };

  const editReview = () => {
    dispatch(
      editComment({
        userId,
        reviewId: myComment.reviewId,
        content: reviewContent,
        rating: ratingValue,
      }),
    );
    editEnabled(true);
  };

  const handleEdit = () => {
    editEnabled(prev => !prev);
    if (editDisabled === false && getMyReview() !== null) {
      const savedReview = getMyReview();
      const savedRating = getMyRating();
      if (savedReview !== "" && savedReview !== null) {
        setContent(savedReview);
        setValue(Number(savedRating));
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn === true && myComment !== null) {
      setMyReview(myComment.content);
      setMyRating(String(myComment.rating));
      const savedReview = getMyReview();
      const savedRating = getMyRating();
      if (savedReview !== "" && savedReview !== null) {
        setContent(savedReview);
        setValue(Number(savedRating));
      }
      editEnabled(true);
    }
    if (myComment === null) {
      editEnabled(false);
      setContent("");
      removeMyReview();
    }
  }, [isLoggedIn, myComment, editEnabled]);

  useEffect(() => {
    if (!isMyReview) {
      editEnabled(false);
      setContent("");
      setValue(3);
    }
  }, [isMyReview, isbn]);

  return isMyReview ? (
    <form onSubmit={handleSubmit(editReview)}>
      <HoverRating isDisabled={editDisabled} rating={ratingValue} handleChange={handleRatingChange} />
      {editDisabled && (
        <>
          <TextWrapper>
            <MyReviwContent>{commentDate}</MyReviwContent>
            <MyReviwContent margin dangerouslySetInnerHTML={{ __html: reviewContent }} />
          </TextWrapper>
          <ButtonArea>
            <Button variant="outlined" onClick={handleEdit}>
              수정하기
            </Button>
          </ButtonArea>
        </>
      )}
      {!editDisabled && (
        <>
          <TextareaAutosize
            onChange={handleReviewChange}
            value={reviewContent}
            limit={100}
            height={100}
            placeholder="리뷰 작성 시 10자 이상 작성해주세요."
            isDisabled={editDisabled}
          />
          <ButtonArea>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button variant="outlined" onClick={handleEdit}>
                취소하기
              </Button>
              <Button variant="contained" type="submit" disabled={reviewContent.length < 10}>
                수정완료
              </Button>
            </Stack>
          </ButtonArea>
        </>
      )}
    </form>
  ) : (
    <form onSubmit={handleSubmit(addReview)}>
      <div className="ReviewForm">
        <HoverRating isDisabled={editDisabled} rating={ratingValue} handleChange={handleRatingChange} />
        <Textarea
          isLoggedIn={isLoggedIn}
          onChange={handleReviewChange}
          checkAuth={checkAuth}
          value={reviewContent}
          limit={100}
          height={100}
          placeholder="리뷰 작성 시 10자 이상 작성해주세요."
        />
        <ButtonArea>
          <Button variant="outlined" type="submit" disabled={reviewContent.length < 10} onClick={handleEdit}>
            리뷰등록
          </Button>
        </ButtonArea>
      </div>
    </form>
  );
};
