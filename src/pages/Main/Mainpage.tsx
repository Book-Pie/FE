import BestSeller from "src/components/Main/BestSeller";
import ThumbnailSlider from "src/components/Main/ThumbnailSlider";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { getBookData } from "src/api/bookAPI";
import BannerSlider from "../../components/Main/BannerSlider";

const Mainpage = () => {
  useEffect(() => {
    getBookData();
  }, []);

  return (
    <>
      <BannerSlider />
      <h2>베스트셀러</h2>
      <BestSeller />
      {/* <ThumbnailSlider /> */}
    </>
  );
};

export default Mainpage;
