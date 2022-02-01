import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { makeNewQueryString } from "src/utils/queryStringUtil";
import { LinkWrapper } from "./styles";
import { CategoryParams } from "./types";

const Category = ({ item, key }: CategoryParams) => {
  const { categoryName, subCategory } = item;
  const location = useLocation();
  const { pathname, search } = location;
  const currentQuery = queryString.parse(search);

  const [currentFirstCategory, setCurrentFirstCategory] = useState("");
  const [currentSecondCategory, setCurrentSecondCategory] = useState("");
  const defaultLocation = "book/category";

  const handleChange = useCallback(
    (firstCategory: string) => (event: SelectChangeEvent) => {
      setCurrentFirstCategory(firstCategory);
      setCurrentSecondCategory(event.target.value);
    },
    [],
  );

  return (
    <div key={key}>
      <FormControl sx={{ m: 1, minWidth: 150 }} color="mainDarkBrown">
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
          {subCategory.map((value, index) => {
            return (
              <MenuItem key={index} value={value.categoryName}>
                <LinkWrapper>
                  <Link
                    to={makeNewQueryString(`${pathname}`, currentQuery, {
                      categoryId: value.categoryId,
                    })}
                  >
                    {value.categoryName}
                  </Link>
                </LinkWrapper>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Category;
