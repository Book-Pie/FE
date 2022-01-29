import Typography from "@mui/material/Typography";
import { Route, Switch } from "react-router";
import { Colors } from "src/assets/style/global";
import Aladin from "src/components/SearchForm/Aladin";
import SearchBookReview from "src/components/SearchForm/SearchBookReview";
import SearchUsedBook from "src/components/SearchForm/SearchUsedBook";
import useScrollTop from "src/hooks/useScrollTop";
import * as Styled from "./style";

const Search = () => {
  useScrollTop();

  return (
    <Styled.SearchContainer>
      <Switch>
        <Route path="/search" exact>
          <Typography variant="h4" mt={4} color={Colors.DARK_GREY} fontWeight="bold">
            통합 검색 결과
          </Typography>
          <SearchUsedBook />
          <SearchBookReview />
        </Route>
        <Route path="/search/aladin">
          <Aladin />
        </Route>
      </Switch>
    </Styled.SearchContainer>
  );
};

export default Search;
