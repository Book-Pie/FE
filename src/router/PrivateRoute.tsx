import { Redirect, Route, RouteProps } from "react-router";
import { getAccessToken } from "utils/localStorageUtil";

interface PrivateRouteProps extends RouteProps {
  component: any;
  redirectPath: string;
  isLoggedIn: boolean;
}

const PrivateRoute = ({ component: Component, redirectPath, isLoggedIn, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={props => {
        const { match } = props;
        const { path } = match;
        let returnComponent = <Redirect to={redirectPath} />;

        if (path.match("/myProfile")) {
          if (isLoggedIn || getAccessToken()) returnComponent = <Component {...props} />;
        }
        if (path.match("/signIn")) {
          if (!isLoggedIn) returnComponent = <Component {...props} />;
        }

        if (path.match("/signUp")) {
          if (!isLoggedIn) returnComponent = <Component {...props} />;
        }

        return returnComponent;
      }}
    />
  );
};

export default PrivateRoute;
