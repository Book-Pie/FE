import ThumbnailSlider from "src/components/Main/ThumbnailSlider";
import styled from "styled-components";
import BannerSlider from "../../components/Main/BannerSlider";

const Mainpage = () => {
  return (
    <>
      <BannerSlider />
      <h2>중고상품 추천</h2>
      <ThumbnailSlider />
    </>
  );
};

export default Mainpage;
