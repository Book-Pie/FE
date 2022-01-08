import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import SignUp from "pages/SignUp/SignUp";
import SingIn from "pages/SignIn/SignIn";
import Find from "pages/Find/Find";
import BookDetail from "./pages/BookDetail/BookDetail";
import UsedBook from "pages/UsedBook/UsedBook";
import useSignIn from "hooks/useSignIn";
import { logout } from "modules/Slices/signIn/signInSlice";
import OauthTest from "pages/OauthTest/OauthTest";
import MyProfile from "pages/MyProfile/MyProfile";
import KaKaoOauth from "pages/KaKaoOauth/KaKaoOauth";
import PrivateRoute from "src/router/PrivateRoute/PrivateRoute";
import styled from "styled-components";

// 임시로 만들었습니다.
// 유저 정보를 더 보고싶으면 아래 div태그 추가하시고 원하는 정보 넣으시면됩니다.
const StyledMyProfile = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  & > div {
    display: flex;
    gap: 10px;
  }
  & > div > div:first-child {
    text-align: left;
    width: 100px;
  }
  & > div > div:last-child {
    flex: 9;
  }
`;

const App = () => {
  const { dispatch, signIn } = useSignIn();
  const { isLoggedIn, user } = signIn;

  console.log("user 값 : ", user);

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <div>
            {user ? (
              <StyledMyProfile>
                <div>
                  <div>📧</div>
                  <div>{user.email}</div>
                </div>
                <div>
                  <div>이름</div>
                  <div>{user.name}</div>
                </div>
                <div>
                  <div>닉네임</div>
                  <div>{user.nickName}</div>
                </div>
                <div>
                  <div>가입 날짜</div>
                  <div>{user.createDate}</div>
                </div>
                <div>
                  <div>주소</div>
                  <div>{user.address.mainAddress}</div>
                  <div>{user.address.detailAddress}</div>
                </div>
              </StyledMyProfile>
            ) : (
              "로그인을 해주세요."
            )}
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

            <button type="button">
              <Link to="/api/book-review/getReview/1">상세페이지</Link>
            </button>
          </div>
        </Route>
        <PrivateRoute path="/signUp" component={SignUp} redirectPath="/" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/signIn" component={SingIn} redirectPath="/" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/myProfile" component={MyProfile} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/oAuth/kakao" component={KaKaoOauth} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/oAuthTest" component={OauthTest} redirectPath="/signIn" isLoggedIn={isLoggedIn} />
        <Route path="/find" component={Find} />
        <Route path="/api/book-review/getReview/1" component={BookDetail} />
        <Route path="/usedBook" component={UsedBook} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
