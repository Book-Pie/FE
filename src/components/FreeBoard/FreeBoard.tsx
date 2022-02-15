import { Button, TextField } from "@mui/material";
import { isNaN } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { errorHandler } from "api/client";
import ErrorMessage from "elements/ErrorMessage";
import Loading from "elements/Loading";
import Popup from "elements/Popup";
import {
  freeboardDeleteAsync,
  contentSelector,
  contentInfoSelector,
  freeboardInfoAsync,
  freeboardUpdateAsync,
} from "modules/Slices/freeBoard/freeBoardSlice";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { dateArrayFormat } from "utils/formatUtil";
import { FormErrorMessages, makeOption } from "utils/hookFormUtil";
import usePopup from "hooks/usePopup";
import Editor from "components/Editor/Editor";
import { Buttons, EditorWrapper } from "../FreeBoardInsert/style";
import { FreeBoardInsertForm } from "../FreeBoardInsert/types";
import Comments from "./Comments";
import * as Styled from "./style";
import * as Types from "./types";

const FreeBoard = () => {
  const { handleSubmit, control, setValue, clearErrors, formState } = useForm<FreeBoardInsertForm>({
    defaultValues: {
      title: "",
    },
  });
  const { errors } = formState;
  let { boardId } = useParams<Types.Param>();
  const [isUpdate, setIsUpdate] = useState(false);
  const { state } = useLocation<Types.LocationState>();
  // param으로 쓰레기값(string)이 넘어왔을때 서버로 요청보내는걸 방지
  if (isNaN(Number(boardId))) boardId = "0";
  const paginatoionPage = state?.paginatoionPage ?? 0;
  const freeBoard = useTypedSelector(contentSelector(paginatoionPage, Number(boardId)));
  let info = useTypedSelector(contentInfoSelector);
  const { user, status } = useTypedSelector(userReduceSelector);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [editorValue, setEditorValue] = useState("");
  const [editorLength, setEditorLength] = useState(0);
  const isLoading = status === "loading";
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, message } = popupState;

  const titleOptions: RegisterOptions = useMemo(
    () => ({
      required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
      maxLength: makeOption<number>(50, "최대 50자 입니다."),
      minLength: makeOption<number>(1, "최소 1자 입니다."),
    }),
    [],
  );

  const onSumit = async ({ title }: FreeBoardInsertForm) => {
    try {
      if (editorLength === 0) throw new Error("게시글은 필수 입니다.");
      if (!user) throw new Error("로그인이 필요합니다.");
      const content = editorValue.replaceAll("<", "&lt;");

      const message = await dispatch(
        freeboardUpdateAsync({
          boardType: "FREE",
          title,
          boardId,
          content,
        }),
      ).unwrap();
      handlePopupMessage(false, message);
    } catch (error: any) {
      const message = errorHandler(error);
      handlePopupMessage(false, message);
    }
  };

  const handleUpdateOpne = useCallback(
    (title: string) => () => {
      setIsUpdate(true);
      setValue("title", title);
      clearErrors("title");
    },
    [clearErrors, setValue],
  );
  const handleUpdateClose = useCallback(() => {
    setIsUpdate(false);
    clearErrors("title");
  }, [clearErrors]);

  const handleDeleteOnClick = () => {
    dispatch(freeboardDeleteAsync(boardId));
  };

  useEffect(() => {
    if (!freeBoard) {
      dispatch(freeboardInfoAsync(boardId))
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
    const innerHtmlContent = content.replaceAll("&lt;", "<");

    return (
      <Styled.FreeboardWrapper>
        {isOpen && (
          <Popup isOpen={isOpen} setIsOpen={handlePopupClose} autoClose className="red">
            {message}
          </Popup>
        )}
        <Loading isLoading={isLoading} />
        <Styled.FreeboardTitle>자유게시판</Styled.FreeboardTitle>
        {isUpdate ? (
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
                    value={innerHtmlContent}
                    toolbar="no-upload-toolbar"
                    placeholder="자유게시판 내용을 입력해주세요."
                    limit={2000}
                    height={500}
                    setEditorValue={setEditorValue}
                    getEdiotrLength={setEditorLength}
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
        ) : (
          <div>
            <Styled.FreeboardTop>
              <div>
                <div>{title}</div>
                <div>
                  <span>{nickName}</span>
                  <span>{dateArrayFormat(boardDate)}</span>
                  <span>조회수 {view}</span>
                </div>
              </div>
              <div>
                <Link to="/community/freeboard">
                  <Button variant="contained" color="mainDarkBrown">
                    목록보기
                  </Button>
                </Link>
                {user && (
                  <Link to="insert">
                    <Button variant="contained" color="info">
                      게시글 등록
                    </Button>
                  </Link>
                )}
                {user?.id === userId && (
                  <>
                    <Button variant="contained" color="success" onClick={handleUpdateOpne(title)}>
                      수정하기
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDeleteOnClick}>
                      삭제
                    </Button>
                  </>
                )}
              </div>
            </Styled.FreeboardTop>
            <Styled.Main>
              <div
                className="view ql-editor"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: innerHtmlContent }}
              />
            </Styled.Main>
          </div>
        )}
        <Comments boardId={boardId} userId={user?.id} />
      </Styled.FreeboardWrapper>
    );
  }

  return <Styled.Empty />;
};

export default FreeBoard;
