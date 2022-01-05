import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import Modified from "components/Modified/Modified";
import styled from "styled-components";

const Container = styled.div`
  width: 1600px;
  margin: 0 auto;

  .myProfile__title,
  .myProfile__top,
  .myProfile__link {
    display: flex;
    justify-content: center;
  }

  .myProfile__title {
    align-items: center;
    font-size: 3rem;
  }

  .myProfile__top {
    gap: 10px;
  }
  .myProfile__link {
    margin-top: 1rem;
    width: 100px;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 30%) 0px 4px 16px 0px;
    font-weight: 900;
    & > a {
      padding: 1rem;
    }
  }
`;

const MyProfile = () => {
  const match = useRouteMatch();

  return (
    <Container>
      <div className="myProfile__title">마이 페이지</div>
      <Switch>
        <Route path={match.path} exact>
          <div className="myProfile__top">
            <div className="myProfile__link">
              <Link to={`${match.path}/modified`}>수정하기</Link>
            </div>
            <div className="myProfile__link">
              <Link to={`${match.path}/membershipWithdrawal`}>탈퇴</Link>
            </div>
            <div className="myProfile__link">
              <Link to="/">홈으로</Link>
            </div>
          </div>
        </Route>
        <Route path={`${match.path}/modified`} render={() => <Modified path={match.path} />} />
        <Route path={`${match.path}/membershipWithdrawal`}>
          <h2>탈퇴페이지</h2>
          <Link to={match.path}>뒤로가기</Link>
        </Route>
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Container>
  );
};

export default MyProfile;
