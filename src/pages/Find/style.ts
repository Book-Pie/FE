import styled from "styled-components";

export const FindContainer = styled.main`
  width: 500px;
  padding: 1rem 2rem;
  margin: 2rem auto;
  color: ${({ theme }) => theme.colors.mainDarkBrown};
  ${({ theme }) => theme.shadow[0]};
  border-radius: 5px;
  button {
    margin-bottom: 0.5rem;
    height: 50px;
    width: 100%;
    font-size: 1rem;
    transition: opacity 0.25s ease-in;
    :hover {
      opacity: 0.8;
    }
  }
  ${({ theme }) => theme.media.mobile} {
    width: auto;
    margin: 0;
    padding: 1rem;
    button {
      font-size: 0.8rem;
    }
  }
`;
