import { Redirect, Route, Switch } from "react-router";
import useSignIn from "src/hooks/useSignIn";
import { logout } from "modules/Slices/signIn/signInSlice";
import { useCallback, lazy } from "react";
import PrivateRoute from "./PrivateRoute";

const SignUp = lazy(() => import("pages/SignUp/SignUp"));
const Main = lazy(() => import("pages/Main/Main"));
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
  const { signIn, dispatch } = useSignIn();
  const { isLoggedIn } = signIn;

  const handleLogout = useCallback(() => {
    dispatch(logout());
    return <Redirect to="/" />;
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <PrivateRoute path="/signUp" component={SignUp} redirectPath="/" isLoggedIn={isLoggedIn} />
      <PrivateRoute path="/signIn" component={SignIn} redirectPath="/" isLoggedIn={isLoggedIn} />
      <PrivateRoute path="/my" component={My} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
      <PrivateRoute path="/order/:id" component={Order} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
      <Route path="/logout" render={handleLogout} />
      <Route path="/find" component={Find} />
      <Route path="/community" component={Community} />
      <Route path="/usedBook/:id" component={UsedBookDetail} />
      <Route path="/usedBook" component={UsedBook} />
      <Route path="/oAuth/:name" component={Oauth} />
      <Route path="/search" component={Search} exact />
      <Route path="/search/aladin" component={Aladin} />
      <Switch>
        <Route path="/book/:isbn/userId?:id" component={BookDetail} />
        <Route path="/book/:isbn13" component={BookDetail} />
        <Route path="/book" component={BookReviewList} />
      </Switch>
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routers;
