import Typography from "@mui/material/Typography";
import { Colors } from "src/assets/style/global";
import SearchBookReview from "src/components/SearchForm/SearchBookReview";
import SearchFilter from "src/components/SearchForm/SearchFilter";
import SearchUsedBook from "src/components/SearchForm/SearchUsedBook";
import * as Styled from "./style";

const Search = () => {
  return (
    <Styled.SearchContainer>
      <Typography variant="h4" mt={4} color={Colors.MAINDARK_BROWN} fontWeight="bold">
        검색 결과
      </Typography>
      <SearchFilter />
      <SearchUsedBook />
      <SearchBookReview />
    </Styled.SearchContainer>
  );
};

export default Search;
