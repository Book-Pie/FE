import { RouteProps } from "react-router";

export interface PrivateRouteProps extends RouteProps {
  component: any;
  redirectPath: string;
  isLoggedIn: boolean;
}
