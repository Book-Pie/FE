import { useHistory, useParams } from "react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import queryString from "query-string";
import { getKakaoOauth, getKakaoOauthAccessToken, getNaverOauthAccessToken } from "api/oauth";
import { userInfoAsync } from "modules/Slices/user/userSlice";
import { setAccessToken } from "utils/localStorageUtil";
import { useDispatch } from "react-redux";
import { errorHandler } from "api/http";
import Popup from "elements/Popup";
import { Link } from "react-router-dom";
import Loading from "elements/Loading";
import { Button } from "@mui/material";
import { getKakaoUnlink, setKakaoAccessToken } from "utils/oAuthUtil";
import * as Types from "./types";
import * as Styled from "./styles";

const Oauth = () => {
  const param = useParams<Types.OauthParam>();
  const query = useMemo(() => queryString.parse(window.location.search), []);
  const [popUpState, setPopUpstate] = useState({
    isSuccess: true,
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const oAuthFirstApiRef = useRef(false);

  const handleMyInfo = useCallback(
    (token: string) => {
      dispatch(userInfoAsync(token));
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
          const response = await getNaverOauthAccessToken(queryString.stringify(query));
          handleMyInfo(response.data.data);
        } else if (name === "kakao") {
          const kakaoRequestData: Types.KakaoRequest = {
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_CLIENT_ID ?? "",
            redirect_uri: process.env.KAKAO_REDIRECT_PATH ?? "",
            code: query.code,
          };
          const kakaoRequestQeury = Object.entries(kakaoRequestData)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join("&");

          const kakaoOauthResponse = await getKakaoOauth(kakaoRequestQeury);

          const { data } = kakaoOauthResponse;
          const token = data.access_token;
          setKakaoAccessToken(token);
          const response = await getKakaoOauthAccessToken(token);
          handleMyInfo(response.data.data);
        }
      } catch (error: any) {
        setIsOpen(true);
        setPopUpstate({
          isSuccess: false,
          message: errorHandler(error),
        });
        if (name === "kakao") getKakaoUnlink();
      } finally {
        setIsLoading(false);
      }
    },
    [query, handleMyInfo],
  );

  useEffect(() => {
    if (!oAuthFirstApiRef.current) handleOauth(param.name);
  }, [handleOauth, param]);

  return (
    <Styled.OauthContainer>
      {isOpen && (
        <Popup autoClose className="red" isOpen={isOpen} setIsOpen={setIsOpen}>
          {popUpState.message}
        </Popup>
      )}
      <Loading isLoading={isLoading} />
      <div id="naverIdLogin" />
      {popUpState.isSuccess || (
        <div className="isError">
          <p>
            <strong className={param.name === "naver" ? "naver" : ""}>{String(param.name).toUpperCase()}</strong>{" "}
            로그인에 실패했습니다.
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
