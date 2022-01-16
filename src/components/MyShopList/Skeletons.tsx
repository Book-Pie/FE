import { Skeleton } from "@mui/material";
import { Cell } from "./style";

const Skeletons = () => {
  return (
    <div>
      <Cell>
        <Skeleton variant="rectangular" width="100%" height={150} animation="wave" />
      </Cell>
      <Cell>
        <Skeleton variant="text" width={120} height={55} animation="wave" />
      </Cell>
      <Cell>
        <Skeleton variant="text" width={150} height={80} animation="wave" />
      </Cell>
      <Cell>
        <Skeleton variant="text" width={120} height={55} animation="wave" />
      </Cell>
      <Cell>
        <Skeleton variant="text" width={30} height={55} animation="wave" />
        <Skeleton variant="text" width={30} height={55} animation="wave" sx={{ ml: 1 }} />
      </Cell>
      <Cell>
        <Skeleton variant="text" width={120} height={70} animation="wave" />
      </Cell>
      <Cell>
        <Skeleton variant="text" width={120} height={55} animation="wave" />
      </Cell>
    </div>
  );
};

export default Skeletons;
