import { useCallback, useState } from "react";
import Popup from "src/elements/Popup";
import { errorHandler } from "api/http";
import { getFindEmail } from "api/oauth";
import useDebounce from "hooks/useDebounce";
import { hyphenRemoveFormat } from "utils/formatUtil";
import useDelay from "hooks/useDelay";
import Form from "./Form";
import * as Types from "./types";
import * as Styled from "./style";

const FindEmail = () => {
  const [resulte, setResulte] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });
  const { isSuccess, message } = popUpState;
  const debounceRef = useDebounce();
  const delay = useDelay(200);

  const handlePopUp = useCallback((message: string, isSuccess: boolean) => {
    setPopUpState({
      isSuccess,
      message,
    });
    setIsOpen(true);
  }, []);

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
        handlePopUp("이메일 찾기에 성공했습니다.", true);
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
        <Popup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
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
