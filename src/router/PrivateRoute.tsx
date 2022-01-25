import { Redirect, Route } from "react-router";
import { signInSelector } from "src/modules/Slices/signIn/signInSlice";
import { useTypedSelector } from "src/modules/store";
import { getAccessToken } from "utils/localStorageUtil";
import { PrivateRouteProps } from "./types";

const PrivateRoute = ({ component: Component, redirectPath, ...rest }: PrivateRouteProps) => {
  const { isLoggedIn } = useTypedSelector(signInSelector);

  return (
    <Route
      {...rest}
      render={props => {
        const { match } = props;
        const { path } = match;

        if (path.match("/payment") || path.match("/my") || path.match("/order")) {
          if (isLoggedIn || getAccessToken()) return <Component {...props} />;
        }

        if (path.match("/signIn") || path.match("/signUp")) {
          if (!isLoggedIn) return <Component {...props} />;
        }
        if (path.match("/oAuth/:name")) {
          if (!isLoggedIn) return <Component {...props} />;
        }

        return <Redirect to={redirectPath} />;
      }}
    />
  );
};

export default PrivateRoute;
