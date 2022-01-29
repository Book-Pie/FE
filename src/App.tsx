import { Container } from "assets/style/global";
import { Route, Switch } from "react-router";
import { lazy, Suspense } from "react";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Fallback from "components/Fallback/Fallback";
import useSignIn from "hooks/useSignIn";
import PrivateRoute from "router/PrivateRoute";
import Routers from "router/Routers";

const Payment = lazy(() => import("pages/Payment/Payment"));

const App = () => {
  useSignIn();

  return (
    <Suspense fallback={<Fallback />}>
      <Switch>
        <PrivateRoute path="/payment" component={Payment} redirectPath="/" />
        <Route path="/">
          <Container>
            <Header />
            <Routers />
          </Container>
          <Footer />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
