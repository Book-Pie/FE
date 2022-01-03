import { Link } from "react-router-dom";
import naver from "assets/oAuth/naver_oauth.png";
import kakao from "assets/oAuth/kakao_oauth.png";
import SignInForm from "components/SignInForm/SignInForm";
import React, { useState } from "react";
import { getRememberEmail } from "utils/localStorageUtil";

import { Links, OAuths, Container } from "./style";

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
        <Link to="/find/id">
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
        <Link to="/">
          <img src={naver} alt="naver" />
        </Link>
        <Link to="/">
          <img src={kakao} alt="kakao" />
        </Link>
      </OAuths>
    </Container>
  );
};

export default SignIn;
