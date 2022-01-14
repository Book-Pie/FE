import React, { useCallback, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import { getShopList, getUsedbookLatest } from "src/api/my/my";
import useSignIn from "src/hooks/useSignIn";
import Popup from "src/components/Popup/Popup";
import { errorHandler } from "src/api/http";
import noComments from "assets/image/noComments.png";
import { AutocompleteChangeReason, SelectChangeEvent } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";

import useDelay from "src/hooks/useDelay";
import { getShopPage, removeShopPage, setShopPage } from "src/utils/localStorageUtil";
import { Wrapper, TableHeader, Cell, TableBody, Empty } from "./style";
import { AxioseReponse, IList, IPage } from "./type";
import Skelaton from "./Skelaton";
import Content from "./Content";

const MyShopList = () => {
  const { signIn } = useSignIn();
  const { user } = signIn;
  const [list, setList] = useState<IList>({
    page: getShopPage(1),
    pageCount: 0,
    pages: [],
    isEmpty: false,
  });
  const [limit, setLimit] = useState(10);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [titleFilter, setTitleFilter] = useState<string | null>(null);
  const [select, setSelect] = useState<string>("NONE");
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [header] = useState(["사진", "판매상태", "상품명", "가격", "찜 / 댓글", "최근수정일", "기능"]);

  const delay = useDelay(500);
  const { path } = useRouteMatch();
  const { pages, page, pageCount } = list;

  const handlePopUp = useCallback((message: string, isSuccess: boolean) => {
    setPopUpState({
      isSuccess,
      message,
    });
    setIsOpen(true);
  }, []);

  const handleHasMoreList = useCallback(
    async (page: number, limit: number) => {
      if (user) {
        const query = queryString.stringify({ userId: user.id, page, limit });
        try {
          setIsLoading(true);
          await delay();
          const { data } = await getShopList<AxioseReponse>(query);
          const { pageCount, pages } = data.data;
          setList({
            pageCount,
            pages,
            page,
            isEmpty: pages.length === 0 ? true : false,
          });
        } catch (error: any) {
          handlePopUp(errorHandler(error), false);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [user, handlePopUp, delay],
  );

  const handleLimitOnChange = useCallback(
    (e: SelectChangeEvent<number>) => {
      const limit = e.target.value;
      setSelect("NONE");
      setTitleFilter(null);
      setLimit(Number(limit));
      handleHasMoreList(1, Number(limit));
    },
    [handleHasMoreList],
  );

  const handleSelectOnChange = (e: SelectChangeEvent<string>) => setSelect(e.target.value);

  const handlePaginationOnChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => handleHasMoreList(value, limit),
    [handleHasMoreList, limit],
  );

  const handleLatestClick = useCallback(
    (id: number) => () => {
      getUsedbookLatest(id);
      handleHasMoreList(page, limit);
    },
    [page, handleHasMoreList, limit],
  );

  const handleTitlteFilterOnChange = useCallback(
    (_: React.SyntheticEvent<Element, Event>, value: string | null | IPage, reason: AutocompleteChangeReason) => {
      if (value && typeof value !== "string") {
        setTitleFilter(value.title);
      }
      if (reason === "clear") {
        setTitleFilter(null);
      }
    },
    [],
  );

  useEffect(() => {
    const { pages, pageCount, isEmpty, page } = list;
    if (pages.length === 0 && pageCount === 0 && !isEmpty) handleHasMoreList(page, limit);
  }, [handleHasMoreList, list, limit]);

  useEffect(() => {
    if (getShopPage() === 0) setShopPage(page);
    return () => {
      removeShopPage();
    };
  });

  const content = pages.length ? (
    <Content
      isLoading={isLoading}
      pages={pages}
      titleFilter={titleFilter}
      select={select}
      handleLatestClick={handleLatestClick}
    />
  ) : list.isEmpty ? (
    <Empty>
      <p>등록된 중고도서 글이 없습니다.</p>
      <img src={noComments} alt="noComments" />
      <Link to={`${path}/insert`}>
        <Button variant="contained" color="mainDarkBrown">
          상품등록
        </Button>
      </Link>
    </Empty>
  ) : (
    Array.from({ length: limit }).map((_, idx) => <Skelaton key={idx} />)
  );

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose className={popUpState.isSuccess ? "green" : "red"}>
          {popUpState.message}
        </Popup>
      )}
      <Wrapper>
        <Stack direction="row" justifyContent="center" mb={2} spacing={2}>
          <Autocomplete
            id="free-solo-demo"
            sx={{ width: 250 }}
            freeSolo
            onChange={handleTitlteFilterOnChange}
            options={pages}
            getOptionLabel={option => option.title}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.id}>
                {option.title}
              </Box>
            )}
            renderInput={params => <TextField {...params} label="제목 검색" />}
          />
          <FormControl sx={{ width: 120 }}>
            <InputLabel id="판매상태">판매상태</InputLabel>
            <Select
              label="판매상태"
              color="primary"
              value={select}
              onChange={handleSelectOnChange}
              sx={{
                color: theme => theme.colors.mainDarkBrown,
                fontWeight: 900,
              }}
            >
              <MenuItem value="NONE">전체</MenuItem>
              <MenuItem value="SALE">판매 중</MenuItem>
              <MenuItem value="TRADING">거래 중</MenuItem>
              <MenuItem value="SOLD_OUT">판매완료</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mb={2} spacing={2}>
          <FormControl sx={{ width: 120 }}>
            <Select
              color="primary"
              value={limit}
              onChange={handleLimitOnChange}
              sx={{
                color: theme => theme.colors.mainDarkBrown,
                fontWeight: 900,
              }}
            >
              <MenuItem value={10}>10개</MenuItem>
              <MenuItem value={20}>20개</MenuItem>
              <MenuItem value={50}>50개</MenuItem>
            </Select>
          </FormControl>
          <Link to={`${path}/insert`}>
            <Button variant="contained" color="mainDarkBrown">
              상품등록
            </Button>
          </Link>
        </Stack>
        <TableHeader>
          {header.map((text, idx) => (
            <Cell key={idx}>
              <span>{text}</span>
            </Cell>
          ))}
        </TableHeader>
        <TableBody>{content}</TableBody>
        {list.isEmpty || (
          <Stack mt={5} justifyContent="center" direction="row">
            <Pagination
              count={pageCount || limit}
              page={page}
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
        )}
      </Wrapper>
    </>
  );
};

export default MyShopList;
