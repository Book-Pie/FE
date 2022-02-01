import { Skeleton } from "@mui/material";
import { range } from "lodash";
import * as Styled from "./style";

const SaleInsertSkeleton = ({ type }: { type: "input" | "editor" | "category" | "image" }) => {
  if (type === "category") {
    const sx = { minWidth: 130, height: 50 };
    return (
      <div>
        <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
        <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
        <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
        <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
        <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
        <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
        <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" />
      </div>
    );
  }

  if (type === "input") {
    return (
      <div>
        <Skeleton width="100%" height={56} className="skeleton" animation="wave" variant="rectangular" />
      </div>
    );
  }

  if (type === "image") {
    const sx = {
      width: "100%",
      height: "100%",
    };
    return (
      <Styled.ImgUpload>
        <div>
          <span>
            이전 이미지<span>*</span>
          </span>
          <span>(0/5)</span>
        </div>
        <div>
          {range(0, 6).map(idx => (
            <Skeleton sx={sx} className="skeleton" animation="wave" variant="rectangular" key={idx} />
          ))}
        </div>
      </Styled.ImgUpload>
    );
  }
  if (type === "editor") {
    return (
      <div>
        <Skeleton width="100%" height={200} className="skeleton" animation="wave" variant="rectangular" />
      </div>
    );
  }

  return <div />;
};

export default SaleInsertSkeleton;
