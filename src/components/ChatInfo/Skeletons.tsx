import { Skeleton } from "@mui/material";
import * as Styled from "./styles";

const Skeletons = () => {
  return (
    <Styled.UsedBookInfoWrapper>
      <div>
        <Skeleton variant="rectangular" height="150px" width="100px" />
      </div>
      <div>
        <Skeleton variant="rectangular" height="30px" width="150px" />
        <Skeleton variant="rectangular" height="30px" width="150px" />
        <Skeleton variant="rectangular" height="30px" width="150px" />
        <Skeleton variant="rectangular" height="30px" width="150px" />
      </div>
    </Styled.UsedBookInfoWrapper>
  );
};

export default Skeletons;
