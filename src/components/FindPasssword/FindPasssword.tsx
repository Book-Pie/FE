import { useHistory } from "react-router";
import { useCallback, useState } from "react";
import Popup from "components/Popup/Popup";
import { getFindPassword } from "src/api/oAuth/oAuth";
import { errorHandler } from "src/api/http";
import useDebounce from "hooks/useDebounce";
import { hyphenRemoveFormat } from "src/utils/formatUtil";
import useDelay from "src/hooks/useDelay";
import { IFindPassword } from "./types";
import Form from "./Form";
import { Title } from "./style";

const FindPasssword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });
  const history = useHistory();
  const debounce = useDebounce();
  const delay = useDelay(600);

  const handlePopUp = useCallback((message: string, isSuccess: boolean) => {
    setPopUpState({
      isSuccess,
      message,
    });
    setIsOpen(true);
  }, []);

  const onSubmit = (FormData: IFindPassword) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        const { email, phone, password, name } = FormData;
        setIsLoading(true);
        getFindPassword<IFindPassword>({
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
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} className={popUpState.isSuccess ? "green" : "red"} autoClose>
          <div>{popUpState.message}</div>
        </Popup>
      )}
      <Title>비밀번호 변경</Title>
      <Form isLoading={isLoading} onSubmit={onSubmit} />
    </>
  );
};

export default FindPasssword;
