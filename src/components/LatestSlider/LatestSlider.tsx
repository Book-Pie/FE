import { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper";
import { getLatestUsedBook } from "src/api/usedBook/usedBook";
import * as Styled from "./style";
import Card from "./Card";
import * as Types from "./types";

const LatestSlider = () => {
  const [pages, setPages] = useState<Types.IPage[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const { data } = await getLatestUsedBook();
      setPages(data.data.pages);
    };
    fetcher();
  }, []);

  return (
    <Styled.LatestSliderWrapper>
      <Swiper modules={[Pagination, Autoplay]} slidesPerView={5} spaceBetween={20} freeMode autoplay={{ delay: 3000 }}>
        {pages.map(({ id, title, price, image, state }, index) => (
          <SwiperSlide key={index}>
            <Card id={id} title={title} price={price} image={image} state={state} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Styled.LatestSliderWrapper>
  );
};

export default memo(LatestSlider);
