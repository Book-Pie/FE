import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { range } from "lodash";
import { useMediaQuery } from "@mui/material";

const Skeletons = () => {
  const max1000 = useMediaQuery("(max-width:1000px)");
  const max800 = useMediaQuery("(max-width:800px)");
  const max500 = useMediaQuery("(max-width:500px)");

  let sx = { padding: "0 0.5rem", mt: 2, width: "20%" };

  sx = max1000 ? { ...sx, width: "33.3%" } : sx;
  sx = max800 ? { ...sx, width: "25%" } : sx;
  sx = max500 ? { ...sx, width: "50%" } : sx;

  let imgheight = 300;
  imgheight = max1000 ? 250 : imgheight;
  imgheight = max1000 ? 200 : imgheight;

  return (
    <>
      {range(0, 20).map((_, idx) => {
        return (
          <Stack key={idx} sx={sx}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={imgheight}
              animation="wave"
              sx={{ borderRadius: "5px" }}
            />
            <Skeleton variant="text" width="100%" height={60} animation="wave" sx={{ borderRadius: "5px" }} />
            <Skeleton variant="text" width="100%" height={25} animation="wave" sx={{ borderRadius: "5px" }} />
            <Skeleton variant="text" width="100%" height={30} animation="wave" sx={{ borderRadius: "5px" }} />
          </Stack>
        );
      })}
    </>
  );
};

export default Skeletons;
