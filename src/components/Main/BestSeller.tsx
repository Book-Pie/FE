import { Link } from "react-router-dom";
import { FlexWrapper } from "src/pages/BookDetail/style";
import { FisrtItemWrapper, ItemWrapper, TextArea } from "./styles";
import { BestSellerProps } from "./types";

const BestSeller = ({ bestRank, title, cover, index, isbn13 }: BestSellerProps) => {
  if (index === 0) {
    return (
      <FisrtItemWrapper>
        <Link to={`/book/${isbn13}`}>
          <div className="BestSeller__first">
            <div>
              <div className="bestSeller__rank">{`0${bestRank}`}</div>
              <div className="bestSeller__title">{title}</div>
            </div>
            <div className="bestSeller__img">
              <img src={cover} alt={title} />
            </div>
          </div>
        </Link>
      </FisrtItemWrapper>
    );
  }

  return (
    <ItemWrapper>
      <Link to={`/book/${isbn13}`}>
        <FlexWrapper>
          <TextArea>
            <div className="bestSeller__rank">{`0${bestRank}`}</div>
            <div className="bestSeller__title">{title}</div>
          </TextArea>
          <div className="bestSeller__img">
            <img src={cover} alt={title} />
          </div>
        </FlexWrapper>
      </Link>
    </ItemWrapper>
  );
};

export default BestSeller;
