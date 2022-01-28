import styled from "styled-components";

export const SearchContainer = styled.div`
  padding: 0 1.5rem;
  ${({ theme }) => theme.media.mobile} {
    padding: 0 0.5rem;
    h4 {
      font-size: 30px;
    }
  }
`;
