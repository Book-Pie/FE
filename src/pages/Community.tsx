import { Route, Switch, useRouteMatch } from "react-router";
import FreeBoard from "components/FreeBoard/FreeBoard";
import FreeBoardInsert from "components/FreeBoardInsert/FreeBoardInsert";
import FreeBoardList from "components/FreeBoardList/FreeBoardList";
import RootRedirect from "router/RootRedirect";
import Notice from "components/Notice/Notice";
import * as Styled from "./styles";

const Community = () => {
  const { path } = useRouteMatch();

  return (
    <Styled.CommunityContainer>
      <Switch>
        <Route exact path={path} component={Notice} />
        <Route path={`${path}/freeboard`} component={FreeBoardList} exact />
        <Route path={`${path}/freeboard/insert`} component={FreeBoardInsert} exact />
        <Route path={`${path}/freeboard/:boardId`} component={FreeBoard} exact />
        <Route path="*" component={RootRedirect} />
      </Switch>
    </Styled.CommunityContainer>
  );
};

export default Community;
