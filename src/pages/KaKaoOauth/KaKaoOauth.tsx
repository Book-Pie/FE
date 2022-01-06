import { useCallback, useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import http, { errorHandler } from "src/api/http";
import { setAccessToken } from "utils/localStorageUtil";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { kakaoOauth } from "src/api/oauth/oauth";
import { useDispatch } from "react-redux";
import { myProfileAsync } from "modules/Slices/signInSlice";
import Popup from "components/Popup/Popup";

const KaKaoOauth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const query = useMemo(() => queryString.parse(window.location.search), []);

  const kakao = useCallback(() => {
    (async () => {
      try {
        if (typeof query.code === "string") {
          const kakaoRequestData: { [key: string]: string } = {
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_CLIENT_ID ?? "",
            redirect_uri: "http://localhost:3000/oAuth/kakao",
            code: query.code,
          };

          const kakaoRequestQeury = Object.entries(kakaoRequestData)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join("&");

          const kakaoOauthResponse = await kakaoOauth(kakaoRequestQeury); // 에러처리

          const { data } = kakaoOauthResponse;
          const token = data.access_token;
          const response = await http.get(`/oauth/login/kakao/${token}`);
          dispatch(myProfileAsync(response.data.data)); // 에러처리
          setAccessToken(response.data.data);
          history.replace("/");
        }
      } catch (error) {
        const message = errorHandler(error);
        setIsOpen(true);
        setMessage(message);
      }
    })();
  }, [query, history, dispatch]);

  useEffect(kakao, [kakao]);

  return (
    <div>
      {isOpen && (
        <Popup autoClose className="red" isOpen={isOpen} setIsOpen={setIsOpen}>
          {message}
        </Popup>
      )}
      kakao Oauth 로딩중 ...
      <div>
        <Link to="/">홈으로</Link>
      </div>
    </div>
  );
};

export default KaKaoOauth;
