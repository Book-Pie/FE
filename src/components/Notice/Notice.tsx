import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import client, { errorHandler } from "api/client";
import { dateArrayFormat } from "utils/formatUtil";
import { Link } from "react-router-dom";
import usePopup from "hooks/usePopup";
import Popup from "elements/Popup";
import * as Styled from "./styles";
import * as Types from "./types";

const Notice = () => {
  const [notice, setNotice] = useState<Types.NoticeState>();
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;
  useEffect(() => {
    client
      .get<Types.NoticeResponse>("/board/getAll?boardType=NOTICE&page=0&size=20")
      .then(({ data }) => setNotice(data.content))
      .catch(e => {
        handlePopupMessage(false, errorHandler(e));
      });
  }, [handlePopupMessage]);

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} autoClose className={isSuccess ? "green" : "red"}>
          {message}
        </Popup>
      )}
      <Styled.NoticeWrapper>
        <Styled.NoticeTitle>공지사항</Styled.NoticeTitle>
        <Grid container className="header">
          <Grid item xs={2.5} sm={1}>
            <Styled.NoticeRow>번호</Styled.NoticeRow>
          </Grid>
          <Grid item xs={6} sm={8}>
            <Styled.NoticeRow>제목</Styled.NoticeRow>
          </Grid>
          <Grid item xs={3.5} sm={3}>
            <Styled.NoticeRow>등록일</Styled.NoticeRow>
          </Grid>
        </Grid>
        {notice &&
          notice.map(({ boardId, boardDate, title }) => (
            <Grid container className="body" key={boardId}>
              <Grid item xs={2.5} sm={1}>
                <Styled.NoticeRow>{boardId}</Styled.NoticeRow>
              </Grid>
              <Grid item xs={6} sm={8}>
                <Styled.NoticeRow>
                  <Link to="community" className="title">
                    {title}
                  </Link>
                </Styled.NoticeRow>
              </Grid>
              <Grid item xs={3.5} sm={3}>
                <Styled.NoticeRow>
                  <span>{dateArrayFormat(boardDate)[0]}</span>
                  <span>{dateArrayFormat(boardDate)[1]}</span>
                </Styled.NoticeRow>
              </Grid>
            </Grid>
          ))}
      </Styled.NoticeWrapper>
    </>
  );
};

export default Notice;
