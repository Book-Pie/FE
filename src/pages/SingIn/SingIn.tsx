import { Link } from "react-router-dom";
import naver from "assets/oAuth/naver_oauth.png";
import kakao from "assets/oAuth/kakao_oauth.png";
import SignInForm from "src/components/SignInForm/SignInForm";
import React, { useState } from "react";
import { getSaveId } from "utils/localStorageUtil";

import { Links, OAuths, Container } from "./style";

const SignIn = () => {
  const [isRemember, setIsRemember] = useState(getSaveId() ? true : false);
  const handleOnChange = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => setIsRemember(checked);

  return (
    <Container>
      <div>
        <h2>Sign In</h2>
      </div>
      <SignInForm isRemember={isRemember} />
      <Links>
        <input type="checkbox" onChange={handleOnChange} checked={isRemember} />
        <span>아이디 저장</span>
        <Link to="/find/id">
          <span>아이디 찾기</span>
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
