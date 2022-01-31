import { Route, useRouteMatch } from "react-router";
import BookDetail from "src/components/BookDetail/BookDetail";
import BookCategory from "src/components/BookReviewList/BookCategory";
import BookMain from "src/components/BookReviewList/BookMain";

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
