import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { Link } from "react-router-dom";
import { errorHandler } from "api/client";
import ErrorMessage from "elements/ErrorMessage";
import Loading from "elements/Loading";
import Popup from "elements/Popup";
import { freeBoardSelector, freeboardInsertAsync } from "modules/Slices/freeBoard/freeBoardSlice";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { FormErrorMessages, makeOption } from "utils/hookFormUtil";
import { userSelector } from "modules/Slices/user/userSlice";
import usePopup from "hooks/usePopup";
import Editor from "../Editor/Editor";
import * as Styled from "./style";
import * as Types from "./types";

const FreeBoardInsert = () => {
  const { handleSubmit, control, formState } = useForm<Types.FreeBoardInsertForm>({
    defaultValues: {
      title: "",
    },
  });
  const { errors } = formState;
  const { status } = useTypedSelector(freeBoardSelector);
  const [editorValue, setEditorValue] = useState("");
  const [editorLength, setEditorLength] = useState(0);
  const isLoading = status === "loading";
  const dispatch = useAppDispatch();
  const user = useTypedSelector(userSelector);
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, message } = popupState;

  const titleOptions: RegisterOptions = {
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    maxLength: makeOption<number>(50, "최대 50자 입니다."),
    minLength: makeOption<number>(1, "최소 1자 입니다."),
  };

  const onSumit = async ({ title }: Types.FreeBoardInsertForm) => {
    try {
      if (!user) throw new Error("로그인이 필요합니다.");
      if (editorLength === 0) throw new Error("게시글은 필수 입니다.");
      const content = editorValue.replaceAll("<", "&lt;");
      await dispatch(
        freeboardInsertAsync({
          title,
          content,
          userId: user.id,
          boardType: "FREE",
        }),
      ).unwrap();
    } catch (error: any) {
      const message = errorHandler(error);
      handlePopupMessage(false, message);
    }
  };

  return (
    <div>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} autoClose className="red">
          {message}
        </Popup>
      )}
      <Loading isLoading={isLoading} />
      <div>
        <Styled.Title>
          <span>
            <Link to="/community">커뮤니티</Link>
          </span>
          <span>
            <Link to="/community/freeboard">자유게시판</Link>
          </span>
        </Styled.Title>

        <form onSubmit={handleSubmit(onSumit)}>
          <Styled.EditorWrapper>
            <div>
              <span>
                제목 <strong>*</strong>
              </span>
              <div>
                <Controller
                  name="title"
                  control={control}
                  rules={titleOptions}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      type="text"
                      color="mainDarkBrown"
                      placeholder="자유게시판 제목을 입력해주세요."
                    />
                  )}
                />
                <ErrorMessage message={errors.title?.message} />
              </div>
            </div>
            <div>
              <span>
                내용 <strong>*</strong>
              </span>
              <Editor
                toolbar="no-upload-toolbar"
                placeholder="자유게시판 내용을 입력해주세요."
                limit={2000}
                height={500}
                setEditorValue={setEditorValue}
                getEdiotrLength={setEditorLength}
              />
            </div>
          </Styled.EditorWrapper>
          <Styled.Buttons>
            <Button color="info" type="submit" variant="contained">
              등록
            </Button>
            <Link to="/community/freeboard">
              <Button color="mainDarkBrown" type="submit" variant="contained">
                목록으로
              </Button>
            </Link>
          </Styled.Buttons>
        </form>
      </div>
    </div>
  );
};

export default FreeBoardInsert;
