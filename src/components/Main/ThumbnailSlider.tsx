import styled from "styled-components";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper";

SwiperCore.use([Navigation, Pagination]);

const ThumbnailSlider = () => {
  return (
    <SwipierContainer>
      <Swiper navigation={true} spaceBetween={20} slidesPerView={4} slidesPerGroup={4} loopFillGroupWithBlank={true}>
        <SwiperSlide>
          <SlierBox>
            <ProductImage src="https://kream-phinf.pstatic.net/MjAyMTEyMTBfMjQ4/MDAxNjM5MTEyMTE4ODk3.E5xSNEGfpoeBSUdiEb1TiK0xB8pQZ2sbsmKwir2X0H0g.N-57P9OD7r27nsWNs_0AwgF6CJAO7GrokL22BCeS7QUg.PNG/a_40f9f33ce83747cba477269413bee1f0.png?type=m" />
          </SlierBox>
        </SwiperSlide>
        <SwiperSlide>
          <SlierBox>
            <ProductImage src="https://kream-phinf.pstatic.net/MjAyMTEyMTBfMjQ4/MDAxNjM5MTEyMTE4ODk3.E5xSNEGfpoeBSUdiEb1TiK0xB8pQZ2sbsmKwir2X0H0g.N-57P9OD7r27nsWNs_0AwgF6CJAO7GrokL22BCeS7QUg.PNG/a_40f9f33ce83747cba477269413bee1f0.png?type=m" />
          </SlierBox>
        </SwiperSlide>
        <SwiperSlide>
          <SlierBox>
            <ProductImage src="https://kream-phinf.pstatic.net/MjAyMTEyMTBfMjQ4/MDAxNjM5MTEyMTE4ODk3.E5xSNEGfpoeBSUdiEb1TiK0xB8pQZ2sbsmKwir2X0H0g.N-57P9OD7r27nsWNs_0AwgF6CJAO7GrokL22BCeS7QUg.PNG/a_40f9f33ce83747cba477269413bee1f0.png?type=m" />
          </SlierBox>
        </SwiperSlide>
        <SwiperSlide>
          <SlierBox>
            <ProductImage src="https://kream-phinf.pstatic.net/MjAyMTEyMTBfMjQ4/MDAxNjM5MTEyMTE4ODk3.E5xSNEGfpoeBSUdiEb1TiK0xB8pQZ2sbsmKwir2X0H0g.N-57P9OD7r27nsWNs_0AwgF6CJAO7GrokL22BCeS7QUg.PNG/a_40f9f33ce83747cba477269413bee1f0.png?type=m" />
          </SlierBox>
        </SwiperSlide>
        <SwiperSlide>
          <SlierBox>
            <ProductImage src="https://kream-phinf.pstatic.net/MjAyMTEyMTBfMjQ4/MDAxNjM5MTEyMTE4ODk3.E5xSNEGfpoeBSUdiEb1TiK0xB8pQZ2sbsmKwir2X0H0g.N-57P9OD7r27nsWNs_0AwgF6CJAO7GrokL22BCeS7QUg.PNG/a_40f9f33ce83747cba477269413bee1f0.png?type=m" />
          </SlierBox>
        </SwiperSlide>
        <SwiperSlide>
          <SlierBox>
            <ProductImage src="https://kream-phinf.pstatic.net/MjAyMTEyMTBfMjQ4/MDAxNjM5MTEyMTE4ODk3.E5xSNEGfpoeBSUdiEb1TiK0xB8pQZ2sbsmKwir2X0H0g.N-57P9OD7r27nsWNs_0AwgF6CJAO7GrokL22BCeS7QUg.PNG/a_40f9f33ce83747cba477269413bee1f0.png?type=m" />
          </SlierBox>
        </SwiperSlide>
        <SwiperSlide>
          <SlierBox>
            <ProductImage src="https://kream-phinf.pstatic.net/MjAyMTEyMTBfMjQ4/MDAxNjM5MTEyMTE4ODk3.E5xSNEGfpoeBSUdiEb1TiK0xB8pQZ2sbsmKwir2X0H0g.N-57P9OD7r27nsWNs_0AwgF6CJAO7GrokL22BCeS7QUg.PNG/a_40f9f33ce83747cba477269413bee1f0.png?type=m" />
          </SlierBox>
        </SwiperSlide>
        <SwiperSlide>
          <SlierBox>
            <ProductImage src="https://kream-phinf.pstatic.net/MjAyMTEyMTBfMjQ4/MDAxNjM5MTEyMTE4ODk3.E5xSNEGfpoeBSUdiEb1TiK0xB8pQZ2sbsmKwir2X0H0g.N-57P9OD7r27nsWNs_0AwgF6CJAO7GrokL22BCeS7QUg.PNG/a_40f9f33ce83747cba477269413bee1f0.png?type=m" />
          </SlierBox>
        </SwiperSlide>
      </Swiper>
    </SwipierContainer>
  );
};

export default ThumbnailSlider;

const SwipierContainer = styled.div`
  padding: 0px 30px;
`;

const SlierBox = styled.div`
  width: 100%;
  height: auto;
  background-color: #f1f1ea;
  border-radius: 8px;
  padding: 0px 12px;
`;

const ProductImage = styled.img`
  height: auto;
  width: 100%;
`;
