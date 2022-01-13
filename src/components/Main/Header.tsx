import React, { useState } from "react";
import logo from "assets/image/logo.png";
import search from "assets/image/search.png";
import { Link } from "react-router-dom";
import useSignIn from "src/hooks/useSignIn";
import { HeaderContainer, NavWrapper, RouterWrapper, SearchWrapper, SignWrapper } from "./styles";

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
