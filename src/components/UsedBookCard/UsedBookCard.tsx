import { memo } from "react";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { Link } from "react-router-dom";
import { StateEnumType, UsedBookCardProps } from "./types";
import { Wrapper, EmptyWrapper } from "./style";

const STATE_ENUM: StateEnumType = {
  SALE: "판매 중",
  SOLD_OUT: "판매완료",
  TRADING: "거래 중",
};

const UsedBookCard = ({ card, width }: UsedBookCardProps) => {
  const { id, image, price, title, state } = card;

  return Object.keys(card).length ? (
    <Wrapper width={width}>
      <Link to={`/usedBook/${id}`}>
        <div className="usedBookCard__imgBox">
          <img src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
        </div>
        <div className="usedBookCard__content">
          <div className="usedBookCard__title">{title}</div>
          <div className="usedBookCard__price">
            <strong>판매가</strong>
            <span>:</span>
            <span> {make1000UnitsCommaFormet(`${price}`)}원</span>
          </div>
          <div className="usedBookCard__state">{STATE_ENUM[state]}</div>
        </div>
      </Link>
    </Wrapper>
  ) : (
    <EmptyWrapper />
  );
};

UsedBookCard.defaultProps = {
  width: 20,
};
export default memo(UsedBookCard);
