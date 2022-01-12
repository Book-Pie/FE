import Text from "src/elements/Text";
import styled from "styled-components";

interface BestSellerProps {
  title: string;
  categoryName: string;
  cover: string;
  bestRank: number;
  link: string;
}

const BestSeller = ({ bestRank, categoryName, title, cover, link }: BestSellerProps) => {
  return (
    <ItemWrapper>
      <a href={link} target="_blank" rel="noreferrer">
        <TextArea>
          <div className="bestSeller__title">
            <div>{bestRank}</div>
            <div>{title}</div>
          </div>
          <div className="bestSeller__category">
            <p>카테고리</p>
            <Text>{categoryName}</Text>
          </div>
        </TextArea>
        <ImgWrapper>
          <img src={cover} alt={title} />
        </ImgWrapper>
      </a>
    </ItemWrapper>
  );
};

export default BestSeller;

const ItemWrapper = styled.div`
  background-color: ${props => props.theme.colors.mainLightBrown};
  margin: 10px;
  padding: 15px 20px;
  overflow: hidden;
  border-radius: 5px;
  height: 100%;
  ${props => props.theme.shadow[30]};
  transition: transform 0.5s ease-in-out;

  :hover {
    transform: scale(1.05);
  }
`;

const TextArea = styled.div`
  .bestSeller__title {
    display: flex;
    align-items: center;
    gap: 10px;
    & > div:first-child {
      ${props => props.theme.shadow[30]};
      width: 25px;
      height: 25px;
      padding: 15px;
      background-color: ${props => props.theme.colors.mainDarkBrown};
      color: ${props => props.theme.colors.white};
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
    }
    & > div:last-child {
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1.5rem;
    }
  }
  .bestSeller__category {
    padding: 1rem 0;
    & > p :first-child {
      font-size: 1.5rem;
      color: ${props => props.theme.colors.mainDarkBrown};
    }
    & > p :last-child {
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p + p {
      margin-top: 0.5rem;
    }
  }
`;

export const ImgWrapper = styled.div`
  height: 150px;
  width: 150px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;
