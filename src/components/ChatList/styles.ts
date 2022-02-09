import styled from "styled-components";

export const ChatListWrapper = styled.div`
  width: 500px;
  min-height: 500px;
  padding: 10px 20px;
  margin: 10px;
  margin-top: 50px;

  .chatList__empty {
    height: 100%;
    text-align: center;
    margin-top: 115px;
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 0;
  } ;
`;

export const ChatListCard = styled.div`
  padding: 10px 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainLightBrown};
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.mainLightBrown};
  }
  :hover {
    ${({ theme }) => theme.shadow[10]};
  }
  & > a {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
    }
    & > div > div {
      flex-direction: column;
      gap: 5px;
      justify-content: center;
      padding-left: 10px;
    }
  }
  .ChatListCard__noProfile {
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.mainLightBrown};
    height: 50px;
    width: 50px;
  }

  .ChatListCard__number {
    font-size: 14px;
    align-items: center;
    gap: 5px;
    color: ${({ theme }) => theme.colors.darkGrey};
    & > span:first-child {
      font-size: 16px;
      padding-right: 5px;
    }
    svg {
      width: 25px;
      height: 25px;
    }
  }
  .ChatListCard__bookName {
    font-size: 18px;
    font-weight: 500;
    display: table-cell;
    max-width: 375px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .ChatListCard__bookImg {
    width: 50px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.mainLightBrown};
    height: 50px;
  }
`;
