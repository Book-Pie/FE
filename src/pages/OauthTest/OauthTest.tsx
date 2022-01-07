import { useEffect } from "react";
import { Link } from "react-router-dom";

// ouath 개발 끝나면 지운 컴포넌트
const { Kakao }: any = window;

const OauthTest = () => {
  useEffect(() => {
    if (process.env.KAKAP_JDK_KEY && !Kakao.isInitialized()) {
      Kakao.init(process.env.KAKAP_JDK_KEY);
    }
  }, []);

  function kakaoLogout() {
    Kakao.Auth.login();
    if (!Kakao.Auth.getAccessToken()) {
      alert("Not logged in.");
      return;
    }
    Kakao.Auth.logout(function () {
      alert(`logout ok\naccess token -> ${Kakao.Auth.getAccessToken()}`);
    });
  }

  function unlinkApp() {
    Kakao.API.request({
      url: "/v1/user/unlink",
      success(res: any) {
        alert(`success: ${JSON.stringify(res)}`);
      },
      fail(err: any) {
        alert(`fail: ${JSON.stringify(err)}`);
      },
    });
  }

  return (
    <div>
      <div>카카오 api 토큰 기간만료 및 삭제 </div>
      <button className="api-btn" type="button" onClick={kakaoLogout}>
        로그아웃
      </button>
      <button className="api-btn" onClick={unlinkApp} type="button">
        앱 탈퇴하기
      </button>
      <button type="button">
        <Link to="/">홈으로</Link>
      </button>
    </div>
  );
};

export default OauthTest;
