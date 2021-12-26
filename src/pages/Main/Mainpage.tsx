import ThumbnailSlider from "src/components/Main/ThumbnailSlider";
import styled from "styled-components";
import BannerSlider from "../../components/Main/BannerSlider";

const Mainpage = () => {
  return <BannerSlider />;
};

export default Mainpage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
