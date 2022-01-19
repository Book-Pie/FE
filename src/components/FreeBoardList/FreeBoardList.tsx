import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { freeBoardSelector, incresePage, listAsync } from "src/modules/Slices/freeBoardSlice/freeBoardSlice";
import { useTypedSelector } from "src/modules/store";
import Pagination from "@mui/material/Pagination";
import { Button, Stack } from "@mui/material";
import { dateFormat2 } from "src/utils/formatUtil";
import Loading from "src/elements/Loading";
import { getFreeBoardPage, setFreeBoardPage } from "src/utils/localStorageUtil";
import { signInSelector } from "src/modules/Slices/signIn/signInSlice";
import { Link } from "react-router-dom";
import { Row, Title, Empty, Wrapper } from "./style";

const FreeBoardList = () => {
  const [paginatoionPage, setPaginationPage] = useState(() => Number(getFreeBoardPage()));
  const { user } = useTypedSelector(signInSelector);
  const { list, status } = useTypedSelector(freeBoardSelector);
  const dispatch = useDispatch();
  const isLoading = status === "loading";

  const handlePaginationOnChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      if (list === null) return;

      const { contents } = list;
      const page = value - 1;
      const content = contents[page];

      dispatch(incresePage(page));
      setPaginationPage(page);
      if (!content) {
        dispatch(listAsync(String(page)));
      }
    },
    [dispatch, list],
  );

  useEffect(() => {
    if (!list) dispatch(listAsync(String(paginatoionPage)));
    setFreeBoardPage(String(paginatoionPage));
  }, [dispatch, list, paginatoionPage]);

  if (list) {
    const { contents, totalPages } = list;

    const content = contents[paginatoionPage] ?? [];

    if (status === "loading") {
      return (
        <Empty>
          <Loading isLoading={isLoading} />
        </Empty>
      );
    }

    return (
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
          {content.map(value => {
            const { boardDate, nickName, boardId, view, title } = value;
            return (
              <div key={boardId}>
                <span>{boardId}</span>
                <span>
                  <Link
                    to={{
                      pathname: `freeboard/${boardId}`,
                      state: {
                        paginatoionPage,
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
          })}
        </Row>

        <div>
          <Stack mt={5} justifyContent="center" direction="row">
            <Pagination
              count={totalPages}
              page={paginatoionPage + 1}
              onChange={handlePaginationOnChange}
              variant="outlined"
              shape="rounded"
              size="large"
              sx={{
                ".Mui-selected": {
                  background: theme => theme.colors.mainDarkBrown,
                  color: theme => theme.colors.white,
                },
                ".Mui-selected:hover": {
                  background: theme => theme.colors.mainDarkBrown,
                  color: theme => theme.colors.white,
                },
                ".MuiButtonBase-root:hover": {
                  background: theme => theme.colors.mainDarkBrown,
                  color: theme => theme.colors.white,
                },
              }}
            />
          </Stack>
        </div>
      </Wrapper>
    );
  }

  return (
    <Empty>
      <Loading isLoading={isLoading} />
    </Empty>
  );
};

export default FreeBoardList;
