import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  margin: 2rem 0;
  background-color: ${props => props.theme.colors.mainLightBrown};
  text-align: center;
  ${props => props.theme.shadow[30]};
`;
