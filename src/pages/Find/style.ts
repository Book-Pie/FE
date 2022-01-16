import styled from "styled-components";

export const Wrapper = styled.div`
  width: 600px;
  text-align: center;
  padding: 2rem 1rem 1rem 1rem;
  margin: 2rem auto;
  background-color: ${props => props.theme.colors.mainLightBrown};
  color: ${props => props.theme.colors.mainDarkBrown};
  ${props => props.theme.shadow[10]};
  border-radius: 5px;
`;
