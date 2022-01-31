import { AxiosResponse } from "axios";
import { Suspense, useCallback, useRef } from "react";
import { useParams } from "react-router";
import { getUsedBook } from "src/api/usedBook";
import * as Styled from "components/SaleInsert/style";
import { CacheRefType, CreateResourceStatusType } from "../UsedBookList/types";
import B from "./B";
import A from "./A";
import SaleUpdateSkeleton from "./SaleUpdateSkeleton";

const cache: CacheRefType = {};
const SaleUpdate = () => {
  const { bookId } = useParams<{ bookId: string }>();

  const createResource = useCallback(function createResource<T>(promise: Promise<AxiosResponse<T>>) {
    let status: CreateResourceStatusType = "pending";
    let result: AxiosResponse<T>;

    const suspender = promise
      .then(resolved => {
        status = "success";
        result = resolved;
      })
      .catch(rejected => {
        status = "error";
        result = rejected;
      });

    return {
      read() {
        if (status === "pending") throw suspender;
        if (status === "error") throw result;
        if (status === "success") return result;
        throw new Error("This should be impossible");
      },
    };
  }, []);

  const handleResourceCache = useCallback(
    function handleResourceCache<T>(
      name: string,
      promise: <A>(id: string) => Promise<AxiosResponse<A>>,
      usedBookId: string,
    ) {
      const lowerName = name.toLowerCase();

      let resource = cache[lowerName];

      if (!resource) {
        resource = createResource(promise<T>(usedBookId));
        cache[lowerName] = resource;
      }
      return resource;
    },
    [createResource],
  );

  const usedBookResource = handleResourceCache("usedBook", getUsedBook, bookId);
  console.log(usedBookResource);

  return (
    <Styled.SaleInsertWrapper>
      <h1>수정이다 맨이야!!!!!!!!!!!</h1>
      <Suspense fallback={<div>이미지 로딩중 ...</div>}>
        <A resource={usedBookResource} />
      </Suspense>
      <Suspense fallback={<div>보더 로딩중 ...</div>}>
        <B resource={usedBookResource} />
      </Suspense>
    </Styled.SaleInsertWrapper>
  );
};

export default SaleUpdate;
