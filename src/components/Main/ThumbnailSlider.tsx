import styled from "styled-components";
// import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper";
// import { useDispatch } from "react-redux";
// import { useTypedSelector } from "src/modules/store";
// import { getRecentlyBookSelector } from "src/modules/Slices/usedbook/usedbookSlice";
import SliderItem from "./SliderItem";

const ThumbnailSlider = () => {
  // const dispatch = useDispatch();
  // const recentlyBooks = useTypedSelector(getRecentlyBookSelector);

  // useEffect(() => {
  // dispatch(getRecentlyBookAPI());
  // }, []);

  const slides = Array.from({ length: 15 }).map((_, index) => ({
    id: index,
    title: `허상의 어릿광대`,
    category: "#소설#화제작",
    price: "10000",
    image: "https://picsum.photos/200/200",
  }));

  return (
    <SwipierContainer>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={5}
        spaceBetween={20}
        freeMode
        autoplay
        style={{ paddingBottom: "50px", overflow: "visible", width: "1200px" }}
      >
        {slides.map((v, index) => (
          <SwiperSlide key={index}>
            <SliderItem {...v} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwipierContainer>
  );
};

export default ThumbnailSlider;

const SwipierContainer = styled.div`
  margin-bottom: 100px;
  cursor: pointer;

  .swiper-slide {
    width: 190px;
    color: ${props => props.theme.colors.darkGrey};
  }

  .swiper-pagination {
    bottom: 0;
  }
  .swiper-pagination-bullet {
    background: ${props => props.theme.colors.mainDarkBrown} !important;
    width: 15px;
    height: 15px;
    box-sizing: content-box;
  }
  .swiper-pagination-bullet-active {
    background: ${props => props.theme.colors.mainDarkBrown} !important;
  }

  .swiper-button-next {
    border-color: ${props => props.theme.colors.mainDarkBrown} !important;
    color: ${props => props.theme.colors.mainDarkBrown} !important;
  }
  .swiper-button-prev {
    border-color: ${props => props.theme.colors.mainDarkBrown} !important;
    color: ${props => props.theme.colors.mainDarkBrown} !important;
  }
`;
