import { Button, Stack } from "@mui/material";
import { memo } from "react";

const Buttons = ({ handleReset }: { handleReset: () => void }) => {
  return (
    <Stack spacing={1} direction="row" justifyContent="center" mt={3}>
      <Button color="mainDarkBrown" variant="contained" type="submit">
        등록
      </Button>
      <Button color="error" variant="contained" onClick={handleReset}>
        초기화
      </Button>
    </Stack>
  );
};

export default memo(Buttons);
