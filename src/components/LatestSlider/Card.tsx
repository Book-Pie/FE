import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import * as Types from "./types";
import * as Styled from "./style";

const Card = ({ id, title, price, image, state }: Types.CardProps) => {
  const STATE_ENUM: Types.StateEnumType = useMemo(
    () => ({
      SALE: "판매 중",
      TRADING: "거래 중",
      SOLD_OUT: "판매 완료",
    }),
    [],
  );

  return (
    <Styled.Wrapper>
      <Link to={`/usedBook/${id}`}>
        <Styled.Image>
          <img src={`${process.env.BASE_URL}/image/${image}`} alt="latestImg" />
        </Styled.Image>
        <Styled.Info>
          <div className="card__title">{title}</div>
          <div className="card__price">{`${make1000UnitsCommaFormet(String(price))}원`}</div>
          <div className="card__state">{STATE_ENUM[state]}</div>
        </Styled.Info>
      </Link>
    </Styled.Wrapper>
  );
};

export default Card;
