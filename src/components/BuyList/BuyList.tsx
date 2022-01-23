import Button from "@mui/material/Button";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSignIn from "src/hooks/useSignIn";
import noComments from "assets/image/noComments.png";
import { Empty } from "src/components/SaleList/style";
import {
  buyListSelector,
  getUsedBookBuyList,
  usedBookBuyConfirm,
} from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import { userReviewSelector } from "src/modules/Slices/userReview/userReviewSlice";
import { useDispatch } from "react-redux";
import { usedBookBuyListResponse } from "src/modules/Slices/usedBookDetail/types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import { ReviewListEmptyParagraph, ReviewListEmptyWrapper } from "../Reviews/ReviewList/style";
import {
  ButtonArea,
  BuyContent,
  BuyTitleContent,
  ContentText,
  ContentWrapper,
  HeaderTitle,
  HeaderWrapper,
  ImgContent,
} from "./styles";
import Modal from "./Modal";

export interface buyConfirmSubmitParam {
  orderId: string;
}

export interface BuyList {
  pages: usedBookBuyListResponse[];
}

const BuyList = () => {
  const dispatch = useDispatch();
  const { signIn } = useSignIn();
  const { isLoggedIn } = signIn;
  const buyList = useTypedSelector(buyListSelector);
  const [headers] = useState<string[]>(["사진", "거래상태", "상품명", "가격", "구매일", "기능"]);
  const [open, setOpen] = useState(false);
  const review = useTypedSelector(userReviewSelector);
  const [select, setSelect] = useState<string>("NONE");
  const [selectedItem, setSelectedItem] = useState<usedBookBuyListResponse | null>(null);
  const [limit, setLimit] = useState(10);

  const expandModal = (item: usedBookBuyListResponse) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectOnChange = (e: SelectChangeEvent<string>) => setSelect(e.target.value);

  const buyConfirmSubmit = (e: any) => {
    e.preventDefault();
    const orderId: string = e.target[1].value;
    if (window.confirm("구매확정 하시겠습니까?")) {
      const { token } = signIn;
      if (token) {
        return dispatch(usedBookBuyConfirm({ orderId, token }));
      }
      return alert("재로그인 후 다시 시도하세요.");
    }
    return false;
  };

  const handleLimitOnChange = useCallback((e: SelectChangeEvent<number>) => {
    const limit = e.target.value;
    setSelect("NONE");
    setLimit(Number(limit));
  }, []);

  useEffect(() => {
    if (review.status === "success") {
      setOpen(false);
    }
  }, [dispatch, review.status]);

  useEffect(() => {
    if (isLoggedIn) {
      const { token, user } = signIn;
      if (token) {
        const { id } = user;
        dispatch(getUsedBookBuyList({ token, id }));
      }
    }
  }, [dispatch, isLoggedIn, signIn, open, setOpen]);

  const headerList = headers.map((header, idx) => (
    <div key={idx}>
      <HeaderTitle>{header}</HeaderTitle>
    </div>
  ));

  const contentList =
    buyList.length !== 0 ? (
      buyList.map((item, idx) => {
        return (
          <ContentWrapper key={idx}>
            <BuyContent>
              <Link to={`/usedBook/${item.bookId}`}>
                {item.image.length !== 0 && (
                  <ImgContent src={`${process.env.BASE_URL}/image/${item.image}`} alt="usedBookImg" />
                )}
              </Link>
            </BuyContent>
            <BuyContent>
              <ContentText>
                {item.state === "SALE" && "거래취소"}
                {item.state === "TRADING" && "거래중"}
                {item.state === "SOLD_OUT" && "거래완료"}
              </ContentText>
            </BuyContent>
            <BuyTitleContent>
              <ContentText>{item.title}</ContentText>
            </BuyTitleContent>
            <BuyContent>
              <ContentText>{item.price}</ContentText>
            </BuyContent>
            <BuyContent>
              <ContentText>{item.orderDate.split("T", 1)}</ContentText>
            </BuyContent>
            <BuyContent>
              <ButtonArea>
                {item.state === "TRADING" ? (
                  <form onSubmit={buyConfirmSubmit}>
                    <Button variant="outlined" type="submit">
                      구매확정
                      <input type="hidden" value={item.orderId} />
                    </Button>
                  </form>
                ) : item.state === "SOLD_OUT" ? (
                  item.reviewId ? (
                    <Button disabled>리뷰작성완료</Button>
                  ) : (
                    <Button variant="contained" onClick={() => expandModal(item)} type="button">
                      리뷰작성
                    </Button>
                  )
                ) : null}
              </ButtonArea>
            </BuyContent>
            {open ? <Modal open={open} handleClose={handleClose} item={selectedItem} /> : null}
          </ContentWrapper>
        );
      })
    ) : (
      <Empty>
        <ReviewListEmptyWrapper>
          <ReviewListEmptyParagraph>구매한 상품이 존재하지 않습니다.</ReviewListEmptyParagraph>
          <img src={noComments} alt="noComments" />
        </ReviewListEmptyWrapper>
      </Empty>
    );
  return (
    <div>
      <Stack direction="row" justifyContent="center" mb={2} spacing={2}>
        <Autocomplete
          sx={{ width: 250 }}
          freeSolo
          options={buyList}
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
            <MenuItem value={10}>10개</MenuItem>
            <MenuItem value={20}>20개</MenuItem>
            <MenuItem value={50}>50개</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <HeaderWrapper>{headerList}</HeaderWrapper>
      <div>{contentList}</div>
    </div>
  );
};

export default BuyList;
