import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client, { errorHandler } from "src/api/client";
import Popup from "src/elements/Popup";
import usePopup from "src/hooks/usePopup";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useTypedSelector } from "src/modules/store";
import noProfile from "assets/image/noProfile.jpg";
import CloudIcon from "@mui/icons-material/Cloud";
import { useTheme } from "styled-components";
import * as Styled from "./styles";
import * as Types from "./types";

const BASE_URL = process.env.CHAT_BASE_URL ?? "";

const ChatList = () => {
  const [chatList, setChatList] = useState<Types.ChatListState[]>([]);
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, message } = popupState;
  const { user } = useTypedSelector(userReduceSelector);
  const theme = useTheme();

  /**
   *  1. 판매자,구매자 채팅 내역을 가져온다.
   *  2. 유니크한 bookId를 이용하여 book상세를 가져온다.
   *  3. bookId로 조회했는데 없는 데이트는 promise catch에서 핸들링을 해서 data : null을 넣어준다.
   *  4. filter를 통해 에러데이터는 없애고 유효한 데이터만 채팅내역과 합친다.
   *  5. 채팅은 새로 작성할때 마다 updateDate가 갱신이 되어 맨위로 올라간다.
   */
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        if (!user) throw new Error("로그인이 필요합니다.");
        const { id } = user;
        const [{ data: sellerData }, { data: buyerData }] = await axios.all([
          client.get<Types.SellerChatListResponse>(`${BASE_URL}/kafka/list/seller/${id}`),
          client.get<Types.SellerChatListResponse>(`${BASE_URL}/kafka/list/buyer/${id}`),
        ]);
        const combineData = [...sellerData, ...buyerData];
        const promisesResolved = combineData
          .map(({ bookId }) => client.get<Types.UsedbookDetailResponse>(`/usedbook/${bookId}`))
          .map(promise => promise.catch(e => ({ success: false, data: null, error: errorHandler(e) })));

        const checkFailed: Types.CheckFailedType = responses => responses.filter(({ data }) => data !== null);

        const usedbookResponses = (await axios
          .all(promisesResolved)
          .then(checkFailed)) as Types.UsedbookDetailResponse[];

        const usedbookAndChatCombineData = usedbookResponses
          .map(({ data }) => {
            const { usedBookId } = data;
            const [findChatData] = combineData.filter(({ bookId }) => bookId === usedBookId);
            return {
              ...findChatData,
              bookInfo: data,
            };
          })
          .sort((acc, cur) => {
            const date1 = new Date(acc.updateDate).getTime();
            const date2 = new Date(cur.updateDate).getTime();
            return date2 - date1;
          });

        setChatList(usedbookAndChatCombineData);
      } catch (e) {
        handlePopupMessage(false, errorHandler(e));
      }
    };

    fetchChatList();
  }, [user, handlePopupMessage]);

  return (
    <Styled.ChatListWrapper>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} autoClose className="red">
          {message}
        </Popup>
      )}

      <Typography variant="h4" pt={2} pb={1} fontWeight="bold" sx={{ color: theme.colors.mainDarkBrown }}>
        채팅방 목록
      </Typography>

      <div>
        {chatList.length ? (
          chatList.map(seller => {
            const { bookId: usedBookId, buyerId, sellerId, bookInfo, topic, id } = seller;
            const state = {
              usedBookId,
              sellerId,
              buyerId,
            };
            return (
              <Styled.ChatListCard key={id}>
                <Link to={{ pathname: "/chat", state }}>
                  <div>
                    <img className="ChatListCard__noProfile" src={noProfile} alt="noProfile" />
                    <div>
                      <div className="ChatListCard__number">
                        <CloudIcon color="success" />
                        <span>{topic}</span>
                      </div>
                      <div className="ChatListCard__bookName">{bookInfo.title}</div>
                    </div>
                  </div>
                  <img
                    className="ChatListCard__bookImg"
                    src={`${process.env.BASE_URL}/image/${bookInfo.images[0]}`}
                    alt="usedBookimg"
                  />
                </Link>
              </Styled.ChatListCard>
            );
          })
        ) : (
          <div className="chatList__empty">채팅방이없습니다.</div>
        )}
      </div>
    </Styled.ChatListWrapper>
  );
};

export default ChatList;
