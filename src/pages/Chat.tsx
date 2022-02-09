import { Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import ChatInfo from "src/components/ChatInfo/ChatInfo";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useTypedSelector } from "src/modules/store";
import * as Styled from "./styles";
import * as Types from "./types";

const Chat = () => {
  const { user } = useTypedSelector(userReduceSelector);
  const history = useHistory();
  const { state } = useLocation<Types.LocationState>();

  const handleGoback = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    if (!state) {
      alert("옳바른 경로가 아닙니다.");
      handleGoback();
    }
  }, [history, state, handleGoback]);

  if (user && state) {
    return (
      <Styled.ChatContainer>
        <ChatInfo user={user} state={state} />
        <Button fullWidth color="darkgray" sx={{ height: 50 }} variant="contained" onClick={handleGoback}>
          뒤로가기
        </Button>
      </Styled.ChatContainer>
    );
  }
  return <Styled.ChatEmpty />;
};

export default Chat;
