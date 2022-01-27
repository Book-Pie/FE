import styled from "styled-components";

export const MyReviewWrapper = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  flex: 1;
  h4 {
    color: ${p => p.theme.colors.mainDarkBrown};
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0 0.5rem;

    h4 {
      font-size: 1.2rem;
      text-align: center;
    }
  }
`;
export const MyReviewTableWrapper = styled.div`
  margin: 1rem 0;
  min-height: 700px;
  ${p => p.theme.shadow[0]};

  a {
    color: #1565c0;
    font-weight: bold;
    font-size: 1rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-align: center;
    line-height: 1.2;
  }
  span {
    text-align: center;
  }
  & > div {
    padding: 1rem 0.5rem;
    border-bottom: 1px solid #edeae9;
    &:not(.header):hover {
      background-color: rgba(241, 242, 246, 1);
    }
  }
  .header {
    background-color: ${p => p.theme.colors.mainLightBrown};
    color: ${p => p.theme.colors.darkGrey};
  }

  @media screen and (max-width: 900px) {
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.7rem;
    a {
      font-size: 0.9rem;
      -webkit-line-clamp: 2;
    }
  }
`;

export const MyReviewCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-wrap: wrap;
  gap: 8px;
  &.content {
    justify-content: flex-start;
  }
`;
export const MyReviewEmpty = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  img {
    height: 50%;
  }
  p {
    font-size: 22px;
  }
`;
