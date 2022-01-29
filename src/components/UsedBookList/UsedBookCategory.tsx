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
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Types from "./types";
import * as Styled from "./style";

const UsedBookCategory = ({ categorys, defaultLocation }: Types.CategorysProps) => {
  const location = useLocation();
  const matches = useMediaQuery("(max-width:500px)");
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

  if (Object.keys(categorys).length === 0) {
    return (
      <Styled.UsedBookCategoryWrapper>
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
        <Skeleton sx={sx} animation="wave" variant="rectangular" />
      </Styled.UsedBookCategoryWrapper>
    );
  }

  return (
    <Styled.UsedBookCategoryWrapper>
      {Object.entries(categorys).map(([first, second], idx) => (
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
    </Styled.UsedBookCategoryWrapper>
  );
};

export default memo(UsedBookCategory);
