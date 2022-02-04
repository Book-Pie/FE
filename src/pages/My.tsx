import { Route, Switch, useRouteMatch } from "react-router";
import MyTop from "components/MyTop/MyTop";
import { NavLink } from "react-router-dom";
import { lazy, Suspense, useMemo, useState } from "react";
import RootRedirect from "src/router/RootRedirect";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Loading from "src/elements/Loading";
import * as Styled from "./styles";

const Point = lazy(() => import("components/Point/Point"));
const SaleList = lazy(() => import("components/SaleList/SaleList"));
const SaleInsert = lazy(() => import("components/SaleInsert/SaleInsert"));
const SaleInfo = lazy(() => import("components/SaleInfo/SaleInfo"));
const BuyList = lazy(() => import("components/BuyList/BuyList"));
const UsedBookLikeList = lazy(() => import("src/components/UsedBookLikeList/UsedBookLikeList"));
const UserReview = lazy(() => import("components/UserReview/UserReview"));
const MyReview = lazy(() => import("components/MyReview/MyReview"));
const Modified = lazy(() => import("components/Modified/Modified"));
const Withdrawal = lazy(() => import("components/Withdrawal/Withdrawal"));
const BuyInfo = lazy(() => import("components/BuyInfo/BuyInfo"));

const My = () => {
  const { path } = useRouteMatch();
  const [value, setValue] = useState(6);

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
  const handleChange = (_: any, newValue: number) => setValue(newValue);

  return (
    <Styled.MyContainer>
      <MyTop />
      <Styled.MyMenuTabWrapper>
        <Tabs value={value} onChange={handleChange} variant="scrollable" allowScrollButtonsMobile scrollButtons>
          {myMenus}
        </Tabs>
      </Styled.MyMenuTabWrapper>
      <Styled.MyRouterWrapper>
        <Suspense fallback={<Loading isLoading />}>
          <Switch>
            <Route path={`${path}/point`} exact component={Point} />
            <Route path={`${path}/sale`} exact component={SaleList} />
            <Route path={[`${path}/sale/insert/:bookId`, `${path}/sale/insert`]} component={SaleInsert} />
            <Route path={`${path}/sale/:bookId`} component={SaleInfo} />
            <Route path={`${path}/buy`} component={BuyList} exact />
            <Route path={`${path}/buy/:orderId`} component={BuyInfo} />
            <Route path={`${path}/like`} component={UsedBookLikeList} />
            <Route path={`${path}/userReview`} component={UserReview} />
            <Route path={`${path}/review`} component={MyReview} />
            <Route path={`${path}/modified`} component={Modified} />
            <Route path={`${path}/withdrawal`} component={Withdrawal} />
            <Route path="*" component={RootRedirect} />
          </Switch>
        </Suspense>
      </Styled.MyRouterWrapper>
    </Styled.MyContainer>
  );
};

export default My;
