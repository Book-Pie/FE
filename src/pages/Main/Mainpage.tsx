import BestSeller from "src/components/Main/BestSeller";
import ThumbnailSlider from "src/components/Main/ThumbnailSlider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/modules/store";
import { getbookAPI, getBookSelector } from "src/modules/Slices/bookSlice";
import styled from "styled-components";
import Text from "src/elements/Text";
import { theme } from "src/utils/theme";
import { getRecentlyBookAPI, getRecentlyBookSelector } from "src/modules/Slices/usedbookSlice";
import BannerSlider from "../../components/Main/BannerSlider";
import SecondBanner from "../../assets/mainSecondBanner.png";

const Mainpage = () => {
  const dispatch = useDispatch();
  const bestsellerBooks = useTypedSelector(getBookSelector);

  useEffect(() => {
    dispatch(getbookAPI());
  }, []);

  return (
    <>
      <BannerSlider />

      {/* 베스트셀러 */}
      <BookListContainer>
        <TextWrapper>
          <Text bold fontSize="30px" color={theme.colors.mainDarkBrown} margin="100px 0px 42px 0px">
            베스트셀러
          </Text>
        </TextWrapper>
        <BookContainer>
          {bestsellerBooks.bookList.map((item, index) => (
            <BookWrapper key={index}>
              <BestSeller {...item} />
            </BookWrapper>
          ))}
        </BookContainer>
      </BookListContainer>

      {/* 숫자로 보는 오늘 하루 북파이 */}
      {/* <NumberBanner src={NumberBanner} /> */}

      {/* 최신등록상품 */}
      <TextWrapper>
        <Text bold fontSize="30px" color={theme.colors.mainDarkBrown} margin="100px 0px 42px 0px">
          최신등록상품
        </Text>
      </TextWrapper>

      <ThumbnailSlider />
    </>
  );
};

export default Mainpage;

interface BannerProps {
  src?: string;
}

// const NumberBanner = styled.div<BannerProps>`
//   background-image: url(${props => props.src});
//   width: 100%;
// `;

const TextWrapper = styled.div`
  width: 1600px;
`;

const BookListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BookContainer = styled.div`
  width: 1600px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 250px);
  column-gap: 20px;
  row-gap: 20px;
  :nth-child(1) {
    grid-row-start: 2;
    grid-column-end: span 3;
  }
`;

const BookWrapper = styled.div`
  width: 250px;
  height: 250px;
  :nth-child(1) {
    width: 520px;
    height: 520px;
    grid-row-start: 1;
    grid-row-end: span 2;
    grid-column-end: span 2;
    img {
      height: 480px;
    }
  }
`;
