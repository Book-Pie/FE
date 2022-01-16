import styled from "styled-components";

import logo from "assets/image/logo.png";
import search from "assets/image/search.png";
import { Link } from "react-router-dom";
import useSignIn from "src/hooks/useSignIn";
import { useMemo } from "react";
import { HeaderContainer, InfoWrapper, NavWrapper, RouterWrapper, SearchWrapper } from "./style";

const Header = () => {
  const { signIn } = useSignIn();
  const { user } = signIn;

  const info = useMemo(
    () =>
      user
        ? [
            {
              path: "/my/modified",
              text: "마이페이지",
            },
            {
              path: "/logout",
              text: "로그아웃",
            },
          ]
        : [
            {
              path: "/signUp",
              text: "회원가입",
            },
            {
              path: "/signIn",
              text: "로그인",
            },
          ],
    [user],
  );

  return (
    <HeaderContainer>
      <InfoWrapper>
        <div>
          {info.map((v, idx) => (
            <span key={idx}>
              <Link to={v.path}>{v.text}</Link>
            </span>
          ))}
        </div>
      </InfoWrapper>
      <NavWrapper>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <SearchWrapper>
          <input type="text" />
          <img src={search} alt="search" />
        </SearchWrapper>
        <RouterWrapper>
          <span>
            <Link to="/usedBook">중고장터</Link>
          </span>
          <span>
            <Link to="/book">리뷰</Link>
          </span>
          <span>커뮤니티</span>
        </RouterWrapper>
      </NavWrapper>
    </HeaderContainer>
  );
};

export default Header;
