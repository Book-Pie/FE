import { Link } from "react-router-dom";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import * as Styled from "./styles";
import * as Types from "./types";

const UsedbookInfo = ({ resource }: Types.UsedbookInfoProps) => {
  const { data } = resource.read();

  return (
    <Styled.UsedBookInfoWrapper>
      <div>
        <Link to={`/usedBook/${data.usedBookId}`}>
          <img src={`${process.env.BASE_URL}/image/${data.images[0]}`} alt="usedbookimg" />
        </Link>
      </div>
      <div>
        <div>문의 중입니다.</div>
        <p>판매 명</p>
        <p>{data.title}</p>
        <p>가격</p>
        <p>{make1000UnitsCommaFormet(data.price)}원</p>
        <p>판매자</p>
        <p>{data.sellerName}</p>
      </div>
    </Styled.UsedBookInfoWrapper>
  );
};

export default UsedbookInfo;
