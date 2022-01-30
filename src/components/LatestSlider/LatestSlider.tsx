import { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper";
import { getLatestUsedBooks } from "api/usedBook";
import * as Styled from "./style";
import * as Types from "./types";
import Card from "./Card";

const LatestSlider = () => {
  const [pages, setPages] = useState<Types.IPage[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const { data } = await getLatestUsedBooks();
      setPages(data.data.pages);
    };
    fetcher();
  }, []);

  return (
    <Styled.LatestSliderContainer>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={5}
        spaceBetween={20}
        freeMode
        autoplay={{ delay: 3000 }}
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

export default memo(LatestSlider);
