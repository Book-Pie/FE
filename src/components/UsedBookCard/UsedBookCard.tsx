import { memo } from "react";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { Link } from "react-router-dom";
import { UsedBookCardProps } from "./types";
import { Wrapper, EmptyWrapper } from "./style";

const UsedBookCard = ({ card }: UsedBookCardProps) => {
  const { id, image, price, title } = card;

  if (Object.keys(card).length) {
    return (
      <Wrapper>
        <Link to={`/usedBook/${id}`}>
          <div className="usedBookCard__imgBox">
            <img src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
          </div>
          <div className="usedBookCard__cotent">
            <div className="usedBookCard__title">{title}</div>
            <div className="usedBookCard__price">
              <strong>판매가</strong>
              <span>:</span>
              <span> {make1000UnitsCommaFormet(`${price}`)}원</span>
            </div>
          </div>
        </Link>
      </Wrapper>
    );
  }
  return <EmptyWrapper />;
};

export default memo(UsedBookCard);
