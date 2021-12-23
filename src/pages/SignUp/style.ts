import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  width: 50%;
  margin: 0 auto;
  background-color: rgb(245, 246, 247);
  text-align: center;

  @media screen and (max-width: 310px) {
    width: auto;
  }
`;
