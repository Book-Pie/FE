import { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper";
import client, { errorHandler } from "api/client";
import usePopup from "hooks/usePopup";
import Popup from "elements/Popup";
import * as Styled from "./style";
import * as Types from "./types";
import Card from "./Card";

const LatestSlider = () => {
  const [pages, setPages] = useState<Types.UsedBook[]>([]);
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, message } = popupState;
  useEffect(() => {
    client
      .get<Types.LatestSliderReponse>("/usedbook?limit=15")
      .then(({ data }) => setPages(data.pages))
      .catch(e => {
        const message = errorHandler(e);
        handlePopupMessage(false, message);
      });
  }, [handlePopupMessage]);

  return (
    <Styled.LatestSliderContainer>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} className="red">
          {message}
        </Popup>
      )}
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
