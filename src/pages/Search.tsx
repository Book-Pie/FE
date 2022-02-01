import Typography from "@mui/material/Typography";
import { Route, Switch } from "react-router";
import { Colors } from "assets/style/global";
import Aladin from "components/SearchForm/Aladin";
import SearchBookReview from "components/SearchForm/SearchBookReview";
import SearchUsedBook from "components/SearchForm/SearchUsedBook";
import useScrollTop from "hooks/useScrollTop";
import * as Styled from "./styles";

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
