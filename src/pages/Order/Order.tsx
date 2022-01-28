import { useCallback, useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { getUsedBook } from "src/api/usedBook/usedBook";
import OrderResult from "src/components/OrderForm/OrderResult";
import OrderForm from "src/components/OrderForm/OrderForm";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { getUsedBookOrder, removeUsedBookOrder, setUsedBookOrder } from "src/utils/localStorageUtil";
import useSignIn from "src/hooks/useSignIn";
import * as Styled from "./style";
import * as Types from "./types";

const init: Types.UsedBook = {
  bookState: "",
  content: "",
  fstCategory: "",
  images: [],
  modifiedDate: "",
  price: 0,
  saleState: "SALE",
  sellerId: 0,
  sellerName: "",
  sndCategory: "",
  tags: [],
  title: "",
  uploadDate: "",
  usedBookId: 0,
  view: 0,
};

const Order = () => {
  const { id } = useParams<Types.Param>();
  const [usedBook, setUsedBook] = useState<Types.UsedBook>(() => {
    const info = getUsedBookOrder();
    if (info) return info;
    return init;
  });
  const {
    signIn: { user },
  } = useSignIn();
  const { path } = useRouteMatch();
  const { images, price, title, saleState } = usedBook;

  const handleUsedBookLoad = useCallback(async () => {
    const { data } = await getUsedBook<Types.Response>(id);
    setUsedBookOrder(JSON.stringify(data.data));
    setUsedBook(data.data);
  }, [id]);

  useEffect(() => {
    handleUsedBookLoad();
    const beforeunload = () => removeUsedBookOrder();
    window.addEventListener("beforeunload", beforeunload);
    return () => {
      removeUsedBookOrder();
      window.removeEventListener("beforeunload", beforeunload);
    };
  }, [handleUsedBookLoad]);

  useEffect(() => {
    if (saleState === "SOLD_OUT") {
      alert("판매 완료된 물품입니다.");
      window.location.replace(`/usedBook/${id}`);
      return;
    }
    if (saleState === "TRADING") {
      alert("거래 중인 물품입니다.");
      window.location.replace(`/usedBook/${id}`);
      return;
    }
    if (usedBook.sellerId === user?.id) {
      alert("자기 자신 물품을 구매 할 수 없습니다.");
      window.location.replace(`/usedBook/${id}`);
    }
  }, [saleState, usedBook, user, id]);

  if (!usedBook.usedBookId || saleState === "SOLD_OUT" || saleState === "TRADING" || usedBook.sellerId === user?.id) {
    return <Styled.Empty />;
  }

  return (
    <Styled.OrderWrapper>
      <Switch>
        <Route path={`${path}/result`} component={OrderResult} />
        <Route path={path}>
          <Styled.OrderHeader>
            <p>택배거래, 안전결제로 구매합니다.</p>
            <div className="header__info">
              <Link to={`/usedBook/${id}`}>
                {images.length !== 0 && (
                  <img className="header__img" src={`${process.env.BASE_URL}/image/${images[0]}`} alt="usedBookimg" />
                )}
              </Link>
              <div className="header__text">
                <p>가격</p>
                <p>{`${make1000UnitsCommaFormet(String(price))}원`}</p>
                <p>판매도서명</p>
                <p>{title}</p>
              </div>
            </div>
          </Styled.OrderHeader>
          <OrderForm usedBook={usedBook} />
        </Route>
      </Switch>
    </Styled.OrderWrapper>
  );
};

export default Order;
