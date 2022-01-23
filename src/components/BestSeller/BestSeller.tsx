import { useEffect } from "react";
import { bestSellerItemSelector, getBestSeller } from "src/modules/Slices/book/bookSlice";
import { useAppDispatch, useTypedSelector } from "src/modules/store";
import { removeFreeBoardPage } from "src/utils/localStorageUtil";
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

  const skeletons = range(0, 9).map(() => ({
    background: "#edeae9",
    padding: "10px",
    margin: "0 10px",
  }));

  if (bestSeller.length) {
    return (
      <Styled.BestSellerContainer>
        {bestSeller.map((item, idx) => (
          <Card {...item} index={idx} key={idx} />
        ))}
      </Styled.BestSellerContainer>
    );
  }
  return (
    <Styled.BestSellerContainer>
      {skeletons.map((sx, idx) =>
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
    </Styled.BestSellerContainer>
  );
};

export default BestSeller;
