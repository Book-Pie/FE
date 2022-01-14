import { Redirect, Route, Switch } from "react-router";
import Main from "src/pages/Main/Main";
import useSignIn from "src/hooks/useSignIn";
import { logout } from "modules/Slices/signIn/signInSlice";
import { useCallback, lazy, Suspense } from "react";
import Loading from "src/elements/Loading";
import PrivateRoute from "./PrivateRoute";

const SignUp = lazy(() => import("pages/SignUp/SignUp"));
const SignIn = lazy(() => import("pages/SignIn/SignIn"));
const My = lazy(() => import("pages/My/My"));
const OauthTest = lazy(() => import("pages/OauthTest/OauthTest"));
const Payment = lazy(() => import("pages/Payment/Payment"));
const SearchResult = lazy(() => import("pages/SearchResult/SearchResult"));
const Find = lazy(() => import("pages/Find/Find"));
const UsedBook = lazy(() => import("pages/UsedBook/UsedBook"));
const Oauth = lazy(() => import("pages/Oauth/Oauth"));
const MaterailUiExample = lazy(() => import("pages/Test/MaterailUiExample"));
const BookDetail = lazy(() => import("pages/BookDetail/BookDetail"));
const BookReviewList = lazy(() => import("pages/BookReviewList/BookReviewList"));

const Routers = () => {
  const { signIn, dispatch } = useSignIn();
  const { isLoggedIn } = signIn;

  const handleLogout = useCallback(() => {
    dispatch(logout());
    return <Redirect to="/" />;
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading isLoading />}>
      <Switch>
        <Route path="/" exact component={Main} />
        <PrivateRoute path="/signUp" component={SignUp} redirectPath="/" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/signIn" component={SignIn} redirectPath="/" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/my" component={My} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/oAuthTest" component={OauthTest} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/payment" component={Payment} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
        <Route path="/search" component={SearchResult} />
        <Route path="/logout" render={handleLogout} />
        <Route path="/find" component={Find} />
        <Route path="/usedBook/:id" render={() => <div>글 상세</div>} />
        <Route path="/usedBook" component={UsedBook} />
        <Route path="/oAuth/:name" component={Oauth} />
        <Route path="/materailUiExample" component={MaterailUiExample} />
        <Route path="/book/:itemId" component={BookDetail} />
        <Route path="/book" component={BookReviewList} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Suspense>
  );
};

export default Routers;
