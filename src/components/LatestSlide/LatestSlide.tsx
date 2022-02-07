import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper";
import { LatestSlideReponse } from "src/components/LatestSlide/types";
import client, { createResource } from "src/api/client";
import * as Styled from "./style";
import Card from "./Card";

const latestSliderResource = createResource<LatestSlideReponse>(client.get("/usedbook?limit=15"));

const LatestSlide = () => {
  const { data } = latestSliderResource.read();
  const { pages } = data;

  return (
    <Styled.LatestSliderContainer>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={5}
        spaceBetween={20}
        freeMode
        // autoplay={{ delay: 3000 }}
        loop
      >
        {pages.map(({ id, title, price, image, state }, index) => (
          <SwiperSlide key={index}>
            <Card id={id} title={title} price={price} image={image} state={state} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Styled.LatestSliderContainer>
  );
};

export default memo(LatestSlide);
