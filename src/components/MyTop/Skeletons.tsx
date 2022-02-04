import { Skeleton } from "@mui/material";
import { range } from "lodash";
import * as Styled from "./style";

const Skeletons = () => {
  return (
    <div>
      <Styled.ProfileImg>
        <div>
          <Skeleton variant="circular" width={200} height={200} animation="wave" />
        </div>
      </Styled.ProfileImg>
      <Styled.MyTopUserInfo>
        {range(0, 6).map(idx => {
          const sx = { borderRadius: "5px" };
          return (
            <div key={idx} className="skeleton">
              {idx < 4 ? (
                <>
                  <Skeleton variant="rectangular" width={100} height={40} animation="wave" sx={sx} />
                  <Skeleton variant="text" width={90} height={40} animation="wave" sx={sx} />
                </>
              ) : (
                <Skeleton variant="rectangular" width="100%" height={40} animation="wave" sx={sx} />
              )}
            </div>
          );
        })}
      </Styled.MyTopUserInfo>
    </div>
  );
};

export default Skeletons;
