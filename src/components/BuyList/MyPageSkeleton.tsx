import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const MyPageSkeleton = () => {
  return (
    <>
      <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
        <Skeleton variant="rectangular" width={160} height={118} />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="75%" />
          <Skeleton width="60%" />
        </Box>
      </Box>
      <Box sx={{ width: 180, marginTop: 4, my: 5, pt: 5 }}>
        <Skeleton variant="rectangular" width="50%" />
      </Box>
      <Box sx={{ width: 180, marginTop: 2, my: 5, pt: 5 }}>
        <Skeleton variant="rectangular" width="50%" />
        <Skeleton width="40%" />
      </Box>
      <Box sx={{ width: 180, marginTop: 2, my: 5, pt: 5 }}>
        <Skeleton variant="rectangular" width="50%" />
      </Box>
      <Box sx={{ width: 180, marginTop: 2, my: 5, pt: 5 }}>
        <Skeleton variant="rectangular" width="50%" />
      </Box>
      <Box sx={{ width: 180, marginTop: 2, my: 5, pt: 5 }}>
        <Skeleton variant="rectangular" width="50%" height="30%" />
      </Box>
    </>
  );
};

export default MyPageSkeleton;
