import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import queryString from "query-string";
import { makeNewQueryString } from "utils/queryStringUtil";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent, Skeleton } from "@mui/material";
import { Wrapper, LinkWrapper } from "./style";
import { CategorysProps } from "./types";

const Categorys = ({ categorys, defaultLocation }: CategorysProps) => {
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

  if (Object.keys(categorys).length === 0) {
    const height = 56;
    const width = 150;
    const sx = { margin: "8px" };
    return (
      <Wrapper>
        <Skeleton width={width} height={height} sx={sx} animation="wave" variant="rectangular" />
        <Skeleton width={width} height={height} sx={sx} animation="wave" variant="rectangular" />
        <Skeleton width={width} height={height} sx={sx} animation="wave" variant="rectangular" />
        <Skeleton width={width} height={height} sx={sx} animation="wave" variant="rectangular" />
        <Skeleton width={width} height={height} sx={sx} animation="wave" variant="rectangular" />
        <Skeleton width={width} height={height} sx={sx} animation="wave" variant="rectangular" />
        <Skeleton width={width} height={height} sx={sx} animation="wave" variant="rectangular" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {Object.entries(categorys).map(([first, second], idx) => (
        <FormControl key={idx} sx={{ m: 1, minWidth: 150 }} color="mainDarkBrown">
          <InputLabel id="category">{first}</InputLabel>
          <Select
            labelId="category"
            label={first}
            value={currentFirstCategory === first ? currentSecondCategory : ""}
            onChange={handleChange(first)}
          >
            <MenuItem value="">
              <LinkWrapper>
                <Link to={`/${defaultLocation}`}>전체</Link>
              </LinkWrapper>
            </MenuItem>
            {second.map((value, i) => (
              <MenuItem key={i} value={value}>
                <LinkWrapper>
                  <Link to={makeNewQueryString(pathname, currentQuery, { first, second: value })}>{value}</Link>
                </LinkWrapper>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Wrapper>
  );
};

export default memo(Categorys);
