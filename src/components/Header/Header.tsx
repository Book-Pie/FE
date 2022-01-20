import logo from "assets/image/logo.png";
import search from "assets/image/search.png";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useTypedSelector } from "src/modules/store";
import { signInUser } from "src/modules/Slices/signIn/signInSlice";
import * as Styled from "./style";

const Header = () => {
  const user = useTypedSelector(signInUser);

  const infos = useMemo(
    () =>
      user
        ? [
            {
              endPoint: "/my/modified",
              text: "마이페이지",
            },
            {
              endPoint: "/logout",
              text: "로그아웃",
            },
          ]
        : [
            {
              endPoint: "/signUp",
              text: "회원가입",
            },
            {
              endPoint: "/signIn",
              text: "로그인",
            },
          ],
    [user],
  );

  return (
    <Styled.HeaderContainer>
      <Styled.InfoWrapper>
        <div>
          {infos.map(({ endPoint, text }, idx) => (
            <span key={idx}>
              <Link to={endPoint}>{text}</Link>
            </span>
          ))}
        </div>
      </Styled.InfoWrapper>
      <Styled.NavWrapper>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Styled.SearchWrapper>
          <input type="text" />
          <img src={search} alt="search" />
        </Styled.SearchWrapper>
        <Styled.RouterWrapper>
          <span>
            <Link to="/usedBook">중고장터</Link>
          </span>
          <span>
            <Link to="/book">리뷰</Link>
          </span>
          <span>
            <Link to="/community">커뮤니티</Link>
          </span>
        </Styled.RouterWrapper>
      </Styled.NavWrapper>
    </Styled.HeaderContainer>
  );
};

export default Header;
