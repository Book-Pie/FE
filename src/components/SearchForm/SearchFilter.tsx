import Stack from "@mui/material/Stack";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { makeNewQueryString, removeQueryString } from "src/utils/queryStringUtil";
import queryString from "query-string";

const SearchFilter = () => {
  const [sort, setSort] = useState("");
  const { pathname, search } = useLocation();
  const query = useMemo(() => queryString.parse(search), [search]);
  const labelText = useMemo(() => "정렬", []);
  const handleSelectOnChange = ({ target: { value } }: SelectChangeEvent) => setSort(value);

  const menuItems = useMemo(
    () => [
      {
        value: "date",
        text: "최신순",
      },
      {
        value: "view",
        text: "조회순",
      },
    ],
    [],
  );

  return (
    <Stack direction="row" justifyContent="flex-end">
      <FormControl sx={{ width: 150 }} color="mainDarkBrown">
        <InputLabel id="sort">{labelText}</InputLabel>
        <Select labelId="sort" label={labelText} value={sort} onChange={handleSelectOnChange}>
          <MenuItem value="all">
            <Link to={removeQueryString(pathname, search, ["sort"])}>전체</Link>
          </MenuItem>
          {menuItems.map(({ text, value }, idx) => (
            <MenuItem key={idx} value={value}>
              <Link to={makeNewQueryString(pathname, query, { sort: value })}>{text}</Link>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SearchFilter;
