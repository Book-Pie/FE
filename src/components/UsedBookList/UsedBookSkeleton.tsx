import { Skeleton, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import * as Styled from "./style";

const UsedBookSkeleton = ({ type }: { type: "category" | "usedbook" }) => {
  const matches = useMediaQuery("(max-width:500px)");
  const sx = useMemo(() => (matches ? { minWidth: 100, height: 52 } : { minWidth: 150, height: 56 }), [matches]);

  if (type === "category") {
    return (
      <Styled.UsedBookCategoryWrapper>
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
      </Styled.UsedBookCategoryWrapper>
    );
  }

  return <div />;
};

export default UsedBookSkeleton;
