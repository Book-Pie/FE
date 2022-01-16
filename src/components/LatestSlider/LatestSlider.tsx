import styled from "styled-components";
import { memo, useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper";

import { getLatestUsedBook } from "src/api/usedBook/usedBook";
import { SwipierWrapper } from "./style";
import Card from "./Card";

interface IPage {
  id: number;
  title: string;
  price: number;
  image: string;
  uploadDate: string;
  modifiedDate: string;
  state: string;
  likeCount: number;
  replyCount: number;
}

const LatestSlider = () => {
  const [list, setList] = useState<IPage[]>([]);

  useEffect(() => {
    getLatestUsedBook().then(response => setList(response.data.data.pages));
  }, []);

  const swiperStyle = useMemo(
    () => ({
      paddingBottom: "50px",
      width: "1200px",
    }),
    [],
  );

  // 데이터가 없을때 스켈레톤을 넘겨준다.
  return (
    <SwipierWrapper>
      <Swiper
        modules={[Pagination, Autoplay]}
        style={swiperStyle}
        slidesPerView={5}
        spaceBetween={20}
        freeMode
        autoplay
      >
        {list.map(({ id, title, price, image, state }, index) => (
          <SwiperSlide key={index}>
            <Card id={id} title={title} price={price} image={image} state={state} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwipierWrapper>
  );
};

export default memo(LatestSlider);
