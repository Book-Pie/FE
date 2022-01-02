import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import SignUp from "pages/SignUp/SignUp";
import SingIn from "pages/SingIn/SingIn";
import Find from "pages/Find/Find";
import BookDetail from "./pages/BookDetail/BookDetail";

const Buttons = () => {
  return (
    <div>
      <button type="button">
        <Link to="/signUp">회원가입</Link>
      </button>
      <button type="button">
        <Link to="/signIn">로그인</Link>
      </button>
      <button type="button">
        <Link to="/api/book-review/getReview/1">상세페이지</Link>
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Buttons} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/signIn" component={SingIn} />
        <Route path="/find" component={Find} />
        <Route path="/api/book-review/getReview/1" component={BookDetail} />
      </Switch>
    </div>
  );
};

export default App;
