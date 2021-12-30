import Text from "src/elements/Text";
import { theme } from "src/utils/theme";
import styled from "styled-components";

interface BestSellerProps {
  bestRank: string;
  categoryName: string;
  title: string;
}

const BestSeller = ({ bestRank, categoryName, title }: BestSellerProps) => {
  return (
    <div>
      <ItemWrapper>
        <TextArea>
          <div>
            <Text fontSize="30px" color={theme.colors.white} lineHeight="1.3">
              02
            </Text>
          </div>
          <Text fontSize="20px" margin="12px 0px 0px 0px">
            이것은 누구의 이갸이인가
          </Text>
          <Text color={theme.colors.DarkGrey}>#소설</Text>
        </TextArea>

        <img src="https://img.ridicdn.net/cover/745000167/xxlarge?dpi=xxhdpi#1" alt="bookimg" />
      </ItemWrapper>
    </div>
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
  width: 250px;
  height: 250px;
  background-color: ${theme.colors.mainLightBrown};
  display: flex;
  padding: 20px;
  img {
    height: 210px;
  }
`;
