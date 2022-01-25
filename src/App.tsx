import { Container } from "src/assets/style/global";
import { Route, Switch } from "react-router";
import { lazy, Suspense } from "react";
import Routers from "./router/Routers";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Fallback from "./components/Fallback/Fallback";
import useSignIn from "./hooks/useSignIn";
import PrivateRoute from "./router/PrivateRoute";

const Payment = lazy(() => import("src/pages/Payment/Payment"));

const App = () => {
  useSignIn();

  return (
    <Suspense fallback={<Fallback />}>
      <Switch>
        <PrivateRoute path="/payment" component={Payment} redirectPath="/" />
        <Route path="/">
          <Header />
          <Container>
            <Routers />
          </Container>
          <Footer />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
