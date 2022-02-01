import LatestSlider from "components/LatestSlider/LatestSlider";
import MainBanner from "components/MainBanner/MainBanner";
import BestSeller from "components/BestSeller/BestSeller";
import * as Styled from "./styles";

const Main = () => {
  return (
    <main>
      <MainBanner />
      <Styled.MainSection>
        <Styled.Text>베스트셀러</Styled.Text>
        <BestSeller />
        <Styled.Text>최신등록상품</Styled.Text>
        <LatestSlider />
      </Styled.MainSection>
    </main>
  );
};

export default Main;
