import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import SignUp from "pages/SignUp/SignUp";
import SingIn from "pages/SingIn/SingIn";
import Find from "pages/Find/Find";
import UsedBook from "pages/UsedBook/UsedBook";
import useSignIn from "hooks/useSignIn";
import { logout } from "./modules/Slices/signInSlice";

const App = () => {
  const { dispatch, signIn } = useSignIn();
  const { isLoggedIn, user } = signIn;

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <div>
            <div> {user ? `아이디 : ${user.username}` : "로그인을 해주세요."}</div>
            <button type="button">
              <Link to="/signUp">회원가입</Link>
            </button>
            {isLoggedIn ? (
              <button type="button" onClick={() => dispatch(logout())}>
                로그아웃
              </button>
            ) : (
              <button type="button">
                <Link to="/signIn">로그인</Link>
              </button>
            )}
            <button type="button">
              <Link to="/usedBook">중고장터</Link>
            </button>
          </div>
        </Route>
        <Route path="/signUp" component={SignUp} />
        <Route path="/signIn" component={SingIn} />
        <Route path="/find" component={Find} />
        <Route path="/usedBook" component={UsedBook} />
      </Switch>
    </div>
  );
};

export default App;
