import styled from "styled-components";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { images } from "../../assets/image-data";

import LeftButton from "../../assets/arrow-left-solid.svg";
import RightButton from "../../assets/arrow-right-solid.svg";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const BannerSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <BannerContainer>
      <PrevButton type="button" className="prev" onClick={() => paginate(-1)}>
        <img src={LeftButton} alt="leftbutton" sizes="2px" />
      </PrevButton>
      <AnimatePresence initial={false} custom={direction}>
        <Banner
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <NextButton type="button" className="next" onClick={() => paginate(1)}>
        <img src={RightButton} alt="rightbutton" sizes="2px" />
      </NextButton>
    </BannerContainer>
  );
};

export default BannerSlider;

const BannerContainer = styled.div`
  height: 560px;
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: relative; */
`;

const Banner = styled(motion.img)`
  width: 100vw;
  position: absolute; // 헤더 크기만큼 띄워주기
  z-index: -1;
  display: flex;
`;

const PrevButton = styled.button`
  width: 30px;
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
  top: calc(50% - 20px);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 10px;
  z-index: 2;
`;

const NextButton = styled.button`
  width: 30px;
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
  transform: scale(-1);
  top: calc(50% - 20px);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10px;
  z-index: 2;
`;
