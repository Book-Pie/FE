import styled from "styled-components";
import useSignIn from "src/hooks/useSignIn";
import { Link } from "react-router-dom";
import { logout } from "src/modules/Slices/signIn/signInSlice";

// 임시로 만들었습니다.
// 유저 정보를 더 보고싶으면 아래 div태그 추가하시고 원하는 정보 넣으시면됩니다.
const StyledMyProfile = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  & > div {
    display: flex;
    gap: 10px;
  }
  & > div > div:first-child {
    text-align: left;
    width: 100px;
  }
  & > div > div:last-child {
    flex: 9;
  }
`;

const StyledButttons = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 2px;
  button {
    padding: 0.5rem;
    width: 100px;
    color: white;
    background-color: rgba(52, 152, 219, 1);
    box-shadow: rgb(0 0 0 / 30%) 0px 4px 16px 0px;
    transition: background-color 0.5s, font-weight 0.5s ease-in-out;

    border: none;
    border-radius: 5px;
    &:hover {
      background-color: rgba(52, 152, 219, 0.5);
      font-weight: 900;
      & > a {
        font-weight: bold;
      }
    }
  }
  a {
    color: white;
  }
`;

const Test = () => {
  const { dispatch, signIn } = useSignIn();
  const { user, isLoggedIn } = signIn;
  return (
    <div>
      {user ? (
        <StyledMyProfile>
          <div>
            <div>📧</div>
            <div>{user.email}</div>
          </div>
          <div>
            <div>이름</div>
            <div>{user.name}</div>
          </div>
          <div>
            <div>닉네임</div>
            <div>{user.nickName}</div>
          </div>
          <div>
            <div>가입 날짜</div>
            <div>{user.createDate}</div>
          </div>
          <div>
            <div>주소</div>
            {user.address && (
              <>
                <div>{user.address.mainAddress}</div>
                <div>{user.address.detailAddress}</div>
              </>
            )}
          </div>
        </StyledMyProfile>
      ) : (
        "로그인을 해주세요."
      )}
      <StyledButttons>
        <button type="button">
          <Link to="/signUp">회원가입</Link>
        </button>
        {isLoggedIn ? (
          <button type="button" onClick={() => dispatch(logout())}>
            로그아웃
          </button>
        ) : (
          <button type="button">
            <Link to="/signIn">로그인</Link>
          </button>
        )}
        <button type="button">
          <Link to="/usedBook">중고장터</Link>
        </button>
        <button type="button">
          <Link to="/oAuthTest">oAuth Test</Link>
        </button>
        <button type="button">
          <Link to="/my">마이페이지</Link>
        </button>
        <button type="button">
          <Link to="/payment">결제페이지</Link>
        </button>
        <button type="button">
          <Link to="/oAuth/kakao">카카오</Link>
        </button>
        <button type="button">
          <Link to="/oAuth/naver">네이버</Link>
        </button>
      </StyledButttons>
    </div>
  );
};

export default Test;
