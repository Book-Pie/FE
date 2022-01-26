import styled from "styled-components";

export const SignUpContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  margin: 2rem 0;
  ${({ theme }) => theme.shadow[0]};

  h3 {
    color: ${({ theme }) => theme.colors.darkGrey};
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 0;
  }
`;
