import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import http from "src/api/http";
import FreeBoard from "src/components/FreeBoard/FreeBoard";
import FreeBoardInsert from "src/components/FreeBoardInsert/FreeBoardInsert";
import FreeBoardList from "src/components/FreeBoardList/FreeBoardList";
import { Content } from "src/modules/Slices/freeBoard/types";
import { dateFormat2 } from "src/utils/formatUtil";
import Grid from "@mui/material/Grid";

import * as Styled from "./style";

const Community = () => {
  const { path } = useRouteMatch();
  const [notice, setNotice] = useState<Content[]>();
  useEffect(() => {
    http.get("/board/getAll?boardType=NOTICE&page=0&size=20").then(({ data }) => setNotice(data.data.content));
  }, []);

  return (
    <Styled.CommunityContainer>
      <Switch>
        <Route exact path={path}>
          <Styled.CommunityWrapper>
            <Styled.CommunityTitle>공지사항</Styled.CommunityTitle>
            <Grid container className="header">
              <Grid item xs={2.5} sm={1}>
                <Styled.CommunityRow>번호</Styled.CommunityRow>
              </Grid>
              <Grid item xs={6} sm={8}>
                <Styled.CommunityRow>제목</Styled.CommunityRow>
              </Grid>
              <Grid item xs={3.5} sm={3}>
                <Styled.CommunityRow>등록일</Styled.CommunityRow>
              </Grid>
            </Grid>
            {notice &&
              notice.map(({ boardId, boardDate, title }) => (
                <Grid container className="body" key={boardId}>
                  <Grid item xs={2.5} sm={1}>
                    <Styled.CommunityRow>{boardId}</Styled.CommunityRow>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <Styled.CommunityRow>
                      <Link to="community" className="title">
                        {title}
                      </Link>
                    </Styled.CommunityRow>
                  </Grid>
                  <Grid item xs={3.5} sm={3}>
                    <Styled.CommunityRow>
                      <span>{dateFormat2(boardDate)[0]}</span>
                      <span>{dateFormat2(boardDate)[1]}</span>
                    </Styled.CommunityRow>
                  </Grid>
                </Grid>
              ))}
          </Styled.CommunityWrapper>
        </Route>
        <Route path={`${path}/freeboard`} component={FreeBoardList} exact />
        <Route path={`${path}/freeboard/insert`} component={FreeBoardInsert} exact />
        <Route path={`${path}/freeboard/:boardId`} component={FreeBoard} exact />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Styled.CommunityContainer>
  );
};

export default Community;
