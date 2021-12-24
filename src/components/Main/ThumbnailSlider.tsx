import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { getData } from "src/api/api";

import styled from "styled-components";

interface IMoveData {
  id: number;
  backdrop_path: string;
}

const rawVariants = {
  hidden: {
    x: window.outerWidth + 1,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const offset = 4; // 한 번에 보여주고싶은 이미지 개수

function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

const ThumbnailSlider = () => {
  const { data } = useQuery(["movies", "nowPlaying"], getData);
  const [index, setIndex] = useState(0);

  // index를 증가시키는 함수
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      // data가 없을 경우 에러를 방지하기 위해서 data가 있는 경우에만 진행
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1; // page가 0에서부터 시작하기 때문에 1 빼준다
      setIndex(prev => (prev === maxIndex ? 0 : prev + 1)); // index를 증가시킬 때 항상 확인하는 절차를 거쳐야함
    }
  };

  const toggleLeaving = () => setLeaving(prev => !prev);

  const decreaseIndex = () => {
    if (data) {
      // data가 없을 경우 에러를 방지하기 위해서
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1; // page가 0에서부터 시작하기 때문에 1 빼준다
      setIndex(prev => (prev === 0 ? maxIndex : prev - 1)); // index를 증가시킬 때 항상 확인하는 절차를 거쳐야함
    }
  };

  return (
    <div>
      <button onClick={decreaseIndex} type="button">
        {" "}
        prev{" "}
      </button>
      <button onClick={increaseIndex} type="button">
        {" "}
        next{" "}
      </button>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          {/* onExitCompolete는 exit이 끝났을 때 실행되는 함수 */}
          <Row
            key={index}
            variants={rawVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
          >
            {/* index가 0일 때, 가장 처음에는 첫 offset개수가 담긴 배열  */}
            {data?.results.slice(offset * index, offset * index + offset).map((movie: IMoveData) => (
              <Box key={movie.id} bgphoto={makeImagePath(movie.backdrop_path, "w500")} />
            ))}
          </Row>
        </AnimatePresence>
      </Slider>
    </div>
  );
};

export default ThumbnailSlider;

const Slider = styled.div`
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: blue;
  height: 200px;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;
