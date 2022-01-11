import BestSeller from "src/components/Main/BestSeller";
import ThumbnailSlider from "src/components/Main/ThumbnailSlider";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/modules/store";
import { getbookAPI, getBookSelector } from "src/modules/Slices/book/bookSlice";
import Text from "src/elements/Text";
import theme from "src/assets/style/styledTheme";
import { Skeleton, Stack } from "@mui/material";
import { BookContainer, BookWrapper } from "./style";

const MainBanner = lazy(() => import("src/components/MainBanner/MainBanner"));

const Mainpage = () => {
  const dispatch = useDispatch();
  const bestsellerBooks = useTypedSelector(getBookSelector);
  const { item } = bestsellerBooks;

  console.log(item);

  useEffect(() => {
    dispatch(getbookAPI());
  }, [dispatch]);

  const skelatons = Array.from({ length: 9 }).map(() => ({
    background: theme.colors.mainLightBrown,
    padding: "10px",
    borderRadius: "5px",
  }));

  return (
    <>
      <Suspense fallback={<Skeleton variant="rectangular" height={330} width="100%" />}>
        <MainBanner />
      </Suspense>

      {/* 베스트셀러 */}
      <Text bold fontSize="30px" color={theme.colors.mainDarkBrown} margin="50px 0px 42px 0px">
        베스트셀러
      </Text>
      <BookContainer>
        {item.length !== 0
          ? item.map((item, index) => (
              <BookWrapper key={index}>
                <BestSeller {...item} />
              </BookWrapper>
            ))
          : skelatons.map((sx, idx) => (
              <Stack spacing={1} key={idx} sx={sx}>
                <Stack direction="row" spacing={2}>
                  <Skeleton variant="circular" height={50} width={50} />
                  <Skeleton variant="text" height={50} width={200} />
                </Stack>
                <Skeleton variant="text" height={80} />
                <Skeleton variant="rectangular" height={150} width={150} />
              </Stack>
            ))}
      </BookContainer>

      {/* 숫자로 보는 오늘 하루 북파이 */}
      {/* <NumberBanner src={NumberBanner} /> */}
      {/* 최신등록상품 */}
      <Text bold fontSize="30px" color={theme.colors.mainDarkBrown} margin="50px 0px 42px 0px">
        최신등록상품
      </Text>
      <ThumbnailSlider />
    </>
  );
};

export default Mainpage;
