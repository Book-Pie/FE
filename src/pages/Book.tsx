import { Route, useRouteMatch } from "react-router";
import BookDetail from "components/BookDetail/BookDetail";
import BookCategory from "components/BookReviewList/BookCategory";
import BookMain from "components/BookReviewList/BookMain";

const Book = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <Route path={path} component={BookMain} exact />
      <Route path={`${path}/category`} component={BookCategory} exact />
      <Route path={`${path}/category/:isbn13`} component={BookDetail} />
    </div>
  );
};

export default Book;
