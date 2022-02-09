import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import Popup from "elements/Popup";
import client, { errorHandler } from "api/client";
import { useLocation } from "react-router";
import queryString from "query-string";
import Loading from "elements/Loading";
import usePopup from "src/hooks/usePopup";
import { useInfiniteQuery } from "react-query";
import useInfiniteScroll from "src/hooks/useInfiniteScroll";
import useDelay from "src/hooks/useDelay";
import UsedBookCategorys from "./UsedBookCategorys";
import * as Types from "./types";
import UsedBookSkeleton from "./UsedBookSkeleton";
import UsedBookFilter from "./UsedBookFilter";
import UsedBookMenu from "./UsedBookMenu";
import UsedBookSearch from "./UsedBookSearch";
import UsedBookCards from "./UsedBookCards";
import Skeletons from "./Skeletons";

const UsedBookList = () => {
  const pageCountRef = useRef(9999);
  const pageRef = useRef(1);
  const location = useLocation();
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, message } = popupState;
  const { count, handleObserver } = useInfiniteScroll(pageCountRef.current);
  const { search } = location;
  const delay = useDelay(400);
  const query = useMemo(() => queryString.parse(search), [search]);

  const fetchUsedBooklist = useCallback(
    async ({ pageParam = 1 }) => {
      pageRef.current = pageParam;
      const newQuery = queryString.stringify({ ...query });
      const { data } = await client.get<Types.UsedBookListResponse>(`/usedbook?page=${pageParam}&${newQuery}`);
      await delay();
      return { ...data, nextPage: pageParam + 1, isEmpty: data.pages.length === 0 };
    },
    [query, delay],
  );

  const { data, isError, isLoading, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ["/usedbook", query],
    fetchUsedBooklist,
    {
      getNextPageParam: lastPage => {
        if (lastPage.nextPage !== pageCountRef.current + 1) return lastPage.nextPage;
        return undefined;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
      staleTime: 10000,
    },
  );

  useEffect(() => {
    if (data) {
      pageRef.current += 1;
      pageCountRef.current = data.pages[0].pageCount;
    }
  }, [data]);

  useEffect(() => {
    if (count > 1) fetchNextPage();
  }, [fetchNextPage, count]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isError) handlePopupMessage(false, errorHandler(error));
  }, [isError, handlePopupMessage, error]);

  return (
    <section>
      <Loading isLoading={isFetching} />
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} className="red" autoClose closeDelay={4000}>
          {message}
        </Popup>
      )}
      <UsedBookFilter query={query} />
      <Suspense fallback={<UsedBookSkeleton type="category" />}>
        <UsedBookCategorys defaultLocation="usedBook" />
      </Suspense>
      <UsedBookSearch query={query} />
      <UsedBookMenu query={query} />
      {isLoading ? <Skeletons /> : <UsedBookCards data={data} handleObserver={handleObserver} />}
    </section>
  );
};

export default UsedBookList;
