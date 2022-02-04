import queryString, { StringifiableRecord } from "query-string";

// usedBook?first=소설&second=과학&sort=date ===> usedBook?first=소설&second=과학&sort=date&newQuery=newQuery
// 현재 쿼리스트링에 새로운 쿼리스트링을 붙여준다.
export const makeNewQueryString = (path: string, currentQuery: StringifiableRecord, newQeury: StringifiableRecord) => {
  return queryString.stringifyUrl({
    url: `${path}`,
    query: {
      ...currentQuery,
      ...newQeury,
    },
  });
};

export const removeQueryString = (path: string, search: string, target: string[]) => {
  const fullPath = `${path}${search}`;
  return queryString.exclude(fullPath, target);
};
