import LatestSlider from "components/LatestSlider/LatestSlider";
import MainBanner from "src/components/MainBanner/MainBanner";
import BestSeller from "components/BestSeller/BestSeller";
import * as Styled from "./style";

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
