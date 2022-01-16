import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { Link } from "react-router-dom";
import { CardProps, StateEnumType } from "./type";
import { Image, Info, Wrapper } from "./style";

const STATE_ENUM: StateEnumType = {
  SALE: "판매 중",
  TRADING: "거래 중",
  SOLE_OUT: "판매 완료",
};

const Card = ({ id, title, price, image, state }: CardProps) => {
  return (
    <Wrapper>
      <Link to={`/usedBook/$${id}`}>
        <Image>
          <img src={`${process.env.BASE_URL}/image/${image}`} alt="latestImg" />
        </Image>
        <Info>
          <div className="card__title">{title}</div>
          <div className="card__price">{`${make1000UnitsCommaFormet(String(price))}원`}</div>
          <div className="card__state">{STATE_ENUM[state]}</div>
        </Info>
      </Link>
    </Wrapper>
  );
};

export default Card;
