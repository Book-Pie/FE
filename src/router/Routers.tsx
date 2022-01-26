import { Redirect, Route, Switch } from "react-router";
import { logout } from "modules/Slices/signIn/signInSlice";
import { useCallback, lazy } from "react";
import { useAppDispatch } from "src/modules/store";
import PrivateRoute from "./PrivateRoute";

const Main = lazy(() => import("pages/Main/Main"));
const SignUp = lazy(() => import("pages/SignUp/SignUp"));
const SignIn = lazy(() => import("pages/SignIn/SignIn"));
const My = lazy(() => import("pages/My/My"));
const Find = lazy(() => import("pages/Find/Find"));
const UsedBook = lazy(() => import("pages/UsedBook/UsedBook"));
const Oauth = lazy(() => import("pages/Oauth/Oauth"));
const BookDetail = lazy(() => import("pages/BookDetail/BookDetail"));
const BookReviewList = lazy(() => import("pages/BookReviewList/BookReviewList"));
const UsedBookDetail = lazy(() => import("pages/UsedBookDetail/UsedBookDetail"));
const Order = lazy(() => import("pages/Order/Order"));
const Community = lazy(() => import("pages/Community/Community"));
const Search = lazy(() => import("pages/Search/Search"));
const Aladin = lazy(() => import("components/SearchForm/Aladin"));

const Routers = () => {
  const dispatch = useAppDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    return <Redirect to="/" />;
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/" component={Main} exact />
      <PrivateRoute path="/signUp" component={SignUp} redirectPath="/" />
      <PrivateRoute path="/signIn" component={SignIn} redirectPath="/" />
      <PrivateRoute path="/my" component={My} redirectPath="/signIn" />
      <PrivateRoute path="/order/:id" component={Order} redirectPath="/signIn" />
      <PrivateRoute path="/oAuth/:name" component={Oauth} redirectPath="/" />
      <Route path="/logout" render={handleLogout} />
      <Route path="/find" component={Find} />
      <Route path="/community" component={Community} />
      <Route path="/usedBook/:id" component={UsedBookDetail} />
      <Route path="/usedBook" component={UsedBook} />
      <Route path="/search" component={Search} />
      <Route path="/search/aladin" component={Aladin} />
      <Route path="/book/:isbn13" component={BookDetail} />
      <Route path="/book" component={BookReviewList} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routers;
