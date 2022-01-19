import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Modified from "components/Modified/Modified";
import Withdrawal from "components/Withdrawal/Withdrawal";
import MyProfileTop from "src/components/MyTop/MyTop";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import SaleList from "src/components/SaleList/SaleList";
import SaleInsert from "src/components/SaleInsert/SaleInsert";
import BuyInfo from "src/components/BuyInfo/BuyInfo";
import SaleInfo from "src/components/SaleInfo/SaleInfo";
import BookLikeList from "src/components/UsedBookLike/BookLikeList";
import { Container, RouterWrapper, MyMenuWrapper } from "./style";

const My = () => {
  const { path } = useRouteMatch();
  const myMenus = useMemo(
    () => [
      {
        id: 1,
        text: "판매",
        endPoint: "sale",
      },
      {
        id: 2,
        text: "구매",
        endPoint: "buy",
      },
      {
        id: 3,
        text: "찜",
        endPoint: "like",
      },
      {
        id: 4,
        text: "거래 후기",
        endPoint: "d",
      },
      {
        id: 5,
        text: "작성리뷰",
        endPoint: "e",
      },
      {
        id: 6,
        text: "회원정보수정",
        endPoint: "modified",
      },
      {
        id: 7,
        text: "탈퇴하기",
        endPoint: "withdrawal",
      },
    ],
    [],
  );

  return (
    <Container>
      <MyProfileTop />
      <MyMenuWrapper>
        {myMenus.map(({ id, text, endPoint }) => (
          <span key={id}>
            <NavLink to={`${path}/${endPoint}`} activeClassName="my__link--active">
              {text}
            </NavLink>
          </span>
        ))}
      </MyMenuWrapper>
      <RouterWrapper>
        <Switch>
          <Route path={`${path}/sale`} exact component={SaleList} />
          <Route path={`${path}/sale/insert`} component={SaleInsert} />
          <Route path={`${path}/sale/:bookId`} component={SaleInfo} />
          <Route path={`${path}/buy`} render={() => <div />} exact />
          <Route path={`${path}/buy/:orderId`} component={BuyInfo} />
          <Route path={`${path}/like`} component={BookLikeList} />
          <Route path={`${path}/d`} render={() => <div />} />
          <Route path={`${path}/e`} render={() => <div />} />
          <Route path={`${path}/modified`} component={Modified} />
          <Route path={`${path}/withdrawal`} component={Withdrawal} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </RouterWrapper>
    </Container>
  );
};

export default My;
