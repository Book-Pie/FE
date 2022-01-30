import { Route, useRouteMatch } from "react-router";
import { lazy } from "react";
import * as Styled from "./style";

const UsedBookList = lazy(() => import("components/UsedBookList/UsedBookList"));
const UsedBookDetail = lazy(() => import("components/UsedBookDetail/UsedBookDetail"));

const UsedBook = () => {
  const { path } = useRouteMatch();

  return (
    <Styled.UsedBookContainer>
      <Route path={path} component={UsedBookList} exact />
      <Route path={`${path}/:id`} component={UsedBookDetail} />
    </Styled.UsedBookContainer>
  );
};

export default UsedBook;
