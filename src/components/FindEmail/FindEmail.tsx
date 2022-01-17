import { useCallback, useState } from "react";
import Popup from "src/elements/Popup";
import { errorHandler } from "src/api/http";
import { getFindEmail } from "src/api/oauth";
import useDebounce from "hooks/useDebounce";
import { hyphenRemoveFormat } from "src/utils/formatUtil";
import useDelay from "src/hooks/useDelay";
import { IFindEmail } from "./types";
import Form from "./Form";
import { Result, Title } from "./style";

const FindEmail = () => {
  const [resulte, setResulte] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });
  const debounceRef = useDebounce();
  const delay = useDelay(600);

  const handlePopUp = useCallback((message: string, isSuccess: boolean) => {
    setPopUpState({
      isSuccess,
      message,
    });
    setIsOpen(true);
  }, []);

  const onSubmit = (formData: IFindEmail) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const { phone, name } = formData;
        setIsLoading(true);
        await delay();
        const { data } = await getFindEmail<IFindEmail>({ phone: hyphenRemoveFormat(phone), name });
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
    <>
      {isOpen && (
        <Popup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          autoClose
          className={popUpState.isSuccess ? "green" : "red"}
          closeDelay={2000}
        >
          <div>{popUpState.message}</div>
        </Popup>
      )}
      <Title>이메일 찾기</Title>
      <Form isLoading={isLoading} onSubmit={onSubmit} />
      {resulte && (
        <Result>
          <div>
            <p>이메일 확인 : </p>
            <p>{resulte}</p>
          </div>
        </Result>
      )}
    </>
  );
};

export default FindEmail;
