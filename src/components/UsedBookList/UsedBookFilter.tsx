import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { removeQueryString } from "src/utils/queryStringUtil";
import { useTheme } from "styled-components";
import { useLocation } from "react-router";
import { ParsedQuery } from "query-string";
import { memo } from "react";
import * as Styled from "./style";

const UsedBookFilter = ({ query }: { query: ParsedQuery<string> }) => {
  const { search, pathname } = useLocation();
  const theme = useTheme();
  return (
    <Styled.UsedBookFilter>
      <Typography variant="h5" fontWeight="bold" color={theme.colors.darkGrey}>
        도서 카테고리
      </Typography>
      {Object.entries(query).map(([key, value], idx) => (
        <Link key={idx} to={removeQueryString(pathname, search, [key])}>
          <Chip
            key={idx}
            color="info"
            variant="outlined"
            icon={<AddCircleIcon fontSize="small" />}
            label={value === "date" || value === "view" ? (value === "view" ? "조회순" : "최신순") : value}
          />
        </Link>
      ))}
    </Styled.UsedBookFilter>
  );
};

export default memo(UsedBookFilter);
