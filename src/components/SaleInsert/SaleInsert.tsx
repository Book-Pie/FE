import { useEffect } from "react";
import Popup from "elements/Popup";
import { useLocation, useParams } from "react-router";
import { StateEnumType } from "components/UsedBookList/types";
import usePopup from "hooks/usePopup";
import client, { createResource } from "api/client";
import { CacheRefType } from "api/types";
import * as Styled from "./style";
import SaleInsertForm from "./SaleInsertForm";
import SaleInsertNotFound from "./SaleInsertNotFound";

const cache: CacheRefType = {};

const SaleInsert = () => {
  const { bookId } = useParams<{ bookId?: string }>();
  const { state } = useLocation<{ saleState: keyof StateEnumType } | undefined>();

  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;

  const handleResourceCache = (url: string, name: string, promise: (url: string) => Promise<any>) => {
    const lowerName = name.toLowerCase();
    let resource = cache[lowerName];
    if (!resource) {
      resource = createResource(promise(url));
      cache[lowerName] = resource;
    }
    return resource;
  };

  useEffect(() => {
    const cleanup = () => Object.keys(cache).forEach(key => delete cache[key]);
    return cleanup;
  }, []);

  if (state && state.saleState !== "SALE") return <SaleInsertNotFound state={state} />;

  const categorysResource = handleResourceCache("/usedbook/category", "category", client.get);
  const usedBookResource = bookId ? handleResourceCache(`/usedbook/${bookId}`, "usedbook", client.get) : undefined;

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
        categorysResource={categorysResource}
      />
    </Styled.SaleInsertWrapper>
  );
};

export default SaleInsert;
