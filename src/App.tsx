import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import SignUp from "pages/SignUp/SignUp";
import SingIn from "pages/SingIn/SingIn";
import Find from "pages/Find/Find";
import UsedBook from "pages/UsedBook/UsedBook";
import useSignIn from "hooks/useSignIn";
import { logout } from "src/modules/Slices/signIn/signInSlice";
import OauthTest from "src/pages/OauthTest/OauthTest";
import MyProfile from "pages/MyProfile/MyProfile";
import KaKaoOauth from "pages/KaKaoOauth/KaKaoOauth";
import PrivateRoute from "./router/PrivateRoute";

const App = () => {
  const { dispatch, signIn } = useSignIn();
  const { isLoggedIn, user } = signIn;

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <div>
            <div style={{ marginBottom: "1rem" }}> {user ? `이메일 : ${user.email}` : "로그인을 해주세요."}</div>
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
            <button type="button">
              <Link to="/oAuthTest">oAuth Test</Link>
            </button>
            <button type="button">
              <Link to="/myProfile">마이페이지</Link>
            </button>
          </div>
        </Route>
        <PrivateRoute path="/signUp" component={SignUp} redirectPath="/" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/signIn" component={SingIn} redirectPath="/" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/myProfile" component={MyProfile} redirectPath="signIn" isLoggedIn={isLoggedIn} />
        <Route path="/find" component={Find} />
        <Route path="/usedBook" component={UsedBook} />
        <Route path="/oAuth/kakao" component={KaKaoOauth} />
        <Route path="/oAuthTest" component={OauthTest} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
