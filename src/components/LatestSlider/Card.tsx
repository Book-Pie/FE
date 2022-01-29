import { make1000UnitsCommaFormet } from "utils/formatUtil";
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
  const STATE_CLASSNAME_ENUM: Types.StateEnumType = useMemo(
    () => ({
      SALE: "판매 중",
      TRADING: "거래 중",
      SOLD_OUT: "red",
    }),
    [],
  );

  return (
    <Styled.LatestSliderCardWrapper>
      <Link to={`/usedBook/${id}`}>
        <Styled.LatestSliderCardImage>
          <img src={`${process.env.BASE_URL}/image/${image}`} alt="latestImg" />
        </Styled.LatestSliderCardImage>
        <Styled.LatestSliderCardInfo>
          <div className="card__title">{title}</div>
          <div className="card__price">
            <span>판매가 </span>
            <span>{`${make1000UnitsCommaFormet(String(price))}원`}</span>
          </div>
          <div className={`card__state ${STATE_CLASSNAME_ENUM[state]}`}>{STATE_ENUM[state]}</div>
        </Styled.LatestSliderCardInfo>
      </Link>
    </Styled.LatestSliderCardWrapper>
  );
};

export default Card;
