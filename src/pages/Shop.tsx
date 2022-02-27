import { Tab, Tabs } from "@mui/material";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route, Switch, useLocation, useParams } from "react-router-dom";
import ShopTop from "src/components/ShopTop/ShopTop";
import { getMyPageChart, userReviewSelector } from "src/modules/Slices/userReview/userReviewSlice";
import { useTypedSelector } from "src/modules/store";
import FallBack from "./FallBack";
import { MyContainer, MyRouterWrapper, ShopMenuTabWrapper } from "./styles";
import { ShopParam } from "./types";

const ShopSaleList = lazy(() => import("components/ShopMenu/ShopSaleList"));
const ShopBookReview = lazy(() => import("components/ShopMenu/ShopBookReview"));
const ShopUserReview = lazy(() => import("components/ShopMenu/ShopUserReview"));
const Following = lazy(() => import("components/ShopMenu/Following"));
const Follower = lazy(() => import("components/ShopMenu/Follower"));

const Shop = () => {
  const dispatch = useDispatch();
  const { shopId } = useParams<ShopParam>();
  const [value, setValue] = useState(2);
  const { pathname } = useLocation();
  const { myPageChart } = useTypedSelector(userReviewSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const myMenus = useMemo(
    () =>
      [
        {
          id: 1,
          text: "판매 상품",
          fullPath: `/shop/${shopId}/saleList`,
        },
        {
          id: 2,
          text: "작성도서 리뷰",
          fullPath: `/shop/${shopId}/bookReview`,
        },
        {
          id: 3,
          text: "받은 거래 후기",
          fullPath: `/shop/${shopId}/userReview`,
        },
        {
          id: 4,
          text: "팔로잉 ",
          fullPath: `/shop/${shopId}/following`,
        },
        {
          id: 5,
          text: "팔로워 ",
          fullPath: `/shop/${shopId}/follower`,
        },
      ].map(({ id, text, fullPath }) => (
        <Tab
          key={id}
          value={id}
          label={
            <NavLink activeClassName="is-active" to={fullPath}>
              {text}
            </NavLink>
          }
        />
      )),
    [shopId],
  );
  const handleChange = (_: any, newValue: number) => setValue(newValue);

  useEffect(() => {
    dispatch(getMyPageChart(shopId));
  }, [dispatch, shopId]);

  return (
    <MyContainer>
      <ShopTop chart={myPageChart} shopId={shopId} />
      <ShopMenuTabWrapper>
        <Tabs value={value} onChange={handleChange} variant="scrollable" allowScrollButtonsMobile scrollButtons>
          {myMenus}
        </Tabs>
      </ShopMenuTabWrapper>
      <MyRouterWrapper>
        <Suspense fallback={<FallBack />}>
          <Switch>
            <Route path={`/shop/${shopId}/saleList`} exact component={ShopSaleList} />
            <Route path={`/shop/${shopId}/bookReview`} exact component={ShopBookReview} />
            <Route path={`/shop/${shopId}/userReview`} exact component={ShopUserReview} />
            <Route path={`/shop/${shopId}/following`} exact component={Following} />
            <Route path={`/shop/${shopId}/follower`} exact component={Follower} />
            <Route component={ShopBookReview} />
          </Switch>
        </Suspense>
      </MyRouterWrapper>
    </MyContainer>
  );
};

export default Shop;
