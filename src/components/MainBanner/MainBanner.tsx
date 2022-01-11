import bannerImg from "src/assets/image/banner1.png";
import { Navigation, Autoplay } from "swiper";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { BannerImage, Wrapper } from "./style";

const MainBanner = () => {
  return (
    <Wrapper>
      <Swiper modules={[Navigation, Autoplay]} slidesPerView={1} navigation freeMode autoplay>
        {Array.from({ length: 3 }).map((_, idx) => (
          <SwiperSlide key={idx}>
            <BannerImage src={bannerImg} alt="bannerImg" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default MainBanner;
