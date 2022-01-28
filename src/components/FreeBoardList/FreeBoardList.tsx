import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { freeBoardSelector, setPage, listAsync, listByTitleAsync } from "src/modules/Slices/freeBoard/freeBoardSlice";
import { useTypedSelector } from "src/modules/store";
import Pagination from "@mui/material/Pagination";
import { Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { dateFormat2 } from "src/utils/formatUtil";
import Loading from "src/elements/Loading";
import { getFreeBoardPage, setFreeBoardPage } from "src/utils/localStorageUtil";
import { signInSelector } from "src/modules/Slices/signIn/signInSlice";
import { Link } from "react-router-dom";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { makeOption } from "src/utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import useDebounce from "src/hooks/useDebounce";
import * as Styled from "./style";
import * as Types from "./types";

const init: Types.SearchForm = {
  title: "",
};

const FreeBoardList = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Types.SearchForm>({
    defaultValues: init,
  });
  const debounce = useDebounce();
  const { user } = useTypedSelector(signInSelector);
  const { list, status, keyWord } = useTypedSelector(freeBoardSelector);
  const dispatch = useDispatch();
  const isLoading = status === "loading";
  const min900 = useMediaQuery("(min-width:900px)");

  const titleOptions: RegisterOptions = {
    maxLength: makeOption<number>(50, "최대 50자 입니다."),
  };

  const onSubmit = (data: Types.SearchForm) => {
    if (debounce.current) clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      const { title } = data;
      if (title !== "") {
        dispatch(
          listByTitleAsync({
            keyWord: data.title,
            page: 0,
          }),
        );
        return;
      }

      dispatch(listAsync(0));
    }, 1000);
  };

  const handlePaginationOnChange = useCallback(
    (_, value: number) => {
      if (list === null) return;

      const { contents } = list;
      const page = value - 1;
      const content = contents[page];

      dispatch(setPage(page));

      if (keyWord) {
        dispatch(listByTitleAsync({ keyWord, page }));
      } else if (!content) {
        dispatch(listAsync(page));
      }
    },
    [dispatch, keyWord, list],
  );

  useEffect(() => {
    if (!list) {
      dispatch(listAsync(getFreeBoardPage()));
    }
  }, [dispatch, list]);

  useEffect(() => {
    if (list) setFreeBoardPage(list.page);
  }, [list]);
  if (list) {
    const { contents, totalPages, page, empty } = list;
    const content = contents[page] ?? [];

    return (
      <>
        {status === "loading" && <Loading isLoading={isLoading} />}
        <Styled.FreeBoardListWrapper>
          <Styled.FreeBoardListTitle>자유게시판</Styled.FreeBoardListTitle>
          {user && (
            <Stack mt={2} mb={2} direction="row" justifyContent="flex-end">
              <Link to="freeboard/insert">
                <Button variant="contained" size={min900 ? "large" : "small"}>
                  게시글 등록
                </Button>
              </Link>
            </Stack>
          )}
          <Styled.FreeBoardListRow>
            <div className="header">
              <div>번호</div>
              <div>제목</div>
              <div>작성자</div>
              <div>조회수</div>
              <div>등록일</div>
            </div>
            {empty ? (
              <Styled.Empty>
                <p>결과가 없습니다.</p>
              </Styled.Empty>
            ) : (
              content.map(value => {
                const { boardDate, nickName, boardId, view, title } = value;
                return (
                  <div key={boardId}>
                    <div>
                      <span>{boardId}</span>
                    </div>
                    <div>
                      <Link
                        to={{
                          pathname: `freeboard/${boardId}`,
                          state: {
                            paginatoionPage: page,
                          },
                        }}
                      >
                        {title}
                      </Link>
                    </div>
                    <div>
                      <span>{nickName}</span>
                    </div>
                    <div>
                      <span>{view}</span>
                    </div>
                    <div>
                      <span>{dateFormat2(boardDate)[0]}</span>
                      <span>{dateFormat2(boardDate)[1]}</span>
                    </div>
                  </div>
                );
              })
            )}
          </Styled.FreeBoardListRow>
          {totalPages !== 0 && (
            <div>
              <Stack mt={2} justifyContent="center" direction="row">
                <Pagination
                  siblingCount={0}
                  count={totalPages}
                  page={page + 1}
                  onChange={handlePaginationOnChange}
                  variant="outlined"
                  shape="rounded"
                  size={min900 ? "large" : "small"}
                  sx={{
                    ".Mui-selected": {
                      background: theme => theme.colors.mainDarkBrown,
                      color: theme => theme.colors.white,
                    },
                  }}
                />
              </Stack>
            </div>
          )}
          <Styled.FreeBoardListSearch onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="title"
                control={control}
                rules={titleOptions}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    size={min900 ? "medium" : "small"}
                    color="mainDarkBrown"
                    placeholder="자유게시판 제목을 입력해주세요."
                  />
                )}
              />
              <Button variant="contained" size={min900 ? "large" : "small"} color="mainDarkBrown" type="submit">
                검색
              </Button>
            </div>
            <ErrorMessage message={errors.title?.message} />
          </Styled.FreeBoardListSearch>
        </Styled.FreeBoardListWrapper>
      </>
    );
  }

  return null;
};

export default FreeBoardList;
