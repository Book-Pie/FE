import { useState } from "react";
import Popup from "elements/Popup";
import { errorHandler } from "api/http";
import { getFindEmail } from "api/user";
import useDebounce from "hooks/useDebounce";
import { hyphenRemoveFormat } from "utils/formatUtil";
import useDelay from "hooks/useDelay";
import usePopup from "hooks/usePopup";
import Form from "./Form";
import * as Types from "./types";
import * as Styled from "./style";

const FindEmail = () => {
  const [resulte, setResulte] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useDebounce();
  const delay = useDelay(200);
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;

  const onSubmit = (formData: Types.FindEmailForm) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const { phone, name } = formData;
        setIsLoading(true);
        await delay();
        const { data } = await getFindEmail<Types.FindEmailForm>({ phone: hyphenRemoveFormat(phone), name });
        const email = data.data;
        setResulte(email);
        handlePopupMessage(true, "이메일 찾기에 성공했습니다.");
      } catch (error) {
        const message = errorHandler(error);
        handlePopupMessage(false, message);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <section>
      {isOpen && (
        <Popup
          isOpen={isOpen}
          setIsOpen={handlePopupClose}
          className={isSuccess ? "green" : "red"}
          closeDelay={2000}
          autoClose
        >
          <div>{message}</div>
        </Popup>
      )}
      <Styled.Title>이메일 찾기</Styled.Title>
      <Form isLoading={isLoading} onSubmit={onSubmit} />
      {resulte && (
        <Styled.Result>
          <h2>고객님이 찾으신 이메일</h2>
          <div>
            <span>이메일 확인</span> <span>{resulte}</span>
          </div>
        </Styled.Result>
      )}
    </section>
  );
};

export default FindEmail;
