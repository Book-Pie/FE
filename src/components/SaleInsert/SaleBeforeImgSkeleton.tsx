import { Skeleton } from "@mui/material";
import { range } from "lodash";

const SaleBeforeImgSkeleton = () => {
  const sx = {
    width: "100%",
    height: "100%",
  };
  return (
    <div>
      {range(0, 6).map(idx => (
        <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" key={idx} />
      ))}
    </div>
  );
};

export default SaleBeforeImgSkeleton;
