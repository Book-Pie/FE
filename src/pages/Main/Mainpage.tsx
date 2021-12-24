import Footer from "src/components/Main/Footer";
import ThumbnailSlider from "src/components/Main/ThumbnailSlider";
import styled from "styled-components";

import BannerSlider from "../../components/Main/BannerSlider";

const Mainpage = () => {
  return (
    <>
      <Container>
        <BannerSlider />
        <h3>중고상품추천</h3>
        <ThumbnailSlider />
        <h3>베스트셀러</h3>
        <ThumbnailSlider />
        <h3>인기 태그</h3>
        <ThumbnailSlider />
        <h3>최신 등록 상품</h3>
        <ThumbnailSlider />
      </Container>
      <Footer />
    </>
  );
};

export default Mainpage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
