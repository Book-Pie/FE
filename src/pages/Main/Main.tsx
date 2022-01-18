import BestSeller from "src/components/Main/BestSeller";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/modules/store";
import { getbookAPI, getBookSelector } from "src/modules/Slices/book/bookSlice";
import { Skeleton, Stack } from "@mui/material";
import LatestSlider from "components/LatestSlider/LatestSlider";
import { BookContainer, BookWrapper, MainBannerWrapper, Text } from "./style";

const MainBanner = lazy(() => import("src/components/MainBanner/MainBanner"));

const Main = () => {
  const dispatch = useDispatch();
  const bestsellerBooks = useTypedSelector(getBookSelector);
  const { item } = bestsellerBooks;

  useEffect(() => {
    if (item.length === 0) dispatch(getbookAPI());
  }, [item, dispatch]);

  const skelatons = Array.from({ length: 9 }).map(() => ({
    background: "#edeae9",
    padding: "10px",
    margin: "0 10px",
  }));

  return (
    <div>
      <MainBannerWrapper>
        <Suspense fallback={<Skeleton variant="rectangular" height="100%" width="100%" />}>
          <MainBanner />
        </Suspense>
      </MainBannerWrapper>

      <Text>베스트셀러</Text>
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

      <Text>최신등록상품</Text>
      <LatestSlider />
    </div>
  );
};

export default Main;
