import styled from "styled-components";

interface BestSellerProps {
  title: string;
  categoryName: string;
  cover: string;
  bestRank: number;
  link: string;
  index: number;
}

const BestSeller = ({ bestRank, categoryName, title, cover, link, index }: BestSellerProps) => {
  if (index === 0) {
    return (
      <FisrtItemWrapper>
        <a href={link} target="_blank" rel="noreferrer" className="BestSeller__first">
          <div>
            <div className="bestSeller__rank">{`0${bestRank}`}</div>
            <div className="bestSeller__title">{title}</div>
          </div>
          <div className="bestSeller__img">
            <img src={cover} alt={title} />
          </div>
        </a>
      </FisrtItemWrapper>
    );
  }

  return (
    <ItemWrapper>
      <a href={link} target="_blank" rel="noreferrer">
        <TextArea>
          <div className="bestSeller__rank">{`0${bestRank}`}</div>
          <div className="bestSeller__title">{title}</div>
        </TextArea>
        <div className="bestSeller__img">
          <img src={cover} alt={title} />
        </div>
      </a>
    </ItemWrapper>
  );
};

export default BestSeller;

const FisrtItemWrapper = styled.div`
  background-color: ${props => props.theme.colors.mainDarkBrown};
  margin: 10px;
  padding: 15px 10px;
  overflow: hidden;
  height: 100%;
  transition: transform 0.5s ease-in-out;

  .BestSeller__first {
    display: flex;
    padding: 25px 30px;
    height: 100%;
    & > div:first-child {
      width: 160px;
    }
    & > div:last-child {
      width: 200px;
    }
  }
  :hover {
    transform: scale(1.05);
  }

  .bestSeller__rank {
    width: 76px;
    height: 76px;
    background-color: #dd002c;
    color: ${props => props.theme.colors.white};
    border-radius: 50%;
    font-family: NotoSerifDisplay;
    font-size: 40px;
    font-weight: 500;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -1.6px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bestSeller__title {
    height: 250px;
    display: -webkit-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding: 0 15px;
    color: ${props => props.theme.colors.white};
    font-size: 30px;
  }

  .bestSeller__rank + .bestSeller__title {
    margin-top: 15px;
  }
  .bestSeller__img {
    height: 340px;
    width: 150px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
`;

const ItemWrapper = styled.div`
  background-color: #f2f2f2;
  margin: 10px;
  padding: 15px 10px;
  overflow: hidden;
  height: 100%;
  transition: transform 0.5s ease-in-out;

  & > a {
    display: flex;
    & > div:first-child {
      width: 60px;
    }
    & > div:last-child {
      width: 100px;
    }
  }

  :hover {
    transform: scale(1.02);
  }
  .bestSeller__img {
    height: 170px;
    width: 150px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  .bestSeller__rank {
    width: 40px;
    height: 40px;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.mainDarkBrown};
    border-radius: 50%;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -1.2px;
    text-align: center;
  }

  .bestSeller__title {
    height: 120px;
    display: -webkit-box;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding: 0 5px;
  }

  .bestSeller__rank + .bestSeller__title {
    margin-top: 10px;
  }
`;

const TextArea = styled.div``;
