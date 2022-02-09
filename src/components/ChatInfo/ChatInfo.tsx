import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import client, { errorHandler, handleResourceCache } from "src/api/client";
import { Button, TextField } from "@mui/material";
import { UserInfo } from "modules/Slices/user/types";
import { dateArrayFormat } from "src/utils/formatUtil";
import CloudIcon from "@mui/icons-material/Cloud";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { FormErrorMessages, hookFormHtmlCheck, makeOption } from "src/utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import { CacheRefType } from "src/api/types";
import usePopup from "src/hooks/usePopup";
import Popup from "src/elements/Popup";
import * as Styled from "./styles";
import * as Types from "./types";
import UsedbookInfo from "./UsedbookInfo";
import Skeletons from "./Skeletons";

const BASE_URL = process.env.CHAT_BASE_URL ?? "";
const init: Types.ChattingForm = { content: "" };
const cache: CacheRefType = {};

const ChatInfo = ({ user, state }: Types.ChatInfoProps) => {
  const [historys, setHistorys] = useState<Types.Historys>({
    bookId: 0,
    buyerId: 0,
    id: "",
    messages: [],
    sellerId: 0,
    topic: "",
  });
  const [connected, setConnected] = useState(false);
  const socket = useRef<StompJs.Client | null>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const { control, formState, handleSubmit, setValue } = useForm({ defaultValues: init });
  const { errors } = formState;
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, message } = popupState;
  const { buyerId, sellerId, usedBookId } = state;
  const TOPIC = `${usedBookId}-${sellerId}-${buyerId}`;
  const url = `${BASE_URL}/kafka/publish?topic=${TOPIC}&bookId=${usedBookId}&sellerId=${sellerId}&buyerId=${buyerId}`;

  const contentOptions: RegisterOptions = useMemo(
    () => ({
      required: makeOption<boolean>(true, FormErrorMessages.REQUIRED),
      maxLength: makeOption<number>(100, "최대 100자 입니다."),
      minLength: makeOption<number>(1, "최소 1자 입니다."),
      validate: {
        html: value => hookFormHtmlCheck(value, "HTML태그는 입력이 불가합니다."),
      },
    }),
    [],
  );

  const handleOnPublish = useCallback(
    async ({ content }: Types.ChattingForm) => {
      if (socket.current && socket.current.connected && user) {
        await client.post(url, { user: JSON.stringify(user), content, topic: TOPIC });
        setValue("content", "");
      }
    },
    [TOPIC, user, url, setValue],
  );

  const connect = useCallback(() => {
    socket.current = new StompJs.Client({
      webSocketFactory: () => new SockJS(`${BASE_URL}/chatting`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    socket.current.activate();
    socket.current.onConnect = () => {
      if (socket.current) {
        socket.current.subscribe(`/topic/${TOPIC}`, ({ body }) => {
          const parseObj = JSON.parse(body) as Types.ChattingInfo;
          setHistorys(prev => {
            return {
              ...prev,
              messages: [...prev.messages, parseObj],
            };
          });

          if (historyRef.current) {
            const { scrollHeight } = historyRef.current;
            historyRef.current.scrollTop = scrollHeight;
          }
        });
        setConnected(true);
      }
    };
  }, [TOPIC]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const { data } = await client.get<Types.HistorysReponse>(`${BASE_URL}/kafka/history?topic=${TOPIC}`);
        if (data !== null) {
          setHistorys(prev => ({
            ...prev,
            messages: prev.messages.concat(data.messages),
          }));
        }
      } catch (e) {
        const message = errorHandler(e);
        handlePopupMessage(false, message);
      }
    };

    fetchChatHistory();
  }, [TOPIC, state, handlePopupMessage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    connect();
    return () => {
      if (socket.current) socket.current.deactivate();
      Object.keys(cache).forEach(key => delete cache[key]);
    };
  }, [connect]);

  const usedbook = handleResourceCache(cache, `/usedbook/${usedBookId}`, "usedbook", client.get);

  return (
    <div>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} className="red" autoClose>
          {message}
        </Popup>
      )}
      <Suspense fallback={<Skeletons />}>
        <UsedbookInfo resource={usedbook} />
      </Suspense>
      <Styled.ChatTopWrapper>
        <CloudIcon color={connected ? "success" : "error"} />
        <span>topic {TOPIC}</span>
      </Styled.ChatTopWrapper>
      <Styled.ChatContentWrapper ref={historyRef}>
        {historys.messages.length ? (
          historys.messages.map(({ content, timestamp, user: otherUser }, idx) => {
            const otherObj = JSON.parse(otherUser) as UserInfo;
            const otherId = otherObj.id;
            const isMy = otherId === user.id;
            return (
              <div key={idx} className={isMy ? "my" : "other"}>
                <div>
                  <span>{content}</span>
                </div>
                <div>
                  <span>{dateArrayFormat(timestamp)[0]}</span>
                  <span>{dateArrayFormat(timestamp)[1]}</span>
                  <span className="nickname">({isMy ? "나" : otherObj.nickName})</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty">채팅이 없습니다.</div>
        )}
      </Styled.ChatContentWrapper>
      <Styled.ChatInputWrapper onSubmit={handleSubmit(handleOnPublish)}>
        <Controller
          name="content"
          control={control}
          rules={contentOptions}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="채팅을 입력해주세요."
              color="darkgray"
              disabled={!connected}
              type="text"
            />
          )}
        />
        <Button type="submit" color="mainDarkBrown" variant="contained">
          보내기
        </Button>
      </Styled.ChatInputWrapper>
      <ErrorMessage message={errors.content?.message} />
    </div>
  );
};

export default ChatInfo;
