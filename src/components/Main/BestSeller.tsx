import Text from "src/elements/Text";
import { theme } from "src/utils/theme";
import styled from "styled-components";

interface BestSellerProps {
  itemId: number;
  title: string;
  categoryName: string;
  cover: string;
  bestRank: number;
}

const BestSeller = ({ bestRank, categoryName, title, cover, itemId }: BestSellerProps) => {
  return (
    <ItemWrapper>
      <TextArea>
        <div>
          <Text fontSize="20px" color={theme.colors.white} lineHeight="1.3">
            {bestRank}
          </Text>
        </div>

        <Text width="60px" fontSize="15px" margin="12px 0px 0px 0px">
          {title}
        </Text>
        <Text color={theme.colors.DarkGrey}>{categoryName}</Text>
      </TextArea>
      <img src={cover} alt={title} />
    </ItemWrapper>
  );
};

export default BestSeller;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  div {
    width: 51px;
    height: 51px;
    background-color: ${theme.colors.mainDarkBrown};
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ItemWrapper = styled.div`
  background-color: ${theme.colors.mainLightBrown};
  display: flex;
  padding: 20px;
  img {
    height: 210px;
  }
`;
