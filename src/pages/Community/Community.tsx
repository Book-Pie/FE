import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import FreeBoard from "src/components/FreeBoard/FreeBoard";
import FreeBoardInsert from "src/components/FreeBoardInsert/FreeBoardInsert";
import FreeBoardList from "src/components/FreeBoardList/FreeBoardList";

const Community = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} render={() => <div>공지사항</div>} />
      <Route path={`${path}/freeboard`} component={FreeBoardList} exact />
      <Route path={`${path}/freeboard/insert`} component={FreeBoardInsert} exact />
      <Route path={`${path}/freeboard/:boardId`} component={FreeBoard} exact />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Community;
