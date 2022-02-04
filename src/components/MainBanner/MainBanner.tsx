import { Navigation, Autoplay } from "swiper";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { lazy, Suspense, memo } from "react";
import { Skeleton } from "@mui/material";
import { range } from "lodash";
import * as Styled from "./style";

const BannerImage = lazy(() => import("./BannerImage"));

const MainBanner = () => {
  return (
    <Styled.MainBannerContainer>
      <Styled.MainBannerWrapper>
        <Swiper modules={[Navigation, Autoplay]} slidesPerView={1} navigation freeMode autoplay>
          <Suspense fallback={<Skeleton variant="rectangular" height="100%" width="100%" />}>
            {range(0, 3).map((_, idx) => (
              <SwiperSlide key={idx}>
                <BannerImage />
              </SwiperSlide>
            ))}
          </Suspense>
        </Swiper>
      </Styled.MainBannerWrapper>
    </Styled.MainBannerContainer>
  );
};

export default memo(MainBanner);
