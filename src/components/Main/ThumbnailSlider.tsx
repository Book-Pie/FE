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

  const slides = Array.from({ length: 9 }).map((_, index) => ({
    id: index,
    title: `타이틀${index + 1}`,
    category: `카테고리${index + 1}`,
    price: "10000",
    image: "https://picsum.photos/200/200",
  }));

  return (
    <SwipierContainer>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={5}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        freeMode
        autoplay
        style={{ paddingBottom: "50px" }}
      >
        {slides.map((v, index) => (
          <SwiperSlide key={index} style={{ width: "200px", padding: "1rem" }}>
            <SliderItem {...v} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwipierContainer>
  );
};

export default ThumbnailSlider;

const SwipierContainer = styled.div`
  margin-bottom: 200px;
  background-color: ${props => props.theme.colors.mainLightBrown};
  padding: 1rem 30px;
  border-radius: 5px;
  cursor: pointer;

  .swiper-slide {
    background-color: rgba(79, 54, 41, 0.7);
    border-radius: 5px;
    color: white;
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
