import { memo } from "react";
import { Link } from "react-router-dom";
import * as Styled from "./style";
import * as Types from "./types";

const Card = ({ bestRank, title, cover, index, isbn13 }: Types.CardProps) => {
  if (index === 0) {
    return (
      <Styled.FirstCardWrapper>
        <Link to={`/book/${isbn13}`}>
          <div>
            <div className="card__rank">{`0${bestRank}`}</div>
            <div className="card__title">{title}</div>
          </div>
          <div>
            <img className="card__img" src={cover} alt={title} />
          </div>
        </Link>
      </Styled.FirstCardWrapper>
    );
  }

  return (
    <Styled.CardWrapper>
      <Link to={`/book/${isbn13}`}>
        <div>
          <div className="card__rank">{`0${bestRank}`}</div>
          <div className="card__title">{title}</div>
        </div>
        <div>
          <img className="card__img" src={cover} alt={title} />
        </div>
      </Link>
    </Styled.CardWrapper>
  );
};

export default memo(Card);
