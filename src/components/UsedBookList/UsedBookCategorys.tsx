import { memo, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import queryString from "query-string";
import { makeNewQueryString } from "utils/queryStringUtil";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import client, { createResource } from "api/client";
import * as Types from "./types";
import * as Styled from "./style";

const resource = createResource<Types.CategorysResponse>(client.get("/usedbook/category"));

const UsedBookCategorys = ({ defaultLocation }: Types.UsedBookCategorysProps) => {
  const { data } = resource.read();

  const matches = useMediaQuery("(max-width:500px)");
  const location = useLocation();
  const { pathname, search } = location;
  const currentQuery = queryString.parse(search);
  const [currentFirstCategory, setCurrentFirstCategory] = useState("");
  const [currentSecondCategory, setCurrentSecondCategory] = useState("");

  const handleChange = useCallback(
    (firstCategory: string) => (event: SelectChangeEvent) => {
      setCurrentFirstCategory(firstCategory);
      setCurrentSecondCategory(event.target.value);
    },
    [],
  );

  const sx = useMemo(() => (matches ? { minWidth: 100, height: 52 } : { minWidth: 150, height: 56 }), [matches]);

  return (
    <Styled.UsedBookCategorysWrapper>
      {Object.entries(data).map(([first, second], idx) => (
        <FormControl key={idx} color="mainDarkBrown" sx={sx} size={matches ? "small" : "medium"}>
          <InputLabel id="category">{first}</InputLabel>
          <Select
            labelId="category"
            label={first}
            value={currentFirstCategory === first ? currentSecondCategory : ""}
            onChange={handleChange(first)}
          >
            <MenuItem value="">
              <Styled.UsedBookCategoryLinkWrapper>
                <Link to={`/${defaultLocation}`}>전체</Link>
              </Styled.UsedBookCategoryLinkWrapper>
            </MenuItem>
            {second.map((value, i) => (
              <MenuItem key={i} value={value}>
                <Styled.UsedBookCategoryLinkWrapper>
                  <Link to={makeNewQueryString(pathname, currentQuery, { first, second: value })}>{value}</Link>
                </Styled.UsedBookCategoryLinkWrapper>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Styled.UsedBookCategorysWrapper>
  );
};

export default memo(UsedBookCategorys);
