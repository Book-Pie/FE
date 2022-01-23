import logo from "assets/image/logo.png";
import searchImg from "assets/image/search.png";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useTypedSelector } from "src/modules/store";
import { signInUser } from "src/modules/Slices/signIn/signInSlice";
import { RegisterOptions, useForm } from "react-hook-form";
import ErrorMessage from "src/elements/ErrorMessage";
import { hookFormHtmlCheck, makeOption } from "src/utils/hookFormUtil";
import { useHistory } from "react-router";
import Tooltip from "@mui/material/Tooltip";
import * as Styled from "./style";
import * as Types from "./types";

const Header = () => {
  const user = useTypedSelector(signInUser);
  const { handleSubmit, formState, register, setValue } = useForm<Types.SearchForm>({
    defaultValues: { title: "" },
  });
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
        <Styled.SearchWrapper onSubmit={handleSubmit(onSubmit)}>
          <input type="text" id="title" {...register("title", titleOptions)} />
          <Tooltip title="검색">
            <img src={searchImg} alt="search" />
          </Tooltip>
          <ErrorMessage message={errors.title?.message} />
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
