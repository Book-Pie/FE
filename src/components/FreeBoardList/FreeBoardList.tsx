import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { freeBoardSelector, setPage, listAsync, listByTitleAsync } from "src/modules/Slices/freeBoard/freeBoardSlice";
import range from "lodash/range";
import { useTypedSelector } from "src/modules/store";
import Pagination from "@mui/material/Pagination";
import { Button, Skeleton, Stack, TextField } from "@mui/material";
import { dateFormat2 } from "src/utils/formatUtil";
import Loading from "src/elements/Loading";
import { getFreeBoardPage, setFreeBoardPage } from "src/utils/localStorageUtil";
import { signInSelector } from "src/modules/Slices/signIn/signInSlice";
import { Link } from "react-router-dom";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { makeOption } from "src/utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import useDebounce from "src/hooks/useDebounce";
import { Row, Title, Empty, Wrapper, Search } from "./style";
import { ISearchForm } from "./types";

const init: ISearchForm = {
  title: "",
};

const FreeBoardList = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchForm>({
    defaultValues: init,
  });
  const debounce = useDebounce();
  const { user } = useTypedSelector(signInSelector);
  const { list, status, keyWord } = useTypedSelector(freeBoardSelector);
  const dispatch = useDispatch();
  const isLoading = status === "loading";

  const titleOptions: RegisterOptions = {
    maxLength: makeOption<number>(50, "최대 50자 입니다."),
  };

  const onSubmit = (data: ISearchForm) => {
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
        <Wrapper>
          <Title>자유게시판</Title>
          {user && (
            <Stack mt={2} mb={2} direction="row" justifyContent="flex-end">
              <Link to="freeboard/insert">
                <Button variant="contained">게시글 등록</Button>
              </Link>
            </Stack>
          )}
          <Row>
            <div className="header">
              <span>번호</span>
              <span>제목</span>
              <span>작성자</span>
              <span>조회수</span>
              <span>등록일</span>
            </div>
            {status === "loading" ? (
              range(0, 5).map(v => {
                return (
                  <div key={v}>
                    <Skeleton variant="rectangular" height={20} animation="wave" sx={{ borderRadius: "5px" }} />
                    <Skeleton variant="rectangular" height={20} animation="wave" sx={{ borderRadius: "5px" }} />
                    <Skeleton variant="rectangular" height={20} animation="wave" sx={{ borderRadius: "5px" }} />
                    <Skeleton variant="rectangular" height={20} animation="wave" sx={{ borderRadius: "5px" }} />
                    <Skeleton variant="rectangular" height={20} animation="wave" sx={{ borderRadius: "5px" }} />
                  </div>
                );
              })
            ) : empty ? (
              <Empty>
                <p>결과가 없습니다.</p>
              </Empty>
            ) : (
              content.map(value => {
                const { boardDate, nickName, boardId, view, title } = value;
                return (
                  <div key={boardId}>
                    <span>{boardId}</span>
                    <span>
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
                    </span>
                    <span>{nickName}</span>
                    <span>{view}</span>
                    <span>{dateFormat2(boardDate)[0]}</span>
                  </div>
                );
              })
            )}
          </Row>
          <div>
            <Stack mt={5} justifyContent="center" direction="row">
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePaginationOnChange}
                variant="outlined"
                shape="rounded"
                size="large"
                sx={{
                  ".Mui-selected": {
                    background: theme => theme.colors.mainDarkBrown,
                    color: theme => theme.colors.white,
                  },
                }}
              />
            </Stack>
          </div>
          <Search onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="title"
                control={control}
                rules={titleOptions}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    color="mainDarkBrown"
                    placeholder="자유게시판 제목을 입력해주세요."
                  />
                )}
              />
              <Button variant="contained" color="mainDarkBrown" type="submit">
                검색
              </Button>
            </div>
            <div>
              <ErrorMessage message={errors.title?.message} />
            </div>
          </Search>
        </Wrapper>
      </>
    );
  }

  return null;
};

export default FreeBoardList;
