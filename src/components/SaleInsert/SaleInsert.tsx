import { useEffect } from "react";
import Popup from "elements/Popup";
import { useLocation, useParams } from "react-router";
import { StateEnumType } from "components/UsedBookList/types";
import usePopup from "hooks/usePopup";
import client, { handleResourceCache } from "api/client";
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

  useEffect(() => {
    const cleanup = () => Object.keys(cache).forEach(key => delete cache[key]);
    return cleanup;
  }, []);

  if (state && state.saleState !== "SALE") return <SaleInsertNotFound state={state} />;

  const usedBookResource = bookId
    ? handleResourceCache(cache, `/usedbook/${bookId}`, "usedbook", client.get)
    : undefined;

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
      <SaleInsertForm bookId={bookId} handlePopupMessage={handlePopupMessage} usedBookResource={usedBookResource} />
    </Styled.SaleInsertWrapper>
  );
};

export default SaleInsert;
