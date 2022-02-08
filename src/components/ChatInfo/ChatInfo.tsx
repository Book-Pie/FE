import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useHistory, useLocation } from "react-router";
import client, { handleResourceCache } from "src/api/client";
import { Button, TextField } from "@mui/material";
import { UserInfo } from "modules/Slices/user/types";
import { dateArrayFormat } from "src/utils/formatUtil";
import CloudIcon from "@mui/icons-material/Cloud";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { FormErrorMessages, hookFormHtmlCheck, makeOption } from "src/utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import { CacheRefType } from "src/api/types";
import * as Styled from "./styles";
import * as Types from "./types";
import UsedbookInfo from "./UsedbookInfo";
import Skeletons from "./Skeletons";

const BASE_URL = "http://ec2-3-34-249-63.ap-northeast-2.compute.amazonaws.com:8081";
const init: Types.ChattingForm = { content: "" };
const cache: CacheRefType = {};

const ChatInfo = ({ user }: Types.ChatInfoProps) => {
  const [chattings, setChattings] = useState<Types.Chatting>({
    bookId: 0,
    buyerId: 0,
    id: "",
    messages: [],
    sellerId: 0,
    topic: "",
  });
  const [connected, setConnected] = useState(false);
  const socket = useRef<StompJs.Client | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { state } = useLocation<Types.State>();
  const { control, formState, handleSubmit, setValue } = useForm({ defaultValues: init });
  const { errors } = formState;
  const history = useHistory();

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

  // 토픽은 sellerid + buyerid(userId) + usedbookid
  const TOPIC = `${state.usedBookId}-${state.sellerId}-${user?.id}`;

  const handleOnPublish = useCallback(
    async ({ content }: Types.ChattingForm) => {
      if (socket.current && socket.current.connected && user) {
        await client.post(
          `${BASE_URL}/kafka/publish?topic=${TOPIC}&bookId=${state.usedBookId}&sellerId=${state.sellerId}&buyerId=${user?.id}`,
          { user: JSON.stringify(user), content },
        );
        setValue("content", "");
      }
    },
    [TOPIC, user, state, setValue],
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
          const obj = JSON.parse(body) as Types.ChattingInfo;
          setChattings(prev => {
            return {
              ...prev,
              messages: [...prev.messages, obj],
            };
          });

          if (contentRef.current) {
            const { scrollHeight } = contentRef.current;
            contentRef.current.scrollTop = scrollHeight;
          }
        });
        setConnected(true);
      }
    };
  }, [TOPIC]);

  useEffect(() => {
    window.scrollTo(0, 0);
    connect();
    return () => {
      if (socket.current) socket.current.deactivate();
    };
  }, [connect]);

  useEffect(() => {
    client.get<Types.ChattingReponse>(`${BASE_URL}/kafka/history?topic=${TOPIC}`).then(response => {
      if (typeof response === "string") return;

      setChattings(prev => ({
        ...prev,
        messages: [...prev.messages, ...response.messages],
      }));
    });
  }, [TOPIC, state]);

  const usedbook = handleResourceCache(cache, `/usedbook/${state.usedBookId}`, "usedbook", client.get);

  return (
    <>
      <Suspense fallback={<Skeletons />}>
        <UsedbookInfo resource={usedbook} />
      </Suspense>
      <Styled.ChatTopWrapper>
        <CloudIcon color={connected ? "success" : "error"} />
        <span>topic {TOPIC}</span>
      </Styled.ChatTopWrapper>
      <Styled.ChatContentWrapper ref={contentRef}>
        {chattings.messages.length ? (
          chattings.messages.map(({ content, timestamp, user: otherUser }, idx) => {
            const otherObj = JSON.parse(otherUser) as UserInfo;
            const otherId = otherObj.id;
            const isMy = otherId === user.id;
            return (
              <div key={idx} className={isMy ? "my" : "other"}>
                <div>
                  <p>{content}</p>
                </div>
                <div>
                  <span>{dateArrayFormat(timestamp)[0]}</span>
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
              placeholder="입력해주세요."
              color="darkgray"
              disabled={!connected}
              type="text"
            />
          )}
        />
        <Button type="submit" color="secondary" variant="contained">
          보내기
        </Button>
      </Styled.ChatInputWrapper>
      <ErrorMessage message={errors.content?.message} />
      <Button fullWidth color="info" variant="contained" onClick={() => history.goBack()}>
        뒤로가기
      </Button>
    </>
  );
};

export default ChatInfo;
