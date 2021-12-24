import { Route, Switch } from "react-router";
import Mainpage from "./pages/Main/Mainpage";
import SearchResult from "./pages/SearchResult/SearchResult";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Mainpage} />
      <Route path="/search" exact component={SearchResult} />
    </Switch>
  );
};

export default App;
