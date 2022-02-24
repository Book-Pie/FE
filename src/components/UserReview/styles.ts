import styled from "styled-components";

export const UserReviewHeader = styled.div`
  display: flex;
  & > div {
    text-align: center;
    flex: 1;
    border-top: 1px solid rgba(99, 110, 114, 0.2);
    border-bottom: 1px solid rgba(99, 110, 114, 0.2);
    padding: 0 0.5rem;
    & > span {
      display: block;
      margin: 15px 0;
      font-size: 1rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  }

  ${({ theme }) => theme.media.mobile} {
    & > div {
      & > span {
        font-size: 0.7rem;
      }
    }
  }
`;
export const UserReviewCell = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  a {
    flex: 1;
  }
`;

export const UserReviewWrapper = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  flex: 1;
`;

export const WrittedReviewListFlexBox = styled.div`
  display: flex;

  ${({ theme }) => theme.media.mobile} {
    display: block;
  }
`;
