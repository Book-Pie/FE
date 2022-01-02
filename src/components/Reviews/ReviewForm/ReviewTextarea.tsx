import React from "react";
import { TextareaAutosize } from "./style";
import { ReviewTextareaProps } from "./types";
// import TextareaAutosize from "react-textarea-autosize";

export const ReviewTextarea: React.FC<ReviewTextareaProps> = props => {
  const { content, onChange, autoFocus, onClick, isDisabled } = props;

  return (
    <TextareaAutosize
      className="ReviewTextarea"
      name="reviewContent"
      title="리뷰 입력"
      placeholder="리뷰 작성 시 10자 이상 작성해주세요."
      autoFocus={autoFocus}
      onChange={onChange}
      onClick={onClick}
      value={content}
      readOnly={isDisabled}
    />
  );
};
