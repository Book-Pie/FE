import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingProps {
  isLoading: boolean;
}

const Loading = ({ isLoading }: LoadingProps) => {
  return (
    <Backdrop sx={{ zIndex: 1, color: theme => theme.colors.mainLightBrown }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
