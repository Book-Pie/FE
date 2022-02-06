import styled from "styled-components";

export const ChatTopWrapper = styled.div`
  padding: 15px;
  background: #404040;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.white};
  .success {
    color: #43a047;
  }
  .error {
    color: #e53935;
  }
`;

export const ChatContentWrapper = styled.div`
  height: 300px;
  overflow: auto;
  background: #f3f3f3;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.colors.darkGrey};
  & > div {
    margin: 10px 0;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div {
      position: relative;
      border-radius: 4px;
    }
    & > div:first-child {
    }
  }

  .other {
    align-items: flex-start;

    & > div {
      padding-left: 10px;
    }

    & > div:first-child {
      background: #ffffff;
      margin: 6px 10px;
      padding: 6px;
      ${({ theme }) => theme.shadow[0]}
    }
  }

  .my {
    align-items: flex-end;
    & > div {
      padding-right: 10px;
    }
    & > div:first-child {
      background: #cfd8dc;
      padding: 6px;
      margin: 6px 10px;
      ${({ theme }) => theme.shadow[0]}
    }
  }
  .other > div:first-child::after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    bottom: auto;
    border: 6px solid;
    border-color: #ffffff transparent transparent transparent;
    top: 0px;
    left: -6px;
    right: auto;
  }

  .my > div:first-child::after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    bottom: auto;
    border: 6px solid;
    border-color: #cfd8dc transparent transparent transparent;
    top: 0px;
    left: auto;
    right: -6px;
  }

  .nickname {
    font-weight: bold;
  }

  & > div > div:last-child {
    display: flex;
    gap: 5px;
    font-size: 13px;
    margin-top: 7px;
  }
  .empty {
    color: ${({ theme }) => theme.colors.darkGrey};
    padding: 10px;
    text-align: center;
    font-size: 14px;
  }
`;

export const ChatInputWrapper = styled.form`
  display: flex;
  & > div {
    flex: 8;
  }
`;

export const UsedBookInfoWrapper = styled.div`
  padding: 10px;
  display: flex;

  img {
    width: 100px;
    height: 100%;
    max-height: 200px;
  }

  & > div:last-child {
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.darkGrey};
    & > div {
      font-size: 20px;
      font-weight: bold;
    }
    & > div + p {
      margin-top: 10px;
    }

    p {
      font-size: 14px;
    }
    p:nth-child(2n + 1) {
      font-size: 18px;
      color: ${({ theme }) => theme.colors.info};
    }
    p + p {
      margin-top: 10px;
    }
    span + span {
      margin-top: 9px;
    }
  }
`;
