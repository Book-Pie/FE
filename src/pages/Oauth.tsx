import { useHistory, useParams } from "react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import queryString from "query-string";
import { fetchUserInfoAsync } from "modules/Slices/user/userSlice";
import { setAccessToken } from "utils/localStorageUtil";
import { useDispatch } from "react-redux";
import Popup from "elements/Popup";
import { Link } from "react-router-dom";
import Loading from "elements/Loading";
import { Button } from "@mui/material";
import { getKakaoUnlink, setKakaoAccessToken } from "utils/oAuthUtil";
import client, { makeKaKaoOauthHeader, errorHandler } from "api/client";
import usePopup from "src/hooks/usePopup";
import * as Types from "./types";
import * as Styled from "./styles";

const Oauth = () => {
  const param = useParams<Types.OauthParam>();
  const query = useMemo(() => queryString.parse(window.location.search), []);
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const oAuthFirstApiRef = useRef(false);

  const handleFatchUserInfo = useCallback(
    (token: string) => {
      dispatch(fetchUserInfoAsync(token));
      setAccessToken(token);
      history.replace("/");
    },
    [dispatch, history],
  );

  const handleOauth = useCallback(
    async (name: string) => {
      try {
        if (typeof query.code !== "string") throw new Error("옳바른 요청이 아닙니다.");
        oAuthFirstApiRef.current = true;
        if (name === "naver") {
          const { data } = await client.get<Types.OauthAccessTokenResponse>(
            `/oauth/login/naver?${queryString.stringify(query)}`,
          );
          handleFatchUserInfo(data);
        } else if (name === "kakao") {
          const kakaoRequestData: Types.KakaoPayload = {
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_CLIENT_ID ?? "",
            redirect_uri: process.env.KAKAO_REDIRECT_PATH ?? "",
            code: query.code,
          };
          const kakaoRequestQeury = Object.entries(kakaoRequestData)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join("&");

          const { access_token: token } = await client.post<string, any>(
            "https://kauth.kakao.com/oauth/token",
            kakaoRequestQeury,
            makeKaKaoOauthHeader(),
          );
          setKakaoAccessToken(token);
          const { data } = await client.get<Types.OauthAccessTokenResponse>(`/oauth/login/kakao/${token}`);
          handleFatchUserInfo(data);
        }
      } catch (error: any) {
        handlePopupMessage(false, errorHandler(error));
        if (name === "kakao") getKakaoUnlink();
      } finally {
        setIsLoading(false);
      }
    },
    [query, handleFatchUserInfo, handlePopupMessage],
  );

  useEffect(() => {
    if (!oAuthFirstApiRef.current) handleOauth(param.name);
  }, [handleOauth, param]);

  return (
    <Styled.OauthContainer>
      {isOpen && (
        <Popup autoClose className="red" isOpen={isOpen} setIsOpen={handlePopupClose}>
          {message}
        </Popup>
      )}
      <Loading isLoading={isLoading} />
      <div id="naverIdLogin" />
      {isSuccess || (
        <div className="isError">
          <p>
            <strong className={param.name}>{param.name.toUpperCase()}</strong> 로그인에 실패했습니다.
          </p>
          <p>에러가 발생했습니다.</p>
          <p>빠르게 조치하겠습니다.</p>
          <p>고객님 죄송합니다. </p>

          <Link to="/">
            <Button variant="contained" color="mainDarkBrown">
              메인으로
            </Button>
          </Link>
        </div>
      )}
    </Styled.OauthContainer>
  );
};

export default Oauth;
