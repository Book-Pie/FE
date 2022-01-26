import styled from "styled-components";

export const UsedBookContainer = styled.main`
  margin-bottom: 2rem;
  padding: 0 1rem;

  ${({ theme }) => theme.media.mobile} {
    padding: 0 1rem;
  }
`;
