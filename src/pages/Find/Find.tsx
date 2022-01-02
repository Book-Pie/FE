import { Route, Switch, useRouteMatch } from "react-router";
import FindIdForm from "src/components/FindIdForm/FindIdForm";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 1rem;
  width: 50%;
  margin: 0 auto;
  background-color: rgb(245, 246, 247);
  text-align: center;
`;

interface ResultState {
  id: string;
  path: string;
}

const Find = () => {
  const match = useRouteMatch();
  const { path } = match;

  return (
    <div>
      <Container>
        <Switch>
          <Route path={`${path}/id`}>
            <h2>아이디 찾기</h2>
            <FindIdForm />
          </Route>
          <Route path={`${path}/password`}>
            <div>비밀번호 찾기</div>
          </Route>
          <Route
            path={`${path}/result`}
            render={({ location }) => {
              const { id, path } = location.state as ResultState;

              if (/\/find\/id/gi.test(path)) {
                return (
                  <div>
                    찾으신 아이디 결과
                    <div>{JSON.stringify(id)}</div>
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
