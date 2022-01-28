import { useCallback, useEffect, useState } from "react";
import queryString from "query-string";
import useSignIn from "src/hooks/useSignIn";
import noComments from "assets/image/noComments.png";
import { UsedBookBuyListResponse } from "src/modules/Slices/usedBookDetail/types";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import useDelay from "src/hooks/useDelay";
import { getShopPage, removeShopPage, setShopPage } from "src/utils/localStorageUtil";
import { Empty } from "src/components/SaleList/style";
import { getUsedBookBuyList, usedBookSelector } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import ContentList from "./ContentList";
import MyPageSkeleton from "./MyPageSkeleton";
import { ReviewListEmptyParagraph, ReviewListEmptyWrapper } from "../Reviews/ReviewList/style";
import { FlexBox, HeaderTitle, HeaderWrapper } from "./styles";
import { BuyListResponse } from "./types";

export interface buyConfirmSubmitParam {
  orderId: string;
}
export interface BuyList {
  pages: UsedBookBuyListResponse[];
}

const BuyList = () => {
  const { signIn, dispatch } = useSignIn();
  const { user } = signIn;
  const [headers] = useState<string[]>(["사진", "거래상태", "상품명", "가격", "구매일", "기능"]);
  const [select, setSelect] = useState<string>("NONE");
  const [limit, setLimit] = useState(5);
  const [titleFilter, setTitleFilter] = useState<string | null>(null);
  const [page, setPage] = useState(getShopPage(1));
  const { list } = useTypedSelector(usedBookSelector);
  const [open, setOpen] = useState(false);

  const { pages, pageCount } = list;
  const delay = useDelay(500);

  const handleSelectOnChange = (e: SelectChangeEvent<string>) => setSelect(e.target.value);

  const handleHasMoreList = useCallback(
    async (page: number, limit: number) => {
      if (user) {
        const query = queryString.stringify({ id: user.id, page, limit });
        await delay();
        const { token } = signIn;
        if (token) {
          dispatch(getUsedBookBuyList({ query, token }));
        }
      }
    },
    [user, delay, signIn, dispatch],
  );

  useEffect(() => {
    handleHasMoreList(page, limit);
  }, [handleHasMoreList, page, limit, open]);

  const handlePaginationOnChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      handleHasMoreList(value, limit);
      setPage(value);
    },
    [handleHasMoreList, limit],
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

  const handleTitlteFilterOnChange = useCallback(
    (
      _: React.SyntheticEvent<Element, Event>,
      value: string | null | BuyListResponse,
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
  }, [handleHasMoreList, list, limit, open, setOpen]);

  useEffect(() => {
    if (getShopPage() === 0) setShopPage(page);
    return () => {
      removeShopPage();
    };
  });

  const headerList = headers.map((header, idx) => (
    <div key={idx}>
      <HeaderTitle>{header}</HeaderTitle>
    </div>
  ));

  const contentList =
    pages.length !== 0 ? (
      <ContentList pages={pages} titleFilter={titleFilter} select={select} setOpen={setOpen} open={open} />
    ) : list.isEmpty ? (
      <Empty>
        <ReviewListEmptyWrapper>
          <ReviewListEmptyParagraph>구매한 상품이 존재하지 않습니다.</ReviewListEmptyParagraph>
          <img src={noComments} alt="noComments" />
        </ReviewListEmptyWrapper>
      </Empty>
    ) : (
      Array.from({ length: limit }).map((_, idx) => (
        <FlexBox key={idx}>
          <MyPageSkeleton />
        </FlexBox>
      ))
    );
  return (
    <div>
      <Stack direction="row" justifyContent="center" mb={2} spacing={2}>
        <Autocomplete
          sx={{ width: 250 }}
          freeSolo
          onChange={handleTitlteFilterOnChange}
          options={pages}
          getOptionLabel={option => (option.title ? option.title : "")}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.orderId}>
              {option.title}
            </Box>
          )}
          renderInput={params => <TextField {...params} label="제목 검색" />}
        />
        <FormControl sx={{ width: 120 }}>
          <InputLabel id="거래상태">거래상태</InputLabel>
          <Select
            label="거래상태"
            color="primary"
            value={select}
            onChange={handleSelectOnChange}
            sx={{
              color: theme => theme.colors.mainDarkBrown,
              fontWeight: 900,
            }}
          >
            <MenuItem value="NONE">전체</MenuItem>
            <MenuItem value="SALE">거래 취소</MenuItem>
            <MenuItem value="TRADING">거래 중</MenuItem>
            <MenuItem value="SOLD_OUT">거래완료</MenuItem>
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
            <MenuItem value={5}>5개</MenuItem>
            <MenuItem value={10}>10개</MenuItem>
            <MenuItem value={20}>20개</MenuItem>
            <MenuItem value={50}>50개</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <HeaderWrapper>{headerList}</HeaderWrapper>
      <div>{contentList}</div>
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
            }}
          />
        </Stack>
      )}
    </div>
  );
};

export default BuyList;
