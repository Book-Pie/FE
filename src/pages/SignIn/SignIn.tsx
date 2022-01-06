import { Link } from "react-router-dom";
import naverImg from "assets/oAuth/naver_oauth.png";
import kakaoImg from "assets/oAuth/kakao_oauth.png";
import SignInForm from "components/SignInForm/SignInForm";
import React, { useState } from "react";
import { getRememberEmail } from "utils/localStorageUtil";

import { Links, OAuths, Container } from "./style";

const kakaOauthUrl = process.env.KAKAO_OAUTH_URL;
const naverOauthUrl =
  "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=qtbZhYGrYVHhLWesnRyJ&redirect_uri=http://localhost:3000/oAuth/naver&state=state";

const SignIn = () => {
  const [isRemember, setIsRemember] = useState(getRememberEmail() ? true : false);
  const handleOnChange = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => setIsRemember(checked);

  return (
    <Container>
      <div>
        <h2>Sign In</h2>
      </div>
      <SignInForm isRemember={isRemember} />
      <Links>
        <input type="checkbox" id="remember_email" onChange={handleOnChange} checked={isRemember} />
        <label htmlFor="remember_email" className="links__email--remember">
          이메일 저장
        </label>
        <Link to="/find/email">
          <span>이메일 찾기</span>
        </Link>
        <Link to="/find/password">
          <span>비밀번호 찾기</span>
        </Link>
      </Links>
      <Links>
        <span>아직 회원이아니신가요?</span>
        <Link to="/signup">
          <span>회원가입</span>
        </Link>
      </Links>
      <OAuths>
        <a href={naverOauthUrl}>
          <img src={naverImg} alt="naver" />
        </a>
        <a href={kakaOauthUrl}>
          <img src={kakaoImg} alt="kakao" />
        </a>
      </OAuths>
    </Container>
  );
};

export default SignIn;
