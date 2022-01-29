import { useEffect } from "react";
import { bestSellerItemSelector, getBestSeller } from "modules/Slices/book/bookSlice";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { removeFreeBoardPage } from "utils/localStorageUtil";
import { range } from "lodash";
import { Skeleton, Stack } from "@mui/material";
import Card from "./Card";
import * as Styled from "./style";

const BestSeller = () => {
  const dispatch = useAppDispatch();
  const bestSeller = useTypedSelector(bestSellerItemSelector);

  useEffect(() => {
    if (bestSeller.length === 0) dispatch(getBestSeller());
    removeFreeBoardPage();
  }, [bestSeller, dispatch]);

  const best = bestSeller.length
    ? bestSeller.map((item, idx) => <Card key={idx} {...item} index={idx} />)
    : range(0, 9).map((_, idx) =>
        idx === 0 ? (
          <Styled.FirstCardSkeletonWrapper key={idx}>
            <Stack direction="column" spacing={2} width="50%">
              <Skeleton variant="circular" height={75} width={75} />
              <Skeleton variant="rectangular" height="80%" width="100%" />
            </Stack>
            <Stack direction="column" spacing={2} width="50%">
              <Skeleton variant="rectangular" height="100%" width="100%" />
            </Stack>
          </Styled.FirstCardSkeletonWrapper>
        ) : (
          <Styled.SkeletonCardWrapper key={idx}>
            <Stack direction="column" spacing={2} width="50%">
              <Skeleton variant="circular" height={50} width={50} />
              <Skeleton variant="rectangular" height="100%" width="100%" />
            </Stack>
            <Stack direction="column" spacing={2} width="50%">
              <Skeleton variant="rectangular" height="100%" width="100%" />
            </Stack>
          </Styled.SkeletonCardWrapper>
        ),
      );

  return <Styled.BestSellerWrapper>{best}</Styled.BestSellerWrapper>;
};

export default BestSeller;
