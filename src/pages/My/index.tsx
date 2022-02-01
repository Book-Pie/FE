import { Route, Switch, useRouteMatch } from "react-router";
import Modified from "components/Modified/Modified";
import Withdrawal from "components/Withdrawal/Withdrawal";
import MyTop from "components/MyTop/MyTop";
import { NavLink } from "react-router-dom";
import { useMemo, useState } from "react";
import SaleList from "components/SaleList/SaleList";
import SaleInsert from "components/SaleInsert/SaleInsert";
import BuyInfo from "components/BuyInfo/BuyInfo";
import SaleInfo from "components/SaleInfo/SaleInfo";
import BookLikeList from "components/UsedBookLike/BookLikeList";
import BuyList from "components/BuyList/BuyList";
import UserReview from "components/UserReview/UserReview";
import MyReview from "components/MyReview/MyReview";
import Point from "components/Point/Point";
import RootRedirect from "src/router/RootRedirect";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as Styled from "./style";

const My = () => {
  const { path } = useRouteMatch();
  const [value, setValue] = useState(1);

  const handleChange = (_: any, newValue: number) => setValue(newValue);

  const myMenus = useMemo(
    () =>
      [
        {
          id: 1,
          text: "판매",
          fullPath: `${path}/sale`,
        },
        {
          id: 2,
          text: "구매",
          fullPath: `${path}/buy`,
        },
        {
          id: 3,
          text: "찜",
          fullPath: `${path}/like`,
        },
        {
          id: 4,
          text: "거래 후기",
          fullPath: `${path}/userReview`,
        },
        {
          id: 5,
          text: "작성리뷰",
          fullPath: `${path}/review`,
        },
        {
          id: 6,
          text: "회원정보수정",
          fullPath: `${path}/modified`,
        },
        {
          id: 7,
          text: "탈퇴하기",
          fullPath: `${path}/withdrawal`,
        },
      ].map(({ id, text, fullPath }) => (
        <Tab
          key={id}
          value={id}
          label={
            <NavLink to={fullPath} activeClassName="active">
              {text}
            </NavLink>
          }
        />
      )),
    [path],
  );

  return (
    <Styled.MyContainer>
      <MyTop />
      <Styled.MyMenuTabWrapper>
        <Tabs value={value} onChange={handleChange} variant="scrollable" allowScrollButtonsMobile scrollButtons>
          {myMenus}
        </Tabs>
      </Styled.MyMenuTabWrapper>
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
          <Route path="*" component={RootRedirect} />
        </Switch>
      </Styled.MyRouterWrapper>
    </Styled.MyContainer>
  );
};

export default My;
