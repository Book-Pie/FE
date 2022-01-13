import { Link, useRouteMatch } from "react-router-dom";

const MyShopList = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <div>판매리스트</div>
      <div>
        <button type="button">
          <Link to={`${path}/insert`}>상품등록</Link>
        </button>
      </div>
    </div>
  );
};

export default MyShopList;
