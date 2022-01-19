import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "src/elements/ErrorMessage";
import Loading from "src/elements/Loading";
import Popup from "src/elements/Popup";
import useSignIn from "src/hooks/useSignIn";
import { freeBoardSelector, insertAsync } from "src/modules/Slices/freeBoardSlice/freeBoardSlice";
import { useTypedSelector } from "src/modules/store";
import { FormErrorMessages, makeOption } from "src/utils/hookFormUtil";
import Editor from "../Editor/Editor";
import { Buttons, EditorWrapper, Title } from "./style";
import { IFreeBoardInsertForm } from "./type";

const FreeBoardInsert = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFreeBoardInsertForm>({
    defaultValues: {
      title: "",
    },
  });
  const { status } = useTypedSelector(freeBoardSelector);
  const [editorValue, setEditorValue] = useState("");
  const isLoading = status === "loading";
  const { dispatch, signIn } = useSignIn();
  const { token, user } = signIn;
  const [isOpen, setIsOpen] = useState(false);
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });

  const handlePopUp = (isSuccess: boolean, message: string) => {
    setIsOpen(true);
    setPopUpState({
      isSuccess,
      message,
    });
  };

  const titleOptions: RegisterOptions = {
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    maxLength: makeOption<number>(50, "최대 50자 입니다."),
    minLength: makeOption<number>(1, "최소 1자 입니다."),
  };

  const onSumit = (formData: IFreeBoardInsertForm) => {
    if (token && user) {
      const { title } = formData;
      if (editorValue === "") {
        handlePopUp(false, "게시글은 필수 입니다.");
        return;
      }
      const content = editorValue.replaceAll("<", "&lt;");
      dispatch(
        insertAsync({
          title,
          content,
          boardType: "FREE",
          userId: user.id,
        }),
      )
        .unwrap()
        .catch((message: string) => handlePopUp(false, message));
    }
  };

  return (
    <div>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose className="red">
          {popUpState.message}
        </Popup>
      )}
      <Loading isLoading={isLoading} />
      <div>
        <Title>
          <span>커뮤니티</span>
          <span>자유게시판</span>
        </Title>

        <form onSubmit={handleSubmit(onSumit)}>
          <EditorWrapper>
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
              />
            </div>
          </EditorWrapper>
          <Buttons>
            <Button color="mainDarkBrown" type="submit" variant="contained">
              등록
            </Button>
            <Link to="/community/freeboard">
              <Button color="mainDarkBrown" type="submit" variant="contained">
                목록으로
              </Button>
            </Link>
          </Buttons>
        </form>
      </div>
    </div>
  );
};

export default FreeBoardInsert;
