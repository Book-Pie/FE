import BestSeller from "src/components/Main/BestSeller";
import ThumbnailSlider from "src/components/Main/ThumbnailSlider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/modules/store";
import { getbookAPI, getBookSelector } from "src/modules/Slices/book/bookSlice";
import Text from "src/elements/Text";
import { images } from "src/assets/image/image-data";
import theme from "src/assets/style/styledTheme";
import { BannerImage, BookContainer, BookListContainer, BookWrapper, TextWrapper } from "./style";

const Mainpage = () => {
  const dispatch = useDispatch();
  const bestsellerBooks = useTypedSelector(getBookSelector);

  useEffect(() => {
    // dispatch(getbookAPI());
  }, []);

  return (
    <>
      <BannerImage src={images[0]} />

      {/* 베스트셀러 */}
      <Text bold fontSize="30px" color={theme.colors.mainDarkBrown} margin="100px 0px 42px 0px">
        베스트셀러
      </Text>
      <BookContainer>
        {bestsellerBooks?.item.map((item, index) => (
          <BookWrapper key={index}>
            <BestSeller {...item} />
          </BookWrapper>
        ))}
      </BookContainer>

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
