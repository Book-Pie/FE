import { Grid, Skeleton, Stack, useMediaQuery } from "@mui/material";
import * as Styled from "./style";

const Skeletons = () => {
  const max950 = useMediaQuery("(max-width:950px)");

  if (max950) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" borderBottom={1} borderColor="#edeae9">
          <Grid item xs={7} sm={8.5} display="flex" flexDirection="column">
            <Stack direction="row" gap={1}>
              <Skeleton variant="rectangular" width="90%" height={30} animation="wave" />
            </Stack>
            <Stack direction="row" gap={1} mt={1}>
              <Skeleton variant="rectangular" width="90%" height={30} animation="wave" />
            </Stack>
          </Grid>
          <Grid item>
            <Skeleton variant="rectangular" width={100} height={100} animation="wave" />
          </Grid>
          <Grid item xs={3} sm={2}>
            <Stack direction="column" gap={1} height="100%" alignItems="center" justifyContent="center">
              <Skeleton variant="rectangular" width={50} height={40} animation="wave" />
              <Skeleton variant="rectangular" width={50} height={40} animation="wave" />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <Styled.SaleCell>
        <Skeleton variant="rectangular" width={100} height={100} animation="wave" />
      </Styled.SaleCell>
      <Styled.SaleCell>
        <Skeleton variant="text" width={160} height={80} animation="wave" />
      </Styled.SaleCell>
      <Styled.SaleCell>
        <Skeleton variant="text" width={160} height={55} animation="wave" />
      </Styled.SaleCell>
      <Styled.SaleCell>
        <Stack direction="column" alignContent="center" justifyContent="center">
          <Skeleton variant="text" width={50} height={55} animation="wave" />
          <Skeleton variant="text" width={50} height={55} animation="wave" />
        </Stack>
      </Styled.SaleCell>
      <Styled.SaleCell>
        <Skeleton variant="text" width={100} height={65} animation="wave" />
      </Styled.SaleCell>
      <Styled.SaleCell>
        <Skeleton variant="text" width={160} height={70} animation="wave" />
      </Styled.SaleCell>
      <Styled.SaleCell>
        <Stack direction="column" alignContent="center" justifyContent="center">
          <Skeleton variant="text" width={120} height={55} animation="wave" />
          <Skeleton variant="text" width={120} height={55} animation="wave" />
        </Stack>
      </Styled.SaleCell>
    </div>
  );
};

export default Skeletons;
