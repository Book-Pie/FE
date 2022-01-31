import { memo, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import queryString from "query-string";
import { makeNewQueryString } from "utils/queryStringUtil";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent, Skeleton } from "@mui/material";
import { ParentsCategoryData } from "modules/Slices/book/types";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Wrapper, LinkWrapper, CategoryWrapper, SwiperWrapper } from "./styles";

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
  const categoryNumber = 6;

  const handleChange = useCallback(
    (firstCategory: string) => (event: SelectChangeEvent) => {
      setCurrentFirstCategory(firstCategory);
      setCurrentSecondCategory(event.target.value);
    },
    [],
  );

  const swiperStyle = useMemo(
    () => ({
      width: "1200px",
      height: "75px",
    }),
    [],
  );

  return (
    <CategoryWrapper>
      {categorys.length === 0 ? (
        <Wrapper>
          {Array.from(new Array(categoryNumber)).map((_, idx) => {
            return (
              <Skeleton
                key={idx}
                width="150px"
                height="56px"
                sx={{ marginRight: "50px", marginTop: "10px" }}
                animation="wave"
                variant="rectangular"
              />
            );
          })}
        </Wrapper>
      ) : (
        <Wrapper>
          <SwiperWrapper>
            <Swiper
              slidesPerView={6}
              slidesPerGroup={6}
              speed={1000}
              style={swiperStyle}
              navigation
              allowTouchMove={false}
              modules={[Navigation]}
              loop
            >
              {categorys &&
                categorys.map((item, idx) => {
                  const { subCategory } = item;
                  return (
                    <SwiperSlide key={idx}>
                      <FormControl sx={{ m: 1, minWidth: 150 }} color="mainDarkBrown">
                        <InputLabel id="category">{item.categoryName}</InputLabel>
                        <Select
                          labelId="category"
                          label={item.categoryName}
                          value={currentFirstCategory === item.categoryName ? currentSecondCategory : ""}
                          onChange={handleChange(item.categoryName)}
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
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </SwiperWrapper>
        </Wrapper>
      )}
    </CategoryWrapper>
  );
};

export default memo(ReviewCategorys);
