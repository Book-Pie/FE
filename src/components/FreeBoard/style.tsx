import styled from "styled-components";

const boardColor = "rgba(99, 110, 114,0.5)";

export const FreeboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 1rem;
  }
`;

export const FreeboardTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin: 30px 0 10px 0;
`;

export const FreeboardTop = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 0 10px 0;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkGrey};
  a {
    color: ${({ theme }) => theme.colors.white};
  }

  & > div:first-child {
    max-width: 500px;

    &:first-child {
      font-size: 2.2rem;
    }
    & > div + div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 15px;
      gap: 10px;
    }

    span {
      color: ${({ theme }) => theme.colors.darkGrey};
      font-size: 1.1rem;
      padding-left: 10px;
      &:first-child {
        padding-left: 0;
        font-weight: 900;
      }
    }

    ${({ theme }) => theme.media.mobile} {
      &:first-child {
        font-size: 1.5rem;
      }
      span {
        font-size: 15px;
        padding: 0;
      }
      & > div + div {
        justify-content: flex-start;
      }
    }
  }

  & > div:last-child {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    button {
      width: 100px;
      height: 40px;
      font-size: 12px;
    }

    ${({ theme }) => theme.media.mobile} {
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-bottom: 10px;
    }
  }
`;

export const Main = styled.div`
  min-height: 400px;
  padding: 20px;
  border-bottom: 1px solid ${boardColor};
  ${({ theme }) => theme.media.mobile} {
    padding: 0px;
  }
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
  ${({ theme }) => theme.shadow[0]}
`;
export const CommentRow = styled.div`
  padding: 20px;
  border: 1px solid rgba(99, 110, 114, 0.2);
  border-radius: 5px;
  transition: transform 0.25s, background-color 0.25s ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.colors.mainLightBrown};
    transform: scale(0.99);
  }
  & > div + div {
    margin-top: 15px;
  }

  .comment__userinfo {
    display: flex;
    justify-content: space-between;
    & > div:first-child {
      flex-wrap: wrap;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    span:first-child {
      font-size: 20px;
      color: ${({ theme }) => theme.colors.mainDarkBrown};
      font-weight: bold;
    }

    svg {
      margin: 0;
      padding: 0;
      padding-bottom: 5px;
    }

    svg + span {
      font-size: 15px;
      color: ${({ theme }) => theme.colors.mainDarkBrown};
      font-weight: bold;
    }
  }
  .view.ql-editor {
    min-height: 100px;
    padding: 0;
  }

  .comment__update {
    display: flex;
    padding-top: 20px;
    border-top: 1px solid rgba(99, 110, 114, 0.5);
    display: block;
    h1 {
      font-size: 25px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.mainDarkBrown};
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
      color: ${({ theme }) => theme.colors.mainDarkBrown};
    }
    & > h1 + div,
    & > div + div {
      margin-top: 15px;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 10px 15px;
    .view.ql-editor {
      font-size: 0.7rem;
      font-weight: 100;
    }

    .comment__userinfo {
      flex-direction: column;
      gap: 10px;

      svg {
        width: 20px;
        height: 20px;
      }

      & > div:first-child {
        margin-top: 10px;

        span {
          font-size: 15px;
          margin: 0;
        }
      }
    }
  }
`;

export const CommentsWrapper = styled.div`
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
    padding: 30px 10px;
    color: ${({ theme }) => theme.colors.darkGrey};
  }
  .comments_form {
    display: flex;
    margin-top: 15px;
    padding: 30px 0;
    flex-wrap: wrap;
    gap: 15px;
    border-bottom: 1px solid rgba(99, 110, 114, 0.2);
    & > div:first-child {
      flex: 8;
    }
    & > div:last-child {
      width: 150px;
      text-align: right;
      button[type="submit"] {
        height: 50px;
        font-size: 18px;
        min-width: 150px;
      }
    }

    ${({ theme }) => theme.media.mobile} {
      padding: 10px 0;
      flex-direction: column;
      border-top: 1px solid rgba(99, 110, 114, 0.2);

      & > div:last-child {
        width: 100%;
      }

      button[type="submit"] {
        width: 100%;
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
    border: 1px solid rgba(99, 110, 114, 0.2);
    & > div + div {
      margin-top: 15px;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    & > div {
      padding: 10px;
    }
  }
`;
