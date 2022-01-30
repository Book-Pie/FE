import { Link } from "react-router-dom";
import naverImg from "assets/image/naver_oauth.png";
import kakaoImg from "assets/image/kakao_oauth.png";
import logo from "assets/image/logo-removebg.png";
import SignInForm from "components/SignInForm/SignInForm";
import { ChangeEvent, useState } from "react";
import { getRememberEmail } from "utils/localStorageUtil";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as Styled from "./style";

const kakaOauthUrl = process.env.KAKAO_OAUTH_URL ?? "";
const naverOauthUrl = process.env.NAVER_OAUTH_URL ?? "";

const SignIn = () => {
  const [isRemember, setIsRemember] = useState(getRememberEmail() ? true : false);
  const handleOnChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => setIsRemember(checked);

  return (
    <Styled.SignInContainer>
      <Styled.TitleImg>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </Styled.TitleImg>
      <div>
        <Styled.Left>
          <h1>로그인 하기</h1>
          <SignInForm isRemember={isRemember} />
          <Styled.Links>
            <div>
              <FormControlLabel
                control={<Checkbox color="mainDarkBrown" onChange={handleOnChange} checked={isRemember} />}
                label="아이디 저장"
              />
              <div>
                <span>
                  <Link to="/find/email">이메일 찾기</Link>
                </span>
                <span>
                  <Link to="/find/password">비밀번호 찾기</Link>
                </span>
              </div>
            </div>
            <div>
              <p>아직 회원이 아니신가요?</p>
              <span>
                <Link to="/signup">회원가입</Link>
              </span>
            </div>
          </Styled.Links>
          <Styled.Oauths>
            <a href={naverOauthUrl}>
              <img src={naverImg} alt="naver" />
            </a>
            <a href={kakaOauthUrl}>
              <img src={kakaoImg} alt="kakao" />
            </a>
          </Styled.Oauths>
        </Styled.Left>
        <Styled.Right>
          <img src="https://picsum.photos/500/500" alt="random_img" />
        </Styled.Right>
      </div>
    </Styled.SignInContainer>
  );
};

export default SignIn;
