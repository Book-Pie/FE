import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps, Theme } from "@mui/material";
import { AxiosResponse } from "axios";
import { memo, useMemo } from "react";
import { CategorysResponse } from "../UsedBookList/types";

interface categorysProps {
  resource: {
    read: <T>() => AxiosResponse<T>;
  };
  currentFirstCategory: string;
  currentSecondCategory: string;
  handleChange: (firstCategory: string) => (event: SelectChangeEvent) => void;
}

const SaleInsertCategorys = ({
  resource,
  currentFirstCategory,
  currentSecondCategory,
  handleChange,
}: categorysProps) => {
  const { data } = resource.read<CategorysResponse>();

  const sx = useMemo<SxProps<Theme>>(
    () => ({
      color: theme => theme.colors.mainDarkBrown,
      fontWeight: 900,
      s: { minWidth: 130 },
    }),
    [],
  );

  return (
    <>
      {Object.entries(data.data).map(([first, second], idx) => (
        <FormControl className="category" sx={{ minWidth: 130 }} key={idx} color="mainDarkBrown">
          <InputLabel id="category">{first}</InputLabel>
          <Select
            labelId="category"
            label={first}
            value={currentFirstCategory === first ? currentSecondCategory : ""}
            sx={sx}
            onChange={handleChange(first)}
          >
            {second.length !== 0 ? (
              second.map((value, i) => (
                <MenuItem key={i} value={value}>
                  {value}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="기타">기타</MenuItem>
            )}
          </Select>
        </FormControl>
      ))}
    </>
  );
};

export default memo(SaleInsertCategorys);
