import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import * as Styled from "./styles";

const UsedbookInfo = ({ resource }: { resource: any }) => {
  const { data } = resource?.read() ?? {};

  return (
    <Styled.UsedBookInfoWrapper>
      <div>
        <img src={`${process.env.BASE_URL}/image/${data.images[0]}`} alt="usedbookimg" />
      </div>
      <div>
        <div>문의 중입니다.</div>
        <p>판매 명</p> <p>{data.title}</p>
        <p>가격</p> <p>{make1000UnitsCommaFormet(data.price)}원</p>
        <p>판매자</p> <p>{data.sellerName}</p>
      </div>
    </Styled.UsedBookInfoWrapper>
  );
};

export default UsedbookInfo;
