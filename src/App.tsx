import { AppContainer } from "assets/style/global";
import { Route, Switch } from "react-router";
import { lazy, Suspense } from "react";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import FallBack from "pages/FallBack";
import useSignIn from "hooks/useSignIn";
import PrivateRoute from "router/PrivateRoute";
import Routers from "router/Routers";

const Payment = lazy(() => import("pages/Payment"));

const App = () => {
  useSignIn();

  return (
    <Suspense fallback={<FallBack />}>
      <Switch>
        <PrivateRoute path="/payment" component={Payment} redirectPath="/" />
        <Route path="/">
          <AppContainer>
            <Header />
            <Routers />
          </AppContainer>
          <Footer />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
