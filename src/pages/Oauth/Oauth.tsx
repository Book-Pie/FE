import { useHistory, useParams } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { kakaoOauth, kakaoOauthAccessToken, naverOauthAccessToken } from "src/api/oauth/oauth";
import { myProfileAsync } from "src/modules/Slices/signIn/signInSlice";
import { setAccessToken } from "utils/localStorageUtil";
import { useDispatch } from "react-redux";
import { errorHandler } from "src/api/http";
import Popup from "components/Popup/Popup";
import { Link } from "react-router-dom";

interface IParam {
  name: "naver" | "kakao";
}

interface IKakaoRequestData {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
}

const Oauth = () => {
  const param = useParams<IParam>();
  const dispatch = useDispatch();
  const query = useMemo(() => queryString.parse(window.location.search), []);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleError = useCallback((error: any) => {
    const message = errorHandler(error);
    setIsOpen(true);
    setMessage(message);
  }, []);

  const handleMyProfile = useCallback(
    (token: string) => {
      dispatch(myProfileAsync(token));
      setAccessToken(token);
      history.replace("/");
    },
    [dispatch, history],
  );

  const handleNaverOauth = useCallback(async () => {
    try {
      if (typeof query.code !== "string") throw new Error("옳바른 요청이 아닙니다.");
      const response = await naverOauthAccessToken(queryString.stringify(query));
      handleMyProfile(response.data.data);
    } catch (error) {
      handleError(error);
    }
  }, [query, handleError, handleMyProfile]);

  const handleKakaoOauth = useCallback(async () => {
    console.log("카카오 oauth 시작");
    try {
      if (typeof query.code !== "string") throw new Error("옳바른 요청이 아닙니다.");
      const kakaoRequestData: IKakaoRequestData = {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_CLIENT_ID ?? "",
        redirect_uri: "http://localhost:3000/oAuth/kakao",
        code: query.code,
      };
      const kakaoRequestQeury = Object.entries(kakaoRequestData)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&");

      const kakaoOauthResponse = await kakaoOauth(kakaoRequestQeury);

      const { data } = kakaoOauthResponse;
      const token = data.access_token;
      const response = await kakaoOauthAccessToken(token);
      handleMyProfile(response.data.data);
    } catch (error) {
      handleError(error);
    }
  }, [query, handleError, handleMyProfile]);

  const handleOauth = () => {
    if (param.name === "naver") {
      handleNaverOauth();
    }
    if (param.name === "kakao") {
      handleKakaoOauth();
    }
  };

  useEffect(handleOauth, []);

  return (
    <div>
      {isOpen && (
        <Popup autoClose className="red" isOpen={isOpen} setIsOpen={setIsOpen}>
          {message}
        </Popup>
      )}
      <div>
        Oauth 공통페이지
        <Link to="/">홈으로</Link>
      </div>
    </div>
  );
};

export default Oauth;
