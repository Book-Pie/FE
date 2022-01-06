import { memo } from "react";
import { make1000UnitsCommaFormet } from "utils/formetUtil";
import { Link } from "react-router-dom";
import { UsedBookContentProps } from "./types";
import { Wrapper } from "./style";

// 디자인이 나오면 수정
const UsedBookContent = ({ page }: UsedBookContentProps) => {
  return (
    <Wrapper>
      <Link to={`/usedBook/${page.id}`}>
        <div className="usedBookContent__imgBox">
          <img src="https://picsum.photos/200/300" alt="usedBookImg" className="usedBookContent__img" />
        </div>
        <div className="usedBookContent__cotent">
          <div className="usedBookContent__title">{page.title}</div>
          <div className="usedBookContent__price">
            <strong>가격</strong> : <span>{make1000UnitsCommaFormet(`${page.price}`)}원</span>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
};

export default memo(UsedBookContent);
