import styled from "styled-components";

const boardColor = "rgba(99, 110, 114,0.5)";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: ${p => p.theme.colors.darkGrey};
  margin: 30px 0 10px 0;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  padding: 20px 0 10px 0;
  border-bottom: 2px solid ${p => p.theme.colors.darkGrey};
  a {
    color: ${p => p.theme.colors.white};
  }

  span {
    color: ${p => p.theme.colors.darkGrey};
    font-size: 18px;
    padding: 0 10px;
    &:first-child {
      padding-left: 0;
      font-weight: 900;
    }
  }
  span + span {
    border-left: 1px solid ${boardColor};
  }

  & > div :first-child {
    flex: 6;

    &:first-child {
      font-size: 35px;
    }
    & > div + div {
      margin-top: 10px;
    }
  }

  & > div:last-child {
    flex: 4;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`;

export const Main = styled.div`
  min-height: 400px;
  padding: 20px;
  border-bottom: 1px solid ${boardColor};
`;

export const Empty = styled.div`
  min-height: 100vh;
`;

export const NoComments = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #434343;
  padding: 20px;
  min-height: 200px;
  border: 1px solid rgba(99, 110, 114, 0.5);
  ${p => p.theme.shadow[0]}
`;
export const CommentRow = styled.div`
  padding: 20px;
  border: 1px solid rgba(99, 110, 114, 0.5);
  border-radius: 5px;
  ${p => p.theme.shadow[0]}

  transition: transform 0.25s, background-color 0.25s ease-in;
  &:hover {
    background-color: ${p => p.theme.colors.mainLightBrown};
    transform: scale(0.99);
  }
  & > div + div {
    margin-top: 15px;
  }

  .comment__userinfo {
    display: flex;
    justify-content: space-between;
    span:first-child {
      font-size: 20px;
      color: ${p => p.theme.colors.mainDarkBrown};
      font-weight: bold;
    }
    span + span {
      margin-left: 15px;
    }
    svg + span {
      font-size: 15px;
      color: ${p => p.theme.colors.mainDarkBrown};
      font-weight: bold;
    }
  }

  .comment__update {
    display: flex;
    padding-top: 20px;
    border-top: 1px solid rgba(99, 110, 114, 0.5);
    display: block;
    h1 {
      font-size: 25px;
      font-weight: bold;
      color: ${p => p.theme.colors.mainDarkBrown};
    }
    & > h1 + div,
    & > div + div {
      margin-top: 15px;
    }
  }
  .comment__subReply {
    display: flex;
    padding-top: 20px;
    border-top: 1px solid rgba(99, 110, 114, 0.5);
    display: block;
    h1 {
      font-size: 25px;
      font-weight: bold;
      color: ${p => p.theme.colors.mainDarkBrown};
    }
    & > h1 + div,
    & > div + div {
      margin-top: 15px;
    }
  }
`;

export const CommentsWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CommentsTop = styled.div`
  .comments__header {
    font-size: 20px;
    font-weight: bold;
    span {
      color: red;
      font-size: 17px;
      margin-right: 10px;
    }
  }
  .comments__noLogin {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: ${p => p.theme.colors.darkGrey};
  }
  .comments_form {
    display: flex;
    margin-top: 15px;
    padding: 30px;
    border-bottom: 1px solid rgba(99, 110, 114, 0.5);
    & > div:first-child {
      flex: 8;
    }
    & > div:last-child {
      flex: 2;
      display: flex;
      justify-content: center;
      button[type="submit"] {
        height: 50px;
        width: 150px;
        font-size: 18px;
      }
    }
  }
`;

export const CommentsBottom = styled.div`
  & > div + div {
    margin-top: 15px;
  }
`;

export const SubRely = styled.div`
  & > div {
    padding: 20px;
    ${p => p.theme.shadow[0]}
  }
  & > div + div {
    margin-top: 15px;
  }
`;
