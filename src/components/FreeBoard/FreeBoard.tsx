import { Button, TextField } from "@mui/material";
import { isNaN } from "lodash";
import { useEffect, useState } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import ErrorMessage from "src/elements/ErrorMessage";
import Loading from "src/elements/Loading";
import Popup from "src/elements/Popup";
import {
  deleteAsync,
  freeBoardContentSelector,
  freeBoardInfoSelector,
  infoAsync,
} from "src/modules/Slices/freeBoardSlice/freeBoardSlice";
import { signInSelector } from "src/modules/Slices/signIn/signInSlice";
import { useAppDispatch, useTypedSelector } from "src/modules/store";
import { dateFormat2 } from "src/utils/formatUtil";
import { FormErrorMessages, makeOption } from "src/utils/hookFormUtil";
import Editor from "../Editor/Editor";
import { Buttons, EditorWrapper } from "../FreeBoardInsert/style";
import { IFreeBoardInsertForm } from "../FreeBoardInsert/type";
import { Empty, Main, Title, Top } from "./style";
import { IParam, LocationState } from "./type";

const FreeBoard = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFreeBoardInsertForm>({
    defaultValues: {
      title: "",
    },
  });
  let { boardId } = useParams<IParam>();
  const [isUpdate, setIsUpdate] = useState(false);
  const { state } = useLocation<LocationState>();
  // param으로 쓰레기값(string)이 넘어왔을때 서버로 요청보내는걸 방지
  if (isNaN(Number(boardId))) boardId = "0";
  const paginatoionPage = state?.paginatoionPage ?? 0;
  const freeBoard = useTypedSelector(freeBoardContentSelector(paginatoionPage, Number(boardId)));
  const { user, token, status } = useTypedSelector(signInSelector);
  let info = useTypedSelector(freeBoardInfoSelector);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [editorValue, setEditorValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });
  const isLoading = status === "loading";

  const titleOptions: RegisterOptions = {
    required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
    maxLength: makeOption<number>(50, "최대 50자 입니다."),
    minLength: makeOption<number>(1, "최소 1자 입니다."),
  };

  const handlePopUp = (isSuccess: boolean, message: string) => {
    setIsOpen(true);
    setPopUpState({
      isSuccess,
      message,
    });
  };

  const onSumit = (formData: IFreeBoardInsertForm) => {
    if (token && user) {
      const { title } = formData;
      if (editorValue === "") {
        handlePopUp(false, "게시글은 필수 입니다.");
        return;
      }
      const content = editorValue.replaceAll("<", "&lt;");
    }
  };

  const handleUpdateOpne = (title: string) => () => {
    setIsUpdate(true);
    setValue("title", title);
  };
  const handleUpdateClose = () => {
    setIsUpdate(false);
  };

  const handleDeleteOnClick = () => {
    dispatch(deleteAsync(boardId));
  };

  useEffect(() => {
    if (!freeBoard) {
      dispatch(infoAsync(boardId))
        .unwrap()
        .catch(error => {
          alert(error);
          history.goBack();
        });
    }
  }, [dispatch, boardId, freeBoard, history]);

  info = freeBoard || info;

  if (info) {
    const { boardDate, content, nickName, title, view, userId } = info;

    return (
      <div>
        {isOpen && (
          <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose className="red">
            {popUpState.message}
          </Popup>
        )}
        <Loading isLoading={isLoading} />
        <Title>자유게시판</Title>
        {isUpdate === false ? (
          <>
            <Top>
              <div>
                <div>{title}</div>
                <div>
                  <span>{nickName}</span>
                  <span>{dateFormat2(boardDate)}</span>
                  <span>조회수 {view}</span>
                </div>
              </div>
              <div>
                <Button variant="contained" color="mainDarkBrown">
                  <Link to="/community/freeboard">목록보기</Link>
                </Button>
                {user && (
                  <Button variant="contained" color="info">
                    <Link to="insert">게시글 등록</Link>
                  </Button>
                )}
                {user?.id === userId && (
                  <Button variant="contained" color="success" onClick={handleUpdateOpne(title)}>
                    수정하기
                  </Button>
                )}
                {user?.id === userId && (
                  <Button variant="contained" color="error" onClick={handleDeleteOnClick}>
                    삭제
                  </Button>
                )}
              </div>
            </Top>
            <Main>
              <div
                className="view ql-editor"
                dangerouslySetInnerHTML={{
                  __html: content.replaceAll("&lt;", "<"),
                }}
              />
            </Main>
          </>
        ) : (
          <div>
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
                    value={content.replaceAll("&lt;", "<")}
                    toolbar="no-upload-toolbar"
                    placeholder="자유게시판 내용을 입력해주세요."
                    limit={2000}
                    height={500}
                    setEditorValue={setEditorValue}
                  />
                </div>
              </EditorWrapper>
              <Buttons>
                <Button color="info" type="submit" variant="contained">
                  수정하기
                </Button>
                <Button color="error" type="submit" variant="contained" onClick={handleUpdateClose}>
                  수정취소
                </Button>
              </Buttons>
            </form>
          </div>
        )}
      </div>
    );
  }

  return <Empty />;
};

export default FreeBoard;
