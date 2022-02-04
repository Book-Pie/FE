import { Button } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import FindEmail from "components/FindEmail/FindEmail";
import FindPasssword from "components/FindPasssword/FindPasssword";
import * as Styled from "./styles";

const Find = () => {
  const { path } = useRouteMatch();

  return (
    <Styled.FindContainer>
      <Switch>
        <Route path={`${path}/email`} component={FindEmail} />
        <Route path={`${path}/password`} component={FindPasssword} />
      </Switch>
      <Link to="/signIn">
        <Button variant="contained" color="info">
          로그인하러 가기
        </Button>
      </Link>
    </Styled.FindContainer>
  );
};

export default Find;
