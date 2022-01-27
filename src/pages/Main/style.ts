import styled from "styled-components";

export const Text = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.colors.mainDarkBrown};
  margin: 50px 0px 22px 0px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(99, 110, 114, 0.1);
  ${({ theme }) => theme.media.mobile} {
    font-size: 1rem;
    margin: 35px 0px 12px 0px;
  }
`;

export const MainSection = styled.section`
  padding: 0 1rem;
  @media screen and (max-width: 800px) {
    padding: 0 0.5rem;
  }
`;
