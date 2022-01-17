import { Redirect, Route, Switch } from "react-router";
import useSignIn from "src/hooks/useSignIn";
import { logout } from "modules/Slices/signIn/signInSlice";
import UsedBookDetail from "src/pages/UsedBookDetail/UsedBookDetail";
import { useCallback, lazy, Suspense } from "react";
import Fallback from "components/Fallback/Fallback";
import PrivateRoute from "./PrivateRoute";

const SignUp = lazy(() => import("pages/SignUp/SignUp"));
const Main = lazy(() => import("pages/Main/Main"));
const SignIn = lazy(() => import("pages/SignIn/SignIn"));
const My = lazy(() => import("pages/My/My"));
const Payment = lazy(() => import("pages/Payment/Payment"));
const Find = lazy(() => import("pages/Find/Find"));
const UsedBook = lazy(() => import("pages/UsedBook/UsedBook"));
const Oauth = lazy(() => import("pages/Oauth/Oauth"));
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
    <Suspense fallback={<Fallback />}>
      <Switch>
        <Route path="/" exact component={Main} />
        <PrivateRoute path="/signUp" component={SignUp} redirectPath="/" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/signIn" component={SignIn} redirectPath="/" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/my" component={My} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/payment" component={Payment} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
        <Route path="/logout" render={handleLogout} />
        <Route path="/find" component={Find} />
        <Route path="/usedBook/:id" component={UsedBookDetail} />
        <Route path="/usedBook" component={UsedBook} />
        <Route path="/oAuth/:name" component={Oauth} />
        <Switch>
          <Route path="/book/:isbn/userId?:id" component={BookDetail} />
          <Route path="/book/:isbn13" component={BookDetail} />
          <Route path="/book" component={BookReviewList} />
        </Switch>
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Suspense>
  );
};

export default Routers;
