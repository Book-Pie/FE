import React, { useCallback, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import Popup from "elements/Popup";
import client, { errorHandler, makeAuthTokenHeader } from "api/client";
import noComments from "assets/image/noComments.png";
import { AutocompleteChangeReason, SelectChangeEvent, useMediaQuery } from "@mui/material";
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
import useDelay from "hooks/useDelay";
import { getShopPage, removeShopPage, setShopPage } from "utils/localStorageUtil";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import { useTypedSelector } from "modules/store";
import usePopup from "hooks/usePopup";

import * as Styled from "./style";
import * as Types from "./types";
import Skeletons from "./Skeletons";
import Content from "./Content";

const SaleList = () => {
  const { user, token } = useTypedSelector(userReduceSelector);
  const [list, setList] = useState<Types.SaleListState>({
    page: getShopPage(1),
    pageCount: 0,
    pages: [],
    isEmpty: false,
  });
  const [limit, setLimit] = useState(10);
  const [titleFilter, setTitleFilter] = useState<string | null>(null);
  const max950 = useMediaQuery("(max-width:950px)");
  const [select, setSelect] = useState<string>("NONE");
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;
  const [isLoading, setIsLoading] = useState(false);
  const delay = useDelay(500);
  const { path } = useRouteMatch();
  const { pages, page, pageCount } = list;

  const handleHasMoreList = useCallback(
    async (page: number, limit: number) => {
      try {
        if (!user || !token) throw new Error("???????????? ???????????????.");
        const query = queryString.stringify({ userId: user.id, page, limit });
        setIsLoading(true);
        await delay();
        const { data } = await client.get<Types.SaleListResponse>(
          `/usedbook/user?${query}`,
          makeAuthTokenHeader(token),
        );
        const { pageCount, pages } = data;
        setList({
          pageCount,
          pages,
          page,
          isEmpty: pages.length === 0 ? true : false,
        });
      } catch (error: any) {
        handlePopupMessage(false, errorHandler(error));
      } finally {
        setIsLoading(false);
      }
    },
    [user, handlePopupMessage, token, delay],
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
    (id: number) => async () => {
      try {
        if (!token) throw new Error("???????????? ???????????????.");
        await client.put(`/usedbook/date/${id}`, {}, makeAuthTokenHeader(token));
        handleHasMoreList(page, limit);
      } catch (error: any) {
        handlePopupMessage(false, errorHandler(error));
      }
    },
    [page, handleHasMoreList, handlePopupMessage, token, limit],
  );

  const handleTitlteFilterOnChange = useCallback(
    (
      _: React.SyntheticEvent<Element, Event>,
      value: string | null | Types.UsedBook,
      reason: AutocompleteChangeReason,
    ) => {
      if (value && typeof value !== "string") {
        setTitleFilter(value.title);
      }
      if (value && typeof value === "string") {
        setTitleFilter(value);
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
    <Styled.Empty>
      <p>????????? ???????????? ?????? ????????????.</p>
      <img src={noComments} alt="noComments" />
      <Link to={`${path}/insert`}>
        <Button variant="contained" color="mainDarkBrown">
          ????????????
        </Button>
      </Link>
    </Styled.Empty>
  ) : (
    Array.from({ length: limit }).map((_, idx) => (
      <Styled.SaleTableBody key={idx}>
        <Skeletons />
      </Styled.SaleTableBody>
    ))
  );

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} autoClose className={isSuccess ? "green" : "red"}>
          {message}
        </Popup>
      )}
      <Styled.SaleListWrapper>
        <Styled.SaleSearch>
          <Autocomplete
            freeSolo
            onChange={handleTitlteFilterOnChange}
            options={pages}
            getOptionLabel={option => (option.title ? option.title : "")}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.id}>
                {option.title}
              </Box>
            )}
            renderInput={params => <TextField {...params} label="????????? ??????" />}
          />
          <FormControl sx={{ width: 120 }} color="mainDarkBrown">
            <InputLabel id="????????????">????????????</InputLabel>
            <Select
              label="????????????"
              color="primary"
              value={select}
              onChange={handleSelectOnChange}
              sx={{
                color: theme => theme.colors.mainDarkBrown,
                fontSize: max950 ? "0.5rem" : "1rem",
                height: "100%",
              }}
            >
              <MenuItem value="NONE">??????</MenuItem>
              <MenuItem value="SALE">?????? ???</MenuItem>
              <MenuItem value="TRADING">?????? ???</MenuItem>
              <MenuItem value="SOLD_OUT">????????????</MenuItem>
            </Select>
          </FormControl>
        </Styled.SaleSearch>
        <Styled.SaleFilter>
          <Link to={`${path}/insert`}>
            <Button variant="contained" color="mainDarkBrown" size={max950 ? "small" : "medium"}>
              ????????? ??????
            </Button>
          </Link>
          <FormControl size="small" sx={{ width: 120 }} color="mainDarkBrown">
            <Select
              color="primary"
              value={limit}
              onChange={handleLimitOnChange}
              sx={{
                color: theme => theme.colors.mainDarkBrown,
                fontSize: "0.5rem",
                height: max950 ? 50 : "100%",
              }}
            >
              <MenuItem value={10}>10???</MenuItem>
              <MenuItem value={20}>20???</MenuItem>
              <MenuItem value={50}>50???</MenuItem>
            </Select>
          </FormControl>
        </Styled.SaleFilter>
        {content}
        {list.isEmpty || (
          <Stack mt={2} justifyContent="center" direction="row">
            <Pagination
              siblingCount={0}
              count={pageCount || limit}
              page={page}
              onChange={handlePaginationOnChange}
              variant="outlined"
              shape="rounded"
              size={max950 ? "medium" : "large"}
              sx={{
                ".Mui-selected": {
                  background: theme => theme.colors.mainDarkBrown,
                  color: theme => theme.colors.white,
                },
              }}
            />
          </Stack>
        )}
      </Styled.SaleListWrapper>
    </>
  );
};

export default SaleList;
