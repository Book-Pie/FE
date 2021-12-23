import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import SignUp from "pages/SignUp/SignUp";
import SingIn from "pages/SingIn/SingIn";

const Buttons = () => {
  return (
    <div>
      <button type="button">
        <Link to="/signup">회원가입</Link>
      </button>
      <button type="button">
        <Link to="/signin">로그인</Link>
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Buttons} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SingIn} />
      </Switch>
    </div>
  );
};

export default App;
