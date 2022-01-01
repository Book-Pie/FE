import { memo } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import queryString from "query-string";
import { makeNewQueryString } from "utils/queryStringUtil";
import { CategorysWrapper, FirstCategory, SecondCategorys } from "./style";
import { CategorysProps } from "./types";

const Categorys = ({ categorys }: CategorysProps) => {
  const location = useLocation();
  const { pathname, search } = location;
  const queryObj = queryString.parse(search);

  return (
    <CategorysWrapper>
      {Object.entries(categorys).map(([firstCategory, secondCategorys], fIndex: number) => {
        return (
          <FirstCategory key={fIndex}>
            <span>{firstCategory}</span>
            <SecondCategorys>
              {secondCategorys.map((secondCategory, sIndex) => (
                <li key={sIndex}>
                  <Link to={makeNewQueryString(pathname, queryObj, { first: firstCategory, second: secondCategory })}>
                    {secondCategory}
                  </Link>
                </li>
              ))}
            </SecondCategorys>
          </FirstCategory>
        );
      })}
    </CategorysWrapper>
  );
};

export default memo(Categorys);
