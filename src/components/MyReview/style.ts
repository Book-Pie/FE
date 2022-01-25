import styled from "styled-components";

export const MyReviewContainer = styled.div`
  flex: 1;
  h5 {
    color: ${p => p.theme.colors.mainDarkBrown};
  }
`;
export const MyReviewTableWrapper = styled.div`
  padding: 1rem 0;
  min-height: 700px;
  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #1565c0;
    font-weight: bold;
    flex: 1;
  }
  & > div {
    padding: 20px 10px;
    border-bottom: 1px solid #edeae9;
    height: 10%;
    &:not(.header):hover {
      background-color: rgba(241, 242, 246, 1);
    }
  }
  .header {
    font-weight: 550;
    background-color: ${p => p.theme.colors.mainLightBrown};
    ${p => p.theme.shadow[0]}
  }
`;

export const MyReviewRow = styled.div`
  display: flex;
  & > div {
    flex: 1;
    display: flex;
    align-items: center;
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
