import React, { useState } from "react";
import styled from "styled-components";

import logo from "assets/image/logo.png";
import search from "assets/image/search.png";
import { Link } from "react-router-dom";
import useSignIn from "src/hooks/useSignIn";

const Header = () => {
  const { signIn } = useSignIn();
  const { user } = signIn;
  const [searchInput, setSearchInput] = useState<string>("");

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      console.log("onSearch");
    }
  };
  return (
    <HeaderContainer>
      <SignWrapper>
        {user ? (
          <div>
            <span>
              <Link to="/my/modified">마이페이지</Link>
            </span>
            <span>
              <Link to="/logout">로그아웃</Link>
            </span>
          </div>
        ) : (
          <div>
            <span>
              <Link to="/signUp">회원가입</Link>
            </span>
            <span>
              <Link to="/signIn">로그인</Link>
            </span>
          </div>
        )}
      </SignWrapper>
      <NavWrapper>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <SearchWrapper>
          <input
            type="text"
            value={searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchInput(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
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

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SignWrapper = styled.div`
  background-color: ${props => props.theme.colors.mainDarkBrown};
  a {
    color: ${props => props.theme.colors.white};
  }
  div {
    display: flex;
    justify-content: flex-end;
    span {
      text-align: center;
      width: 100px;
      font-size: 1rem;
      margin: 0.875rem 0 0.9375rem 0;
      padding: 0 0.3125rem;
    }
    span + span {
      border-left: 1px solid white;
    }
  }
`;

const NavWrapper = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.mainDarkBrown};
  a {
    color: ${props => props.theme.colors.mainDarkBrown};
  }
  img {
    height: 2.5375rem;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  border-radius: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  width: 500px;
  input {
    border: none;
    background-color: ${props => props.theme.colors.mainLightBrown};
    border-radius: 27px;
    flex: 1;
    height: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    font-size: 1rem;
  }
  img {
    position: absolute;
    right: 0;
    height: 20px;
    margin-right: 1rem;
    cursor: pointer;
  }
`;

const RouterWrapper = styled.div`
  display: flex;
  color: ${props => props.theme.colors.mainDarkBrown};
  span {
    cursor: pointer;
    text-align: center;
    width: 6.25rem;
    font-size: 18px;
    padding: 0px 8px;
    font-weight: bold;
    letter-spacing: -0.45px;
    padding: 0px 8px;
  }
  span + span {
    border-left: 1px solid black;
  }
`;
