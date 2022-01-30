import { Route, useRouteMatch } from "react-router";
import BookDetail from "src/components/BookDetail/BookDetail";
import BookReviewList from "src/components/BookReviewList/BookReviewList";

const Book = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Route path={path} component={BookReviewList} exact />
      <Route path={`${path}/:isbn13`} component={BookDetail} />
    </div>
  );
};

export default Book;
