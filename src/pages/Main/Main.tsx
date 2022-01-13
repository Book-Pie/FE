import BestSeller from "src/components/Main/BestSeller";
import ThumbnailSlider from "src/components/Main/ThumbnailSlider";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/modules/store";
import { getBookAPI, getBookSelector } from "src/modules/Slices/book/bookSlice";
import Text from "src/elements/Text";
import theme from "src/assets/style/styledTheme";
import { Skeleton, Stack } from "@mui/material";
import { BookContainer, BookWrapper, BestSellerWrapper } from "./style";

const MainBanner = lazy(() => import("src/components/MainBanner/MainBanner"));

const Main = () => {
  const dispatch = useDispatch();
  const bestsellerBooks = useTypedSelector(getBookSelector);
  const { item } = bestsellerBooks;

  useEffect(() => {
    dispatch(getBookAPI());
  }, [dispatch]);

  const skelatons = Array.from({ length: 9 }).map(() => ({
    background: theme.colors.mainLightBrown,
    padding: "10px",
    margin: "0 10px",
  }));

  return (
    <>
      <div style={{ height: "376px" }}>
        <Suspense fallback={<Skeleton variant="rectangular" height="100%" width="100%" />}>
          <MainBanner />
        </Suspense>
      </div>

      {/* 베스트셀러 */}
      <Text bold fontSize="30px" color={theme.colors.mainDarkBrown} margin="50px 0px 42px 0px">
        베스트셀러
      </Text>
      <BookContainer>
        {item.length !== 0
          ? item.map((item, index) =>
              index === 0 ? (
                <div className="one" key={index}>
                  <BestSeller {...item} index={index} />
                </div>
              ) : (
                <BookWrapper key={index}>
                  <BestSeller {...item} index={index} />
                </BookWrapper>
              ),
            )
          : skelatons.map((sx, idx) =>
              idx === 0 ? (
                <Stack spacing={1} key={idx} sx={sx} className="one" direction="row">
                  <Stack direction="column" spacing={2} width="50%">
                    <Skeleton variant="circular" height={75} width={75} />
                    <Skeleton variant="rectangular" height="80%" width="100%" />
                  </Stack>
                  <Stack direction="column" spacing={2} width="50%">
                    <Skeleton variant="rectangular" height="100%" width="100%" />
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing={1} key={idx} sx={sx} direction="row">
                  <Stack direction="column" spacing={2} width="50%">
                    <Skeleton variant="circular" height={50} width={50} />
                    <Skeleton variant="rectangular" height="65%" width="100%" />
                  </Stack>
                  <Stack direction="column" spacing={2} width="50%">
                    <Skeleton variant="rectangular" height="100%" width="100%" />
                  </Stack>
                </Stack>
              ),
            )}
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

export default Main;
