import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import theme from "src/assets/style/styledTheme";
import BookReviewItem from "src/components/BookReviewList/BookReviewItem";
import Categorys from "src/components/Categorys/Categorys";
import DropDown from "src/components/DropDown/DropDown";
import { getBookSelector, getCategoryBook } from "src/modules/Slices/book/bookSlice";
import { useTypedSelector } from "src/modules/store";
import styled from "styled-components";
import { makeNewQueryString, removeQueryString } from "src/utils/queryStringUtil";
import Text from "src/elements/Text";
import queryString from "query-string";
import { BookReviewListContainer } from "../Main/style";
import { DropDownWrapper } from "../UsedBook/style";

const BookReviewList = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const [currentDropDownValue, setCurrentDropDownValue] = useState("정렬");
  const { search, pathname } = location;
  const currentQuery = useMemo(() => queryString.parse(search), [search]);

  const getBooks = useTypedSelector(getBookSelector);
  const { item } = getBooks;

  useEffect(() => {
    dispatch(getCategoryBook());
  }, [dispatch]);

  const skelatons = Array.from({ length: 20 }).map(() => ({
    background: theme.colors.mainLightBrown,
    padding: "10px",
    margin: "0 10px",
  }));
  return (
    <BookReviewContainer>
      {/* <Categorys categorys={categorys} defaultLocation="usedBook" /> */}
      <DropDownWrapper>
        <Text bold fontSize="30px" margin="0 0 0 20px">
          리뷰
        </Text>
        <DropDown defaultValue={currentDropDownValue} setSelectedId={setCurrentDropDownValue}>
          <li>
            <Link to={removeQueryString(pathname, search, ["sort"])}>정렬</Link>
          </li>
          <li>
            <Link id="date" to={makeNewQueryString(pathname, currentQuery, { sort: "date" })}>
              최신순
            </Link>
          </li>
          <li>
            <Link id="view" to={makeNewQueryString(pathname, currentQuery, { sort: "view" })}>
              조회순
            </Link>
          </li>
        </DropDown>
      </DropDownWrapper>
      <BookReviewListContainer>
        {item.length !== 0
          ? item.map((item, index) => (
              <span key={index}>
                <BookReviewItem {...item} index={index} />
              </span>
            ))
          : skelatons.map((sx, index) => (
              <Stack spacing={1} key={index} sx={sx} direction="row">
                <Stack direction="column" spacing={2} width="50%">
                  <Skeleton variant="circular" height={50} width={50} />
                  <Skeleton variant="rectangular" height="65%" width="100%" />
                </Stack>
                <Stack direction="column" spacing={2} width="50%">
                  <Skeleton variant="rectangular" height="100%" width="100%" />
                </Stack>
              </Stack>
            ))}
      </BookReviewListContainer>
    </BookReviewContainer>
  );
};

export const BookReviewContainer = styled.div`
  display: grid;
  justify-content: center;
  margin: 0 auto;
  min-height: 900px;
`;

export default BookReviewList;
