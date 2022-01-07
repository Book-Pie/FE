import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import Modified from "components/Modified/Modified";
import Withdrawal from "components/Withdrawal/Withdrawal";
import { Container } from "./style";

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
              <Link to={`${match.path}/withdrawal`}>탈퇴</Link>
            </div>
            <div className="myProfile__link">
              <Link to="/">홈으로</Link>
            </div>
          </div>
        </Route>
        <Route path={`${match.path}/modified`} render={() => <Modified path={match.path} />} />
        <Route path={`${match.path}/withdrawal`} render={() => <Withdrawal path={match.path} />} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Container>
  );
};

export default MyProfile;
