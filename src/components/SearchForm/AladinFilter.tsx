import Stack from "@mui/material/Stack";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField, useMediaQuery } from "@mui/material";
import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { makeNewQueryString } from "src/utils/queryStringUtil";
import queryString from "query-string";
import { useAppDispatch } from "src/modules/store";
import useDebounce from "src/hooks/useDebounce";
import { reset } from "src/modules/Slices/search/searchSlice";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import { hookFormHtmlCheck, makeOption } from "src/utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import * as Types from "./types";

const AladinFilter = () => {
  const { handleSubmit, control, formState, clearErrors } = useForm<Types.AladinFilterForm>({
    defaultValues: {
      keyword: "",
    },
  });
  const max500 = useMediaQuery("(max-width:500px)");
  const [filter, setFilter] = useState("Title");
  const { pathname, search } = useLocation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { errors } = formState;
  const query = useMemo(() => queryString.parse(search), [search]);
  const labelText = useMemo(() => "필터", []);
  const debounce = useDebounce();

  const keywordOptions: RegisterOptions = useMemo(
    () => ({
      required: makeOption<boolean>(true, "검색어는 필수 입니다."),
      maxLength: makeOption<number>(50, "최대 50자 입니다."),
      validate: {
        html: value => hookFormHtmlCheck(value, "HTML태그는 검색이 불가합니다."),
      },
    }),
    [],
  );

  const menuItems = useMemo(
    () => [
      {
        value: "Title",
        text: "제목",
      },
      {
        value: "Author",
        text: "저자",
      },
      {
        value: "Publisher",
        text: "출판사",
      },
    ],
    [],
  );

  const handleSelectOnChange = ({ target: { value } }: SelectChangeEvent) => {
    history.replace(makeNewQueryString(pathname, query, { QueryType: value }));
    dispatch(reset());
    clearErrors();
    setFilter(value);
  };

  const onSubmit = ({ keyword }: Types.AladinFilterForm) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      history.replace(makeNewQueryString(pathname, query, { keyword }));
      dispatch(reset());
    }, 500);
  };

  return (
    <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={1} mb={2} mt={2} position="relative">
      <form onSubmit={handleSubmit(onSubmit)} style={max500 ? { width: "100%" } : { width: "auto" }}>
        <Controller
          name="keyword"
          control={control}
          rules={keywordOptions}
          render={({ field }) => (
            <TextField
              {...field}
              sx={max500 ? { width: "100%" } : { width: 500 }}
              type="text"
              color="mainDarkBrown"
              placeholder="검색 키워드를 입력해주세요."
            />
          )}
        />
      </form>
      <FormControl sx={max500 ? { width: "100%" } : { width: 150 }} color="mainDarkBrown">
        <InputLabel id="queryType ">{labelText}</InputLabel>
        <Select labelId="queryType" label={labelText} value={filter} onChange={handleSelectOnChange}>
          {menuItems.map(({ text, value }, idx) => (
            <MenuItem key={idx} value={value}>
              <Link to={makeNewQueryString(pathname, query, { QueryType: value })}>{text}</Link>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction="row" justifyContent="center" gap={1} position="absolute" top="110%">
        <ErrorMessage message={errors.keyword?.message} />
      </Stack>
    </Stack>
  );
};

export default memo(AladinFilter);
