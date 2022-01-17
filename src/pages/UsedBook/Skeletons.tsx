import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { UsedBookRow } from "./style";

const Skeletons = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, idx) => (
        <UsedBookRow key={idx}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Stack spacing={0.5} key={idx} width="20%" sx={{ margin: "0.5rem" }}>
              <Skeleton variant="rectangular" width="100%" height={200} animation="wave" sx={{ borderRadius: "5px" }} />
              <Skeleton variant="text" width="100%" height={50} animation="wave" sx={{ borderRadius: "5px" }} />
              <Skeleton
                variant="text"
                width="100%"
                height={18}
                animation="wave"
                sx={{ borderRadius: "5px", marginTop: "16px" }}
              />
              <Skeleton
                variant="text"
                width="100%"
                height={20}
                animation="wave"
                sx={{ borderRadius: "5px", marginTop: "16px" }}
              />
            </Stack>
          ))}
        </UsedBookRow>
      ))}
    </div>
  );
};

export default Skeletons;
