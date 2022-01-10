import { NavLink, Link, useRouteMatch } from "react-router-dom";
import { Wrapper } from "./style";

const MyProfileManu = () => {
  const match = useRouteMatch();

  return (
    <Wrapper>
      <span>
        <NavLink to={`${match.path}/a`} activeClassName="myProfile__link--active">
          판매
        </NavLink>
      </span>
      <span>
        <NavLink to={`${match.path}/b`} activeClassName="myProfile__link--active">
          구매
        </NavLink>
      </span>
      <span>
        <NavLink to={`${match.path}/c`} activeClassName="myProfile__link--active">
          찜
        </NavLink>
      </span>
      <span>
        <NavLink to={`${match.path}/d`} activeClassName="myProfile__link--active">
          거래 후기
        </NavLink>
      </span>
      <span>
        <NavLink to={`${match.path}/e`} activeClassName="myProfile__link--active">
          작성리뷰
        </NavLink>
      </span>
      <span>
        <NavLink to={`${match.path}/modified`} activeClassName="myProfile__link--active">
          회원정보수정
        </NavLink>
      </span>
      <span>
        <NavLink to={`${match.path}/withdrawal`} activeClassName="myProfile__link--active">
          탈퇴하기
        </NavLink>
      </span>
    </Wrapper>
  );
};

export default MyProfileManu;
