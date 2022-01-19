import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingProps {
  isLoading: boolean;
}

const Loading = ({ isLoading }: LoadingProps) => {
  if (isLoading) {
    return (
      <Backdrop sx={{ zIndex: 1, color: theme => theme.colors.mainLightBrown }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return null;
};

export default Loading;
