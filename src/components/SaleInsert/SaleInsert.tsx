import { useCallback, useEffect } from "react";
import { getCategorys, getUsedBook } from "api/usedBook";
import Popup from "elements/Popup";
import { useParams } from "react-router";
import { CacheRefType, CreateResourceStatusType } from "components/UsedBookList/types";
import usePopup from "hooks/usePopup";
import { AxiosResponse } from "axios";
import * as Styled from "./style";
import SaleInsertForm from "./SaleInsertForm";

const cache: CacheRefType = {};

const SaleInsert = () => {
  const { bookId } = useParams<{ bookId?: string }>();

  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;

  const createResource = useCallback(function createResource<T>(promise: Promise<AxiosResponse<T>>) {
    let status: CreateResourceStatusType = "pending";
    let result: AxiosResponse<T>;

    const suspender = promise
      .then(resolved => {
        status = "success";
        result = resolved;
        return resolved;
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

  const handleUsedBookResourceCache = useCallback(
    function handleUsedBookResourceCache(name: string) {
      const lowerName = name.toLowerCase();

      let resource = cache[lowerName];

      if (!resource) {
        if (bookId) {
          resource = createResource(getUsedBook(bookId));
        }
        cache[lowerName] = resource;
      }
      return resource;
    },
    [createResource, bookId],
  );

  const handleCategorysResourceCache = useCallback(
    function handleResourceCache(name: string) {
      const lowerName = name.toLowerCase();

      let resource = cache[lowerName];

      if (!resource) {
        resource = createResource(getCategorys());
        cache[lowerName] = resource;
      }
      return resource;
    },
    [createResource],
  );

  useEffect(() => {
    const cleanup = () => Object.keys(cache).forEach(key => delete cache[key]);
    return cleanup;
  }, []);

  const categoryResource = handleCategorysResourceCache("category");
  const usedBookResource = handleUsedBookResourceCache("usedBook");

  return (
    <Styled.SaleInsertWrapper>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} className={isSuccess ? "green" : "red"} autoClose>
          {message}
        </Popup>
      )}
      <Styled.Title>
        <span>기본정보</span>
        <span>*필수항목</span>
      </Styled.Title>
      <SaleInsertForm
        bookId={bookId}
        handlePopupMessage={handlePopupMessage}
        usedBookResource={usedBookResource}
        categoryResource={categoryResource}
      />
    </Styled.SaleInsertWrapper>
  );
};

export default SaleInsert;
