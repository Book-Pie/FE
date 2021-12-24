import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  gap: 10px;

  input + input {
    border-top: 0;
  }

  & > div:first-child {
    flex: 8;
  }
  & > div:last-child {
    flex: 2;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  background-color: rgb(52, 152, 219);
  border: none;
  border-radius: 5px;
  transition: background-color 0.25s ease-in;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(52, 152, 219, 0.5);
  }
`;
