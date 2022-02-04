import { Backdrop, CircularProgress } from "@mui/material";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <Backdrop sx={{ zIndex: 5, color: theme => theme.colors.mainLightBrown }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
