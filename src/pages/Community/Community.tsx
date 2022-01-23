import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import http from "src/api/http";
import FreeBoard from "src/components/FreeBoard/FreeBoard";
import FreeBoardInsert from "src/components/FreeBoardInsert/FreeBoardInsert";
import FreeBoardList from "src/components/FreeBoardList/FreeBoardList";
import { Content } from "src/modules/Slices/freeBoard/types";
import { dateFormat2 } from "src/utils/formatUtil";
import { Row } from "src/components/FreeBoardList/style";
import { Wrapper, Title, List } from "./style";

const Community = () => {
  const { path } = useRouteMatch();
  const [notice, setNotice] = useState<Content[]>();
  useEffect(() => {
    http.get("/board/getAll?boardType=NOTICE&page=0&size=20").then(({ data }) => {
      setNotice(data.data.content);
    });
  }, []);

  return (
    <Switch>
      <Route
        exact
        path={path}
        render={() => (
          <Wrapper>
            <Title>공지사항</Title>
            <List>
              <div className="left">
                <Link to="community">
                  <p>공지사항</p>
                </Link>
                <Link to="community/freeboard">
                  <p>자유게시판</p>
                </Link>
                <p>책사고팝니다.</p>
              </div>
              <Row>
                <div className="header">
                  <span>번호</span>
                  <span>제목</span>
                  <span>날짜</span>
                </div>
                {notice?.map(notice => {
                  const { boardId, boardDate, title } = notice;
                  return (
                    <div key={boardId}>
                      <span>{boardId}</span>
                      <span>
                        <Link to="community">{title}</Link>
                      </span>
                      <span>{dateFormat2(boardDate)[0]}</span>
                    </div>
                  );
                })}
              </Row>
            </List>
          </Wrapper>
        )}
      />
      <Route path={`${path}/freeboard`} component={FreeBoardList} exact />
      <Route path={`${path}/freeboard/insert`} component={FreeBoardInsert} exact />
      <Route path={`${path}/freeboard/:boardId`} component={FreeBoard} exact />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Community;
