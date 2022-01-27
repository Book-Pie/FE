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
import { ParentsCategoryData } from "src/modules/Slices/book/types";
import { Wrapper, LinkWrapper } from "./styles";

export interface CategorysProps {
  categorys: ParentsCategoryData[];
  defaultLocation: string;
}

const ReviewCategorys = ({ categorys, defaultLocation }: CategorysProps) => {
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
      {categorys.map((item, idx) => {
        const { categoryName, subCategory } = item;
        return (
          <FormControl key={idx} sx={{ m: 1, minWidth: 80 }} color="mainDarkBrown">
            <InputLabel id="category">{categoryName}</InputLabel>
            <Select
              labelId="category"
              label={categoryName}
              value={currentFirstCategory === categoryName ? currentSecondCategory : ""}
              onChange={handleChange(categoryName)}
            >
              <MenuItem value="">
                <LinkWrapper>
                  <Link to={`/${defaultLocation}`}>전체</Link>
                </LinkWrapper>
              </MenuItem>
              {subCategory.map((item, idx) => {
                return (
                  <MenuItem key={idx} value="">
                    <LinkWrapper>
                      <Link to={makeNewQueryString(`${pathname}`, currentQuery, { categoryId: item.categoryId })}>
                        {item.categoryName}
                      </Link>
                    </LinkWrapper>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      })}
    </Wrapper>
  );
};

export default memo(ReviewCategorys);
