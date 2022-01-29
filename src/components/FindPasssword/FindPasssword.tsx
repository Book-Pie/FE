import { useHistory } from "react-router";
import { useCallback, useState } from "react";
import Popup from "src/elements/Popup";
import { getFindPassword } from "api/oauth";
import { errorHandler } from "api/http";
import useDebounce from "hooks/useDebounce";
import { hyphenRemoveFormat } from "utils/formatUtil";
import useDelay from "hooks/useDelay";
import * as Types from "./types";
import Form from "./Form";
import * as Styled from "./style";

const FindPasssword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });
  const { isSuccess, message } = popUpState;
  const history = useHistory();
  const debounce = useDebounce();
  const delay = useDelay(300);

  const handlePopUp = useCallback((message: string, isSuccess: boolean) => {
    setPopUpState({
      isSuccess,
      message,
    });
    setIsOpen(true);
  }, []);

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

        handlePopUp("비밀번호 변경에 성공했습니다.", true);
        setTimeout(() => history.replace("/signIn"), 1700);
      } catch (error) {
        handlePopUp(errorHandler(error), false);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <section>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} className={isSuccess ? "green" : "red"} autoClose>
          <div>{message}</div>
        </Popup>
      )}
      <Styled.Title>비밀번호 변경</Styled.Title>
      <Form isLoading={isLoading} onSubmit={onSubmit} />
    </section>
  );
};

export default FindPasssword;
