import { Route, Switch } from "react-router";
import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";
import RootRedirect from "./RootRedirect";

const Main = lazy(() => import("pages/Main"));
const SignUp = lazy(() => import("pages/SignUp"));
const SignIn = lazy(() => import("pages/SignIn"));
const My = lazy(() => import("pages/My"));
const Find = lazy(() => import("pages/Find"));
const UsedBook = lazy(() => import("pages/UsedBook"));
const Oauth = lazy(() => import("pages/Oauth"));
const Book = lazy(() => import("pages/Book"));
const Order = lazy(() => import("pages/Order"));
const Community = lazy(() => import("pages/Community"));
const Search = lazy(() => import("pages/Search"));

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Main} exact />
      <PrivateRoute path="/signUp" component={SignUp} redirectPath="/" />
      <PrivateRoute path="/signIn" component={SignIn} redirectPath="/" />
      <PrivateRoute path="/my" component={My} redirectPath="/signIn" />
      <PrivateRoute path="/order/:id" component={Order} redirectPath="/signIn" />
      <PrivateRoute path="/oAuth/:name" component={Oauth} redirectPath="/" />
      <Route path="/find" component={Find} />
      <Route path="/community" component={Community} />
      <Route path="/usedBook" component={UsedBook} />
      <Route path="/search" component={Search} />
      <Route path="/book" component={Book} />
      <Route path="*" component={RootRedirect} />
    </Switch>
  );
};

export default Routers;
