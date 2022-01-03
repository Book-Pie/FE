import { Route, Switch, useRouteMatch } from "react-router";
import FindEmailForm from "components/FindEmailForm/FindEmailForm";
import FindPasswordForm from "components/FindPassswordForm/FindPasswordForm";
import { Link } from "react-router-dom";
import { LocationState } from "./types";
import { Container } from "./style";

const Find = () => {
  const match = useRouteMatch();
  const { path } = match;

  return (
    <div>
      <Container>
        <Switch>
          <Route path={`${path}/email`}>
            <h2>이메일 찾기</h2>
            <FindEmailForm />
          </Route>
          <Route path={`${path}/password`}>
            <h2>비밀번호 찾기</h2>
            <FindPasswordForm />
          </Route>
          <Route
            path={`${path}/result`}
            render={({ location }) => {
              const { email, path } = location.state as LocationState;

              if (/email/gi.test(path)) {
                return (
                  <div>
                    찾으신 이메일 결과
                    <div>{email}</div>
                    <div>
                      <Link to="/signIn">로그인하기</Link>
                    </div>
                  </div>
                );
              }

              return (
                <div>
                  비밀번호가 변경되었습니다.
                  <div>
                    <Link to="/signIn">로그인하기</Link>
                  </div>
                </div>
              );
            }}
          />
        </Switch>
      </Container>
    </div>
  );
};

export default Find;
