import styled from "styled-components";

export const Row = styled.div`
  text-align: left;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  width: 100%;
  color: white;
  padding: 1rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  background-color: rgb(52, 152, 219);
  border: none;
  border-radius: 5px;
  transition: background-color 0.25s ease-in;
  &:hover {
    background-color: rgba(52, 152, 219, 0.5);
  }
`;
