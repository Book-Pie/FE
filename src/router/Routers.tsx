import { Redirect, Route, Switch } from "react-router";
import Main from "src/pages/Main/Main";
import SignUp from "src/pages/SignUp/SignUp";
import Test from "src/pages/Test/Test";
import SingIn from "pages/SignIn/SignIn";
import my from "src/pages/My/My";
import OauthTest from "src/pages/OauthTest/OauthTest";
import Payment from "src/pages/Payment/Payment";
import SearchResult from "src/pages/SearchResult/SearchResult";
import Find from "src/pages/Find/Find";
import UsedBook from "src/pages/UsedBook/UsedBook";
import Oauth from "src/pages/Oauth/Oauth";
import useSignIn from "src/hooks/useSignIn";
import { logout } from "modules/Slices/signIn/signInSlice";
import { useCallback } from "react";
import MaterailUiExample from "src/pages/Test/MaterailUiExample";
import BookDetail from "src/pages/BookDetail/BookDetail";
import BookReviewList from "src/pages/BookReviewList/BookReviewList";
import PrivateRoute from "./PrivateRoute";

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
      <PrivateRoute path="/signIn" component={SingIn} redirectPath="/" isLoggedIn={isLoggedIn} />
      <PrivateRoute path="/my" component={my} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
      <PrivateRoute path="/oAuthTest" component={OauthTest} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
      <PrivateRoute path="/payment" component={Payment} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
      <Route path="/search" component={SearchResult} />
      <Route path="/logout" render={handleLogout} />
      <Route path="/find" component={Find} />
      <Route path="/usedBook" component={UsedBook} />
      <Route path="/test" component={Test} />
      <Route path="/oAuthTest" component={OauthTest} />
      <Route path="/oAuth/:name" component={Oauth} />
      <Route path="/materailUiExample" component={MaterailUiExample} />
      <Switch>
        <Route path="/book/:itemId" component={BookDetail} />
        <Route path="/book/:itemId/userId:id" component={BookDetail} />
        <Route path="/book" component={BookReviewList} />
      </Switch>
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routers;
