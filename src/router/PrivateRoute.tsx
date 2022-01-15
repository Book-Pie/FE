import { Redirect, Route } from "react-router";
import { getAccessToken } from "utils/localStorageUtil";
import { PrivateRouteProps } from "./types";

const PrivateRoute = ({ component: Component, redirectPath, isLoggedIn, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={props => {
        const { match } = props;
        const { path } = match;
        let returnComponent = <Redirect to={redirectPath} />;

        if (path.match("/my")) {
          if (isLoggedIn || getAccessToken()) returnComponent = <Component {...props} />;
        }
        if (path.match("/payment")) {
          if (isLoggedIn || getAccessToken()) returnComponent = <Component {...props} />;
        }
        if (path.match("/signIn")) {
          if (!isLoggedIn) returnComponent = <Component {...props} />;
        }
        if (path.match("/signUp")) {
          if (!isLoggedIn) returnComponent = <Component {...props} />;
        }
        if (path.match("/oAuth/kakao")) {
          if (isLoggedIn) returnComponent = <Component {...props} />;
        }

        return returnComponent;
      }}
    />
  );
};

export default PrivateRoute;
