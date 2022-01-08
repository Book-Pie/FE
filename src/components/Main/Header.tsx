import React, { useState } from "react";
import { theme } from "src/utils/theme";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import search from "../../assets/search.png";

const Header = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      console.log("onSearch");
    }
  };
  return (
    <HeaderContainer>
      <SignWrapper>
        <div>
          <h3>회원가입</h3>
          <span>|</span>
          <h3>로그인</h3>
        </div>
      </SignWrapper>
      <HeaderWrapper>
        <HeaderBox>
          <img src={logo} alt="logo" />
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
            <h2>중고장터</h2>
            <span>|</span>
            <h2>리뷰</h2>
            <span>|</span>
            <h2>커뮤니티</h2>
          </RouterWrapper>
        </HeaderBox>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100vw;
`;

const SignWrapper = styled.div`
  background-color: ${theme.colors.mainDarkBrown};
  color: ${theme.colors.white};
  width: 100%;
  height: 50px;
  div {
    display: flex;
    justify-content: flex-end;
    max-width: 1920px;
    /* padding-right: 150px; */
    h3 {
      padding: 14px 5px 15px 5px;
    }
    span {
      padding: 14px 10px 15px 10px;
    }
  }
`;

const HeaderWrapper = styled.div`
  height: 87px;
  max-width: 1920px;
  /* padding: 0px 10rem; */
  img {
    height: 31px;
  }
`;

const HeaderBox = styled.div`
  height: 87px;
  max-width: 1920px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchWrapper = styled.div`
  background-color: ${theme.colors.mainLightBrown};
  border-radius: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  padding: 0px 17px;
  width: 500px;
  input {
    border: none;
    background-color: ${theme.colors.mainLightBrown};
    border-radius: 27px;
    padding: 0px 0px 0px 10px;
    :focus {
      outline: none;
    }
  }
  img {
    height: 20px;
    margin-left: 17px;
  }
`;

const RouterWrapper = styled.div`
  display: flex;
  color: ${theme.colors.mainDarkBrown};
  h2 {
    font-size: 18px;
    padding: 0px 8px;
    font-weight: bold;
    letter-spacing: -0.45px;
    :last-child {
      padding: 0px;
    }
  }
  span {
    padding: 0px 8px;
  }
`;
