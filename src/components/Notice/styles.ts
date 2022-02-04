import styled from "styled-components";

export const NoticeWrapper = styled.section`
  & > div {
    padding: 1rem 0;
    color: ${({ theme }) => theme.colors.darkGrey};
    border-bottom: 1px solid rgba(99, 110, 114, 0.2);
    font-size: 1.1rem;
    & > div + div {
      border-left: 1px solid rgba(99, 110, 114, 0.2);
    }
  }

  .header {
    background-color: ${({ theme }) => theme.colors.mainLightBrown};
  }

  .title {
    color: ${({ theme }) => theme.colors.info};
    flex: 1;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }

  ${({ theme }) => theme.media.mobile} {
    & > div {
      font-size: 0.7rem;
      padding: 15px 0;
    }
  }
`;

export const NoticeTitle = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${p => p.theme.colors.darkGrey};
  margin: 1rem 0;
`;

export const NoticeRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  height: 100%;
  padding: 0 10px;
  span {
    font-size: 15px;
  }
`;
