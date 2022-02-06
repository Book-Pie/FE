import ChatInfo from "src/components/ChatInfo/ChatInfo";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useTypedSelector } from "src/modules/store";
import * as Styled from "./styles";

const Chat = () => {
  const { isLoggedIn, user } = useTypedSelector(userReduceSelector);

  if (isLoggedIn && user) {
    return (
      <Styled.ChatContainer>
        <ChatInfo user={user} />
      </Styled.ChatContainer>
    );
  }
  return null;
};

export default Chat;
