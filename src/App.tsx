import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import SignUp from "pages/SignUp/SignUp";
import SingIn from "pages/SingIn/SingIn";
import Find from "pages/Find/Find";
import Mainpage from "./pages/Main/Mainpage";
import SearchResult from "./pages/SearchResult/SearchResult";

const Buttons = () => {
  return (
    <div>
      <button type="button">
        <Link to="/signUp">회원가입</Link>
      </button>
      <button type="button">
        <Link to="/signIn">로그인</Link>
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Mainpage} />
      <Route path="/search" exact component={SearchResult} />
      <Route path="/" exact component={Buttons} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/signIn" component={SingIn} />
      <Route path="/find" component={Find} />
    </Switch>
  );
};

export default App;
