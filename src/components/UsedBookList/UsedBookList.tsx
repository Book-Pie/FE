import { Suspense, useEffect, useMemo, useState } from "react";
import Popup from "elements/Popup";
import client, { errorHandler } from "api/client";
import { useLocation } from "react-router";
import queryString from "query-string";
import noUsedBookCard from "assets/image/noComments.png";
import Loading from "elements/Loading";
import usePopup from "src/hooks/usePopup";
import { QueryFunctionContext, useQuery } from "react-query";
import useDelay from "src/hooks/useDelay";
import useInfiniteScroll from "src/hooks/useInfiniteScroll";
import UsedBookCategorys from "./UsedBookCategorys";
import * as Types from "./types";
import * as Styled from "./style";
import UsedBookSkeleton from "./UsedBookSkeleton";
import UsedBookFilter from "./UsedBookFilter";
import UsedBookMenu from "./UsedBookMenu";
import UsedBookSearch from "./UsedBookSearch";
import UsedBookCards from "./UsedBookCards";
import Skeletons from "./Skeletons";

const initialState = {
  pages: [],
  pageCount: 1,
  page: 1,
  isEmpty: false,
};

const UsedBookList = () => {
  const location = useLocation();
  const [usedBook, setUsedBook] = useState<Types.UsedBookState>(initialState);

  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, message } = popupState;
  const { pages, pageCount, isEmpty } = usedBook;
  const { count, handleObserver } = useInfiniteScroll(pageCount);
  const { search } = location;
  const delay = useDelay(400);
  const query = useMemo(() => queryString.parse(search), [search]);

  const { data, isError, error, isFetching } = useQuery(
    ["/usedbook", count, query],
    async ({ queryKey }: QueryFunctionContext) => {
      const [path, page, currentQuery] = queryKey;
      let newQueryString = "";
      if (typeof currentQuery === "object") newQueryString = queryString.stringify({ ...currentQuery, page });
      await delay();
      const url = `${path}?${newQueryString}`;
      return client.get<Types.UsedBookListResponse>(url);
    },
    {
      staleTime: 6000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    if (Object.keys(query).length !== 0) setUsedBook(initialState);
  }, [query]);

  useEffect(() => {
    if (data && isFetching === false) {
      const { pages, pageCount } = data.data;

      setUsedBook(prev => ({
        ...prev,
        pageCount,
        isEmpty: pages.length === 0,
        pages: [...prev.pages, ...pages],
      }));
    }
  }, [data, isFetching]);

  useEffect(() => {
    if (isError) handlePopupMessage(false, errorHandler(error));
  }, [isError, error, handlePopupMessage]);

  return (
    <section>
      <Loading isLoading={isFetching} />
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} className="red" autoClose>
          {message}
        </Popup>
      )}
      <UsedBookFilter query={query} />
      <Suspense fallback={<UsedBookSkeleton type="category" />}>
        <UsedBookCategorys defaultLocation="usedBook" />
      </Suspense>
      <UsedBookSearch query={query} />
      <UsedBookMenu query={query} />
      <Styled.UsedBookCardsWrapper>
        {isEmpty ? (
          <Styled.UsedBookCardEmpty>
            <span>등록된 글이 없습니다.</span>
            <span>글을 작성해주세요.</span>
            <span>
              <img src={noUsedBookCard} alt="noUsedBookCard" />
            </span>
          </Styled.UsedBookCardEmpty>
        ) : isFetching ? (
          <Skeletons />
        ) : (
          <UsedBookCards pages={pages} handleObserver={handleObserver} />
        )}
      </Styled.UsedBookCardsWrapper>
    </section>
  );
};

export default UsedBookList;
