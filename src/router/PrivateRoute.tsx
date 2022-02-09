import { Redirect, Route, RouteProps } from "react-router";
import { isLoggedInSelector } from "modules/Slices/user/userSlice";
import { useTypedSelector } from "modules/store";
import { getAccessToken } from "utils/localStorageUtil";

export interface PrivateRouteProps extends RouteProps {
  component: any;
  redirectPath: string;
}

const PrivateRoute = ({ component: Component, redirectPath, ...rest }: PrivateRouteProps) => {
  const isLoggedIn = useTypedSelector(isLoggedInSelector);

  return (
    <Route
      {...rest}
      render={props => {
        const { match } = props;
        const { path } = match;

        if (path.match("/payment") || path.match("/my") || path.match("/order") || path.match("/chat")) {
          if (isLoggedIn || getAccessToken()) return <Component {...props} />;
        }

        if (path.match("/signIn") || path.match("/signUp")) {
          console.log(2);
          if (!isLoggedIn) return <Component {...props} />;
        }
        if (path.match("/oAuth/:name")) {
          console.log(3);
          if (!isLoggedIn) return <Component {...props} />;
        }

        return <Redirect to={redirectPath} />;
      }}
    />
  );
};

export default PrivateRoute;
