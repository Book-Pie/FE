import styled from "styled-components";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { theme } from "src/utils/theme";
import { images } from "../../assets/image-data";
import "./BannerSlider.css";

SwiperCore.use([Navigation, Pagination]);

const BannerSlider = () => {
  return (
    <Swiper navigation={true} pagination={{ clickable: true }} slidesPerView={1} loop={true} className="">
      {images.map((image: any, index: any) => (
        <SwiperSlide key={index}>
          <SlierBox>
            <BannerImage src={image} />
          </SlierBox>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;

const SlierBox = styled.div`
  width: 100%;
  max-width: 1920px;
  height: 600px;
  background-color: ${theme.colors.mainDarkBrown};
  &:hover {
    cursor: pointer;
  }
`;

const BannerImage = styled.img`
  display: block;
  margin: 0 auto;
  height: 100%;
  width: 100%;
`;
