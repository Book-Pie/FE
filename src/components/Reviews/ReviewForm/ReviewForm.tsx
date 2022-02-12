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

export const ReviewForm = ({ isbn, isMyReview, myComment, categoryName, checkAuth }: ReviewFormProps) => {
  const { handleSubmit } = useForm({ defaultValues: { something: "anything" } });
  const myUserStatus = useTypedSelector(userReduceSelector);
  const { isLoggedIn, token } = myUserStatus ?? false;
  const category = categoryName.split(">", 2)[1];
  let editStatus = false;
  let myRatingDefault = 3;
  let myContent = "";

  if (myComment === null) {
    editStatus = false;
  } else {
    editStatus = true;
    myRatingDefault = myComment.rating;
    myContent = myComment.content;
  }

  const dispatch = useDispatch();
  const [reviewContent, setContent] = useState(myContent); // 리뷰 등록
  const [ratingValue, setValue] = useState(myRatingDefault); // 별점 추가
  const [editDisabled, editEnabled] = useState(editStatus);
  const [myReview, setIsMyReview] = useState(isMyReview);

  const handleRatingChange = (event: React.SyntheticEvent<Element, Event>, value: number | null) => {
    if (value !== null) {
      setValue(value);
    }
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const addReview = () => {
    if (token) {
      dispatch(
        addComment({
          data: {
            isbn,
            content: reviewContent,
            rating: ratingValue,
            category,
          },
          token,
        }),
      );
      editEnabled(true);
    }
  };

  const editReview = () => {
    if (token && myComment) {
      dispatch(
        editComment({
          data: {
            reviewId: myComment.reviewId,
            content: reviewContent,
            rating: ratingValue,
            category,
          },
          token,
        }),
      );
      editEnabled(true);
    }
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
    if (isLoggedIn === true && myComment) {
      setMyReview(myComment.content);
      setMyRating(String(myComment.rating));
      const savedReview = getMyReview();
      const savedRating = getMyRating();

      if (savedReview !== "" && savedReview !== null) {
        setContent(savedReview);
        setValue(Number(savedRating));
        setIsMyReview(true);
      }
      editEnabled(true);
    }
    if (isLoggedIn === true && myComment === null) {
      const savedReview = getMyReview();
      const savedRating = getMyRating();
      if (savedReview !== "" && savedReview !== null) {
        setContent(savedReview);
        setValue(Number(savedRating));
        setIsMyReview(true);
        editEnabled(true);
      } else {
        editEnabled(false);
        setContent("");
        removeMyReview();
      }
    }
  }, [isLoggedIn, myComment, editEnabled]);

  useEffect(() => {
    if (!isMyReview || isMyReview === undefined) {
      editEnabled(false);
      setContent("");
      setIsMyReview(false);
      setValue(3);
      removeMyReview();
    }
  }, [isMyReview, isbn]);

  return myReview ? (
    <form onSubmit={handleSubmit(editReview)}>
      <HoverRating isDisabled={editDisabled} rating={ratingValue} handleChange={handleRatingChange} />
      {editDisabled && (
        <>
          <TextWrapper>
            {myComment && <MyReviwContent>{reviewDateFormat(myComment.reviewDate)}</MyReviwContent>}
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
