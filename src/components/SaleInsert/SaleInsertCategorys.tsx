import { FormControl, InputLabel, MenuItem, Select, SxProps, Theme } from "@mui/material";
import { memo, useMemo } from "react";
import { CategorysResponse } from "../UsedBookList/types";
import * as Types from "./types";

const SaleInsertCategorys = ({
  categorysResource,
  currentFirstCategory,
  currentSecondCategory,
  handleChange,
}: Types.SaleInsertCategorysProps) => {
  const { data } = categorysResource.read<CategorysResponse>();

  const sx = useMemo<SxProps<Theme>>(
    () => ({
      color: theme => theme.colors.mainDarkBrown,
      fontWeight: 900,
      s: { minWidth: 130 },
    }),
    [],
  );

  return (
    <div>
      {Object.entries(data).map(([first, second], idx) => (
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
    </div>
  );
};

export default memo(SaleInsertCategorys);
