import { Skeleton } from "@mui/material";

const SaleCategorysSkeleton = () => {
  const sx = { minWidth: 130, height: 50 };
  return (
    <>
      <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
      <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
      <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
      <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
      <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
      <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
      <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
    </>
  );
};

export default SaleCategorysSkeleton;
