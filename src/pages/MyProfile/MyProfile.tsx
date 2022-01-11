import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Modified from "components/Modified/Modified";
import Withdrawal from "components/Withdrawal/Withdrawal";
import MyProfileManu from "src/components/MyProfileManu/MyProfileManu";
import MyProfileTop from "src/components/MyProfileTop/MyProfileTop";
import { Container, RouterWrapper } from "./style";

const MyProfile = () => {
  const match = useRouteMatch();

  return (
    <Container>
      <MyProfileTop />
      <MyProfileManu />
      <RouterWrapper>
        <Switch>
          <Route path={`${match.path}/a`} exact render={() => <div />} />
          <Route path={`${match.path}/b`} exact render={() => <div />} />
          <Route path={`${match.path}/c`} exact render={() => <div />} />
          <Route path={`${match.path}/d`} exact render={() => <div />} />
          <Route path={`${match.path}/e`} exact render={() => <div />} />
          <Route path={`${match.path}/modified`} component={Modified} />
          <Route path={`${match.path}/withdrawal`} component={Withdrawal} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </RouterWrapper>
    </Container>
  );
};

export default MyProfile;
