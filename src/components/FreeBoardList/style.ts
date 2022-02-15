import styled from "styled-components";

export const FreeBoardListWrapper = styled.div`
  margin: 20px 0;

  .MuiInputBase-root {
    height: 100%;
  }
`;

export const FreeBoardListRow = styled.div`
  min-height: 300px;
  & > div {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColors[0]};
    cursor: pointer;
    transition: background-color 0.5s ease;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    a {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: ${({ theme }) => theme.colors.info};
      flex: 1;
    }
    & > div {
      width: 150px;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 15px 0;
      padding: 0 10px;
      height: 100%;

      &:nth-child(1) {
        width: 100px;
      }
      &:nth-child(2) {
        flex: 1;
        transition: transform 0.5s ease;
      }
      &:nth-child(4) {
        width: 100px;
      }
      &:nth-child(5) {
        width: 200px;
      }

      @media screen and (max-width: 900px) {
        font-size: 15px;
        margin: 15px 0;
        width: 100px;

        &:nth-child(4) {
          width: 70px;
        }
        &:nth-child(5) {
          width: 150px;
        }
      }

      ${({ theme }) => theme.media.mobile} {
        font-size: 15px;
        margin: 15px 0;
        flex: 1;
        &:nth-child(1) {
          width: 50px;
        }
        &:nth-child(4) {
          width: 60px;
        }
        &:nth-child(5) {
          margin: 10px;
          width: 100px;
        }
      }
    }

    div + div {
      border-left: 1px solid ${({ theme }) => theme.colors.borderColors[0]};
    }
    & > div:nth-child(4) {
      border-right: 1px solid ${({ theme }) => theme.colors.borderColors[0]};
    }
    & > div:last-child {
      border: none;
    }

    &:not(.header) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.mainLightBrown};
      }
      & > div:nth-child(2) {
        :hover {
          transform: scale(1.02);
        }
      }
    }
  }

  .header {
    background-color: ${({ theme }) => theme.colors.mainLightBrown};
  }
`;

export const FreeBoardListTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.mainDarkBrown};
`;

export const Empty = styled.div`
  min-height: 310px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.darkGrey};
  }
`;

export const FreeBoardListSearch = styled.form`
  height: 45px;
  margin-top: 20px;
  justify-content: center;
  display: flex;
  gap: 20px;
  input {
    width: 250px;
  }
`;
