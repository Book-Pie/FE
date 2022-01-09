import styled from "styled-components";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/modules/store";
import { getRecentlyBookAPI, getRecentlyBookSelector } from "src/modules/Slices/usedbook/usedbookSlice";
import SliderItem from "./SliderItem";

SwiperCore.use([Navigation, Pagination]);

const ThumbnailSlider = () => {
  const dispatch = useDispatch();
  const recentlyBooks = useTypedSelector(getRecentlyBookSelector);

  useEffect(() => {
    dispatch(getRecentlyBookAPI());
  }, []);

  return (
    <SwipierContainer>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        width={850}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
      >
        {recentlyBooks.pages.map((item, index) => (
          <SwiperSlide key={index} style={{ width: "190px" }}>
            <SliderItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwipierContainer>
  );
};

export default ThumbnailSlider;

const SwipierContainer = styled.div`
  padding: 0px 30px;
`;
