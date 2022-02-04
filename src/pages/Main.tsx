import LatestSlide from "components/LatestSlide/LatestSlide";
import MainBanner from "components/MainBanner/MainBanner";
import BestSeller from "components/BestSeller/BestSeller";
import { Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";
import * as Styled from "./styles";

const Main = () => {
  return (
    <main>
      <MainBanner />
      <Styled.MainSection>
        <Styled.Text>베스트셀러</Styled.Text>
        <Suspense fallback={<Skeleton variant="rectangular" height="300px" width="100%" />}>
          <BestSeller />
        </Suspense>
        <Styled.Text>최신등록상품</Styled.Text>
        <Suspense fallback={<Skeleton variant="rectangular" height="300px" width="100%" />}>
          <LatestSlide />
        </Suspense>
      </Styled.MainSection>
    </main>
  );
};

export default Main;
