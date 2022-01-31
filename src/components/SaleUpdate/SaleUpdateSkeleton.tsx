import { Skeleton } from "@mui/material";

const SaleUpdateSkeleton = () => {
  return (
    <div>
      <Skeleton width={100} height={50} animation="wave" variant="rectangular" />
      <Skeleton width={100} height={50} animation="wave" variant="rectangular" />
      <Skeleton width={100} height={50} animation="wave" variant="rectangular" />
      <Skeleton width={100} height={50} animation="wave" variant="rectangular" />
      <Skeleton width={100} height={50} animation="wave" variant="rectangular" />
      <Skeleton width={100} height={50} animation="wave" variant="rectangular" />
      <Skeleton width={100} height={50} animation="wave" variant="rectangular" />
    </div>
  );
};

export default SaleUpdateSkeleton;
