import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Modified from "components/Modified/Modified";
import Withdrawal from "components/Withdrawal/Withdrawal";
import MyTop from "components/MyTop/MyTop";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import SaleList from "components/SaleList/SaleList";
import SaleInsert from "components/SaleInsert/SaleInsert";
import BuyInfo from "components/BuyInfo/BuyInfo";
import SaleInfo from "components/SaleInfo/SaleInfo";
import BookLikeList from "components/UsedBookLike/BookLikeList";
import BuyList from "components/BuyList/BuyList";
import UserReview from "components/UserReview/UserReview";
import MyReview from "components/MyReview/MyReview";
import Point from "components/Point/Point";
import SaleUpdate from "src/components/SaleUpdate/SaleUpdate";
import * as Styled from "./style";

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
        endPoint: "userReview",
      },
      {
        id: 5,
        text: "작성리뷰",
        endPoint: "review",
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
    <Styled.MyContainer>
      <MyTop />
      <Styled.MyMenuWrapper>
        {myMenus.map(({ id, text, endPoint }) => (
          <span key={id}>
            <NavLink to={`${path}/${endPoint}`} activeClassName="my__link--active">
              {text}
            </NavLink>
          </span>
        ))}
      </Styled.MyMenuWrapper>
      <Styled.MyRouterWrapper>
        <Switch>
          <Route path={`${path}/point`} exact component={Point} />
          <Route path={`${path}/sale`} exact component={SaleList} />
          <Route path={[`${path}/sale/insert/:bookId`, `${path}/sale/insert`]} component={SaleInsert} />
          <Route path={`${path}/sale/:bookId`} component={SaleInfo} />
          <Route path={`${path}/buy`} component={BuyList} exact />
          <Route path={`${path}/buy/:orderId`} component={BuyInfo} />
          <Route path={`${path}/like`} component={BookLikeList} />
          <Route path={`${path}/userReview`} component={UserReview} />
          <Route path={`${path}/review`} component={MyReview} />
          <Route path={`${path}/modified`} component={Modified} />
          <Route path={`${path}/withdrawal`} component={Withdrawal} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Styled.MyRouterWrapper>
    </Styled.MyContainer>
  );
};

export default My;
