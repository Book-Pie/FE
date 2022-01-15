import { Button } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import FindEmail from "src/components/FindEmail/FindEmail";
import FindPasssword from "src/components/FindPasssword/FindPasssword";
import { Wrapper } from "./style";

const Find = () => {
  const { path } = useRouteMatch();

  return (
    <Wrapper>
      <Switch>
        <Route path={`${path}/email`} component={FindEmail} />
        <Route path={`${path}/password`} component={FindPasssword} />
      </Switch>
      <Link to="/signIn">
        <Button variant="contained" color="mainDarkBrown" fullWidth sx={{ mt: 2, mb: 2, height: 60 }}>
          로그인하러 가기
        </Button>
      </Link>
    </Wrapper>
  );
};

export default Find;
