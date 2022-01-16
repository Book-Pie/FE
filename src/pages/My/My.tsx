import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Modified from "components/Modified/Modified";
import Withdrawal from "components/Withdrawal/Withdrawal";
import MyProfileTop from "src/components/MyTop/MyTop";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import MyShopList from "src/components/MyShopList/MyShopList";
import MyshopInsert from "src/components/MyShopInsert/MyshopInsert";
import { Container, RouterWrapper, MyMenuWrapper } from "./style";

const My = () => {
  const match = useRouteMatch();
  const myMenus = useMemo(
    () => [
      {
        id: 1,
        text: "판매",
        path: "shop",
      },
      {
        id: 2,
        text: "구매",
        path: "b",
      },
      {
        id: 3,
        text: "찜",
        path: "c",
      },
      {
        id: 4,
        text: "거래 후기",
        path: "d",
      },
      {
        id: 5,
        text: "작성리뷰",
        path: "e",
      },
      {
        id: 6,
        text: "회원정보수정",
        path: "modified",
      },
      {
        id: 7,
        text: "탈퇴하기",
        path: "withdrawal",
      },
    ],
    [],
  );

  return (
    <Container>
      <MyProfileTop />
      <MyMenuWrapper>
        {myMenus.map(({ id, text, path }) => (
          <span key={id}>
            <NavLink to={`${match.path}/${path}`} activeClassName="my__link--active">
              {text}
            </NavLink>
          </span>
        ))}
      </MyMenuWrapper>
      <RouterWrapper>
        <Switch>
          <Route path={`${match.path}/shop`} exact component={MyShopList} />
          <Route path={`${match.path}/shop/insert`} component={MyshopInsert} />
          <Route path={`${match.path}/b`} render={() => <div />} />
          <Route path={`${match.path}/c`} render={() => <div />} />
          <Route path={`${match.path}/d`} render={() => <div />} />
          <Route path={`${match.path}/e`} render={() => <div />} />
          <Route path={`${match.path}/modified`} component={Modified} />
          <Route path={`${match.path}/withdrawal`} component={Withdrawal} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </RouterWrapper>
    </Container>
  );
};

export default My;
