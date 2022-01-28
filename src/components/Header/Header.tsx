import logo from "assets/image/logo-removebg.png";
import searchImg from "assets/image/search.png";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTypedSelector } from "src/modules/store";
import { signInUser } from "src/modules/Slices/signIn/signInSlice";
import { RegisterOptions, useForm } from "react-hook-form";
import ErrorMessage from "src/elements/ErrorMessage";
import { hookFormHtmlCheck, makeOption } from "src/utils/hookFormUtil";
import { useHistory } from "react-router";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import * as Styled from "./style";
import * as Types from "./types";

const Header = () => {
  const user = useTypedSelector(signInUser);
  const el = useRef<HTMLDivElement>(null);

  const { handleSubmit, formState, register, setValue } = useForm<Types.SearchForm>({
    defaultValues: { title: "" },
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const history = useHistory();
  const { errors } = formState;

  const titleOptions: RegisterOptions = useMemo(
    () => ({
      required: true,
      maxLength: makeOption<number>(50, "최대 50자 입니다."),
      minLength: makeOption<number>(1, "최소 1자 입니다."),
      validate: {
        html: value => hookFormHtmlCheck(value, "HTML태그는 검색이 불가합니다."),
      },
    }),
    [],
  );

  const onSubmit = ({ title }: Types.SearchForm) => {
    history.push({
      pathname: "/search",
      search: `title=${title}`,
    });
    setValue("title", "");
  };

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

  const handleCloseHamburger = useCallback(
    (e: any) => {
      if (isVisible && (!el.current || !el.current.contains(e.target))) setIsVisible(false);
    },
    [isVisible],
  );

  const handleOpneHamburger = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleCloseHamburger);
    return () => {
      window.removeEventListener("click", handleCloseHamburger);
    };
  }, [handleCloseHamburger]);

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
      <Styled.HamburgerWrapper isVisible={isVisible} ref={el}>
        <span onClick={handleOpneHamburger}>
          <MenuIcon fontSize="large" />
        </span>
        <ul>
          {infos.map(({ endPoint, text }, idx) => (
            <li key={idx}>
              <Link to={endPoint}>{text}</Link>
            </li>
          ))}
        </ul>
      </Styled.HamburgerWrapper>
      <Styled.NavWrapper>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Styled.SearchWrapper onSubmit={handleSubmit(onSubmit)}>
          <input type="text" id="title" {...register("title", titleOptions)} />
          <Tooltip title="검색">
            <img src={searchImg} alt="search" />
          </Tooltip>
          <ErrorMessage message={errors.title?.message} />
        </Styled.SearchWrapper>
        <Styled.RouterWrapper>
          <span>
            <Link to="/usedBook">중고도서</Link>
          </span>
          <span>
            <Link to="/book">리뷰</Link>
          </span>
          <span>
            <Link to="/community">커뮤니티</Link>
            <ul>
              <li>
                <Link to="/community/freeboard">자유게시판</Link>
              </li>
              <li>
                <Link to="/">책사고팝니다.</Link>
              </li>
            </ul>
          </span>
        </Styled.RouterWrapper>
      </Styled.NavWrapper>
    </Styled.HeaderContainer>
  );
};

export default Header;
