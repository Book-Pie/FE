import styled from "styled-components";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper";

SwiperCore.use([Navigation, Pagination]);

const BannerSlider = () => {
  return (
    <Swiper navigation={true} pagination={{ clickable: true }} slidesPerView={1} loop={true}>
      <SwiperSlide>
        <SlierBox>
          <BannerImage
            src="https://kream-phinf.pstatic.net/MjAyMDExMjNfMjU0/MDAxNjA2MTAxMjMwOTg2.Lru1_LSFReeOGavo_Nv5iHAHEQDrgcRVuUDO_VwQbL0g.if4WbmNvghR7rUXR_MxttP9QrAVnboaK1IAxnaF0d6kg.JPEG/p_e1a64ddc68fe4c16b7e2390ee5daa6f4.jpg?type=m_2560"
            alt="image-1"
          />
        </SlierBox>
      </SwiperSlide>
      <SwiperSlide>
        <SlierBox>
          <BannerImage
            src="https://kream-phinf.pstatic.net/MjAyMTEyMDdfMTU0/MDAxNjM4ODgwMDMyMjI2.XonWMx2eKhIFgcBpvCm5JIfK2Wkl6-sbSbRUF6bytPog.zAodLezypZaRNufKxRzFZA9VE-M66KmX1QpYJRJw-yQg.JPEG/a_371b274f8674498ea4b03680f7be39cd.jpg?type=m_2560"
            alt="image-2"
            width={100}
          />
        </SlierBox>
      </SwiperSlide>
    </Swiper>
  );
};

export default BannerSlider;

const SlierBox = styled.div`
  width: 100%;
  height: 35vh;
  max-height: 480px;
  background-color: rgb(249, 249, 249);
  &:hover {
    cursor: pointer;
  }
`;

const BannerImage = styled.img`
  display: block;
  margin: 0 auto;
  height: 100%;
  width: ${props => (props.width ? "100%" : "45vw")};
`;
