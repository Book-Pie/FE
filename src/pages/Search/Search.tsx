import Typography from "@mui/material/Typography";
import { Colors } from "src/assets/style/global";
import SearchBookReview from "src/components/SearchForm/SearchBookReview";
import SearchUsedBook from "src/components/SearchForm/SearchUsedBook";
import useScrollTop from "src/hooks/useScrollTop";
import * as Styled from "./style";

const Search = () => {
  useScrollTop();

  return (
    <Styled.SearchContainer>
      <Typography variant="h4" mt={4} color={Colors.MAINDARK_BROWN} fontWeight="bold">
        통합 검색 결과
      </Typography>
      <SearchUsedBook />
      <SearchBookReview />
    </Styled.SearchContainer>
  );
};

export default Search;
