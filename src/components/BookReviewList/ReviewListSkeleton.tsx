import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { ReviewListSkeletonRow } from "./styles";

const ReviewListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, idx) => (
        <ReviewListSkeletonRow key={idx}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Stack spacing={0.5} key={idx} width="20%" sx={{ margin: "2rem" }}>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Stack>
          ))}
        </ReviewListSkeletonRow>
      ))}
    </>
  );
};

export default ReviewListSkeleton;
