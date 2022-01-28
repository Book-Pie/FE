import styled from "styled-components";

export const CommunityContainer = styled.main`
  margin: 0 0.9rem;
  min-height: 500px;
  ${({ theme }) => theme.media.mobile} {
    margin: 0 0.5rem;
  }
`;
export const CommunityWrapper = styled.section`
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

export const CommunityTitle = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${p => p.theme.colors.darkGrey};
  margin: 1rem 0;
`;

export const CommunityRow = styled.div`
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

// export const CommunityList = styled.div`
//   display: flex;
//   gap: 1.5rem;

//   .left {
//     box-shadow: rgb(0 0 0 / 50%) 0px 0px 4px;
//     border: 1px solid ${bordeColor};
//     width: 20%;

//     p {
//       color: ${p => p.theme.colors.mainDarkBrown};
//       font-size: 20px;
//       padding: 20px 0;
//       font-weight: bold;
//       text-align: center;
//       :hover {
//         transform: scale(1.05);
//       }
//     }
//   }

//   ${({ theme }) => theme.media.mobile} {
//     flex-direction: column;
//   }
// `;
