import { memo } from "react";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { Link } from "react-router-dom";
import { UsedBookCardProps } from "./types";
import { Wrapper } from "./style";

// 디자인이 나오면 수정
const UsedBookCard = ({ page }: UsedBookCardProps) => {
  return (
    <Wrapper>
      <Link to={`/usedBook/${page.id}`}>
        <div className="usedBookCard__imgBox">
          <img src="https://picsum.photos/200/300" alt="usedBookImg" className="usedBookCard__img" />
        </div>
        <div className="usedBookCard__cotent">
          <div className="usedBookCard__title">{page.title}</div>
          <div className="usedBookCard__price">
            <strong>가격</strong> : <span>{make1000UnitsCommaFormet(`${page.price}`)}원</span>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
};

export default memo(UsedBookCard);
