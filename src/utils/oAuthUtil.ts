const { Kakao }: any = window;

type SuccessCallBack = (res: any) => void;
type FaliCallBack = (err: any) => void;
const kakaoKey = process.env.KAKAO_JDK_KEY ?? "";

if (kakaoKey && !Kakao.isInitialized()) Kakao.init(kakaoKey);

export const getKakaoUnlink = (successCallBack?: SuccessCallBack, failCallBack?: FaliCallBack) => {
  Kakao.API.request({
    url: "/v1/user/unlink",
    success: successCallBack,
    fail: failCallBack,
  });
};

export const getKakaoAccessToken = () => Kakao.Auth.getAccessToken();
export const setKakaoAccessToken = (token: string) => Kakao.Auth.setAccessToken(token);
