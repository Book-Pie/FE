import { useCallback, useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { getUsedBook } from "src/api/usedBook/usedBook";
import OrderResult from "src/components/OrderForm/OrderResult";
import OrderForm from "src/components/OrderForm/OrderForm";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { getUsedBookOrder, removeUsedBookOrder, setUsedBookOrder } from "src/utils/localStorageUtil";
import useSignIn from "src/hooks/useSignIn";
import { Empty, Header, Wrapper } from "./style";
import * as Types from "./types";

const init: Types.IUsedBook = {
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
  const { id } = useParams<Types.IParam>();
  const [usedBook, setUsedBook] = useState<Types.IUsedBook>(() => {
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
    const { data } = await getUsedBook<Types.AxiosResponse>(id);
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

  if (saleState === "SOLD_OUT") {
    alert("판매 완료된 물품입니다.");
    window.location.replace(`/usedBook/${id}`);
    return <Empty />;
  }
  if (usedBook.sellerId === user?.id) {
    alert("자기 자신 물품을 구매 할 수 없습니다.");
    window.location.replace(`/usedBook/${id}`);
    return <Empty />;
  }

  if (saleState === "TRADING") {
    alert("거래가 진행 중인 물품입니다.");
    window.location.replace(`/usedBook/${id}`);
    return <Empty />;
  }
  if (!usedBook.usedBookId) return <Empty />;

  return (
    <Wrapper>
      <Switch>
        <Route path={`${path}/result`} component={OrderResult} />
        <Route path={path}>
          <Header>
            <p>택배거래, 안전결제로 구매합니다.</p>
            <div className="header__info">
              <div className="header__img">
                <Link to={`/usedBook/${id}`}>
                  {images.length !== 0 && <img src={`${process.env.BASE_URL}/image/${images[0]}`} alt="usedBookimg" />}
                </Link>
              </div>
              <div className="header__text">
                <p>가격 : {`${make1000UnitsCommaFormet(String(price))}원`}</p>
                <p>제목 : {title}</p>
              </div>
            </div>
          </Header>
          <OrderForm usedBook={usedBook} />
        </Route>
      </Switch>
    </Wrapper>
  );
};

export default Order;
