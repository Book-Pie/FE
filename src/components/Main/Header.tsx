import React, { useState } from "react";
import styled from "styled-components";

const Header = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      console.log("onSearch");
    }
  };
  return (
    <HeaderContainer>
      <h1>LOGO</h1>
      <RouterWrapper>
        <h2>중고장터</h2>
        <h2>리뷰</h2>
        <h2>커뮤니티</h2>
      </RouterWrapper>
      <form>
        <input
          type="text"
          placeholder="search"
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchInput(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
      </form>
      <SignWrapper>
        <h3>회원가입</h3>
        <h3>로그인</h3>
      </SignWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const RouterWrapper = styled.div`
  display: flex;
  h2 {
    padding-right: 10px;
  }
`;

const SignWrapper = styled.div`
  display: flex;
  h3 {
    padding-right: 10px;
  }
`;
