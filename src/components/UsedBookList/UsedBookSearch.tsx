import { TextField, Typography } from "@mui/material";
import { ParsedQuery } from "query-string";
import { ChangeEvent, memo } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import ErrorMessage from "src/elements/ErrorMessage";
import useDebounce from "src/hooks/useDebounce";
import { FormErrorMessages, htmlTagPatternCheck } from "src/utils/hookFormUtil";
import { makeNewQueryString, removeQueryString } from "src/utils/queryStringUtil";
import { useTheme } from "styled-components";
import * as Styled from "./style";

const UsedBookSearch = ({ query }: { query: ParsedQuery<string> }) => {
  const debounce = useDebounce();
  const { formState, setError, clearErrors } = useForm<{ title: string }>();
  const history = useHistory();
  const { pathname, search } = useLocation();
  const theme = useTheme();

  const handleTitleOnChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      if (value.length > 50) {
        setError("title", { type: "maxLength", message: FormErrorMessages.MAX_LENGTH });
        return;
      }
      if (htmlTagPatternCheck(value)) {
        setError("title", { type: "html", message: "HTML태그는 검색이 불가합니다." });
        return;
      }

      if (value) {
        history.replace(makeNewQueryString(pathname, query, { title: value }));
      } else {
        history.replace(removeQueryString(pathname, search, ["title"]));
      }
      clearErrors();
    }, 500);
    return 1;
  };

  return (
    <Styled.UsedBookSearchWrapper>
      <Typography variant="h4" mt={3} mb={2} fontWeight="bold" color={theme.colors.darkGrey}>
        중고도서 검색
      </Typography>
      <TextField
        fullWidth
        onChange={handleTitleOnChange}
        type="text"
        color="mainDarkBrown"
        placeholder="중고도서 이름을 입력해주세요."
      />
      <ErrorMessage message={formState.errors.title?.message} />
    </Styled.UsedBookSearchWrapper>
  );
};

export default memo(UsedBookSearch);
