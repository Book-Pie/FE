import { useEffect } from "react";
import { useHistory } from "react-router";
import ChatInfo from "src/components/ChatInfo/ChatInfo";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useTypedSelector } from "src/modules/store";
import * as Styled from "./styles";

const Chat = () => {
  const { isLoggedIn, user } = useTypedSelector(userReduceSelector);
  const history = useHistory();
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      history.replace("/");
    }
  }, [history, isLoggedIn]);

  if (isLoggedIn && user) {
    return (
      <Styled.ChatContainer>
        <ChatInfo user={user} />
      </Styled.ChatContainer>
    );
  }
  return <Styled.ChatEmpty />;
};

export default Chat;
