import styled from "styled-components";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { images } from "../../assets/image-data";

SwiperCore.use([Navigation, Pagination]);

const BannerSlider = () => {
  return (
    <Swiper
      navigation={true}
      pagination={{ clickable: true }}
      spaceBetween={5}
      slidesPerView={3}
      slidesPerGroup={3}
      loop={true}
      loopFillGroupWithBlank={true}
    >
      <SwiperSlide>
        <SlierBox>test1</SlierBox>
      </SwiperSlide>
      <SwiperSlide>
        <SlierBox>test2</SlierBox>
      </SwiperSlide>
      <SwiperSlide>
        <SlierBox>test3</SlierBox>
      </SwiperSlide>
      <SwiperSlide>
        <SlierBox>test4</SlierBox>
      </SwiperSlide>
      <SwiperSlide>
        <SlierBox>test5</SlierBox>
      </SwiperSlide>
      <SwiperSlide>
        <SlierBox>test6</SlierBox>
      </SwiperSlide>
    </Swiper>
  );
};

export default BannerSlider;

const SlierBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: pink;
`;
