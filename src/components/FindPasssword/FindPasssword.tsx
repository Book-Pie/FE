import { useHistory } from "react-router";
import { useState } from "react";
import Popup from "elements/Popup";
import useDebounce from "hooks/useDebounce";
import { hyphenRemoveFormat } from "utils/formatUtil";
import usePopup from "hooks/usePopup";
import client, { errorHandler } from "api/client";
import * as Types from "./types";
import Form from "./Form";
import * as Styled from "./style";

const FindPasssword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;
  const history = useHistory();
  const debounce = useDebounce();

  const onSubmit = ({ email, phone, password, name }: Types.FindPasswordForm) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setIsLoading(true);
      client
        .post("/user/find/password", {
          email,
          name,
          phone: hyphenRemoveFormat(phone),
          password,
        })
        .then(() => {
          handlePopupMessage(true, "비밀번호 변경에 성공했습니다.");
          setTimeout(() => history.replace("/signIn"), 1700);
        })
        .catch(error => {
          const message = errorHandler(error);
          handlePopupMessage(false, message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  };

  return (
    <section>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} className={isSuccess ? "green" : "red"} autoClose>
          <div>{message}</div>
        </Popup>
      )}
      <Styled.Title>비밀번호 변경</Styled.Title>
      <Form isLoading={isLoading} onSubmit={onSubmit} />
    </section>
  );
};

export default FindPasssword;
