import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import DropDown from "src/elements/DropDown";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useTypedSelector } from "src/modules/store";
import { makeNewQueryString, removeQueryString } from "src/utils/queryStringUtil";
import { useLocation } from "react-router";
import { memo, useState } from "react";
import { ParsedQuery } from "query-string";
import * as Styled from "./style";

const UsedBookMenu = ({ query }: { query: ParsedQuery<string> }) => {
  const [currentDropDownValue, setCurrentDropDownValue] = useState<string>("전체");
  const { isLoggedIn } = useTypedSelector(userReduceSelector);
  const { pathname, search } = useLocation();
  return (
    <Styled.UsedBookMenuWrapper>
      <div>
        <p>중고도서</p>
      </div>
      <div>
        {isLoggedIn && (
          <Link to="/my/sale/insert">
            <Button variant="contained" color="mainDarkBrown">
              게시글 작성하기
            </Button>
          </Link>
        )}
        <Styled.DropDownWrapper>
          <DropDown defaultValue={currentDropDownValue} setSelectedId={setCurrentDropDownValue}>
            <li>
              <Link to={removeQueryString(pathname, search, ["sort"])}>전체</Link>
            </li>
            <li>
              <Link id="date" to={makeNewQueryString(pathname, query, { sort: "date" })}>
                최신순
              </Link>
            </li>
            <li>
              <Link id="view" to={makeNewQueryString(pathname, query, { sort: "view" })}>
                조회순
              </Link>
            </li>
          </DropDown>
        </Styled.DropDownWrapper>
      </div>
    </Styled.UsedBookMenuWrapper>
  );
};

export default memo(UsedBookMenu);
