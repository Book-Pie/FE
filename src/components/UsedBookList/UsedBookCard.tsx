import { memo } from "react";
import { make1000UnitsCommaFormet } from "utils/formatUtil";
import { Link } from "react-router-dom";
import * as Types from "./types";
import * as Styled from "./style";

const STATE_ENUM: Types.StateEnumType = {
  SALE: "판매 중",
  SOLD_OUT: "판매완료",
  TRADING: "거래 중",
};

const UsedBookCard = ({ card, width }: Types.UsedBookCardProps) => {
  const { id, image, price, title, state } = card;

  return (
    <Styled.UsedBookCardWrapper width={width}>
      <Link to={`/usedBook/${id}`}>
        <div className="usedBookCard__imgBox">
          <img src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
        </div>
        <div className="usedBookCard__content">
          <p className="usedBookCard__title">{title}</p>
          <div className="usedBookCard__price">
            <strong>판매가</strong>
            <span>:</span>
            <span> {make1000UnitsCommaFormet(`${price}`)}원</span>
          </div>
          <p className={`${state === "SOLD_OUT" ? "red" : ""} usedBookCard__state`}>{STATE_ENUM[state]}</p>
        </div>
      </Link>
    </Styled.UsedBookCardWrapper>
  );
};

UsedBookCard.defaultProps = {
  width: 20,
};
export default memo(UsedBookCard);
