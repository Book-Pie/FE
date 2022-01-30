import { useHistory } from "react-router";
import { useState } from "react";
import Popup from "elements/Popup";
import { getFindPassword } from "api/user";
import { errorHandler } from "api/http";
import useDebounce from "hooks/useDebounce";
import { hyphenRemoveFormat } from "utils/formatUtil";
import useDelay from "hooks/useDelay";
import usePopup from "hooks/usePopup";
import * as Types from "./types";
import Form from "./Form";
import * as Styled from "./style";

const FindPasssword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;
  const history = useHistory();
  const debounce = useDebounce();
  const delay = useDelay(300);

  const onSubmit = (FormData: Types.FindPasswordForm) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        const { email, phone, password, name } = FormData;
        setIsLoading(true);
        getFindPassword<Types.FindPasswordForm>({
          email,
          name,
          phone: hyphenRemoveFormat(phone),
          password,
        });
        await delay();
        handlePopupMessage(true, "비밀번호 변경에 성공했습니다.");
        setTimeout(() => history.replace("/signIn"), 1700);
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
