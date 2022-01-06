import styled from "styled-components";

export const CategorysWrapper = styled.ul`
  margin: 0;
  margin-top: 5rem;
  padding: 0;
  display: flex;
  justify-content: center;
  color: white;
`;

export const FirstCategory = styled.li`
  list-style-type: none;
  position: relative;
  padding: 1rem;
  width: 100px;
  height: 25px;
  background-color: rgba(205, 97, 51, 1);
  border-radius: 5px;
  font-weight: bold;
  box-shadow: rgb(0 0 0 / 30%) 0px 4px 16px 0px;
  cursor: pointer;
  transition: background-color 0.25s ease-in;

  & + & {
    margin-left: 20px;
  }
  &:hover {
    background-color: rgba(205, 97, 51, 0.5);
  }

  &:hover ul {
    background-color: rgba(205, 97, 51, 1);
    visibility: visible;
    opacity: 1;
  }
`;

export const SecondCategorys = styled.ul`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: 5;
  margin: 0;
  padding: 0;
  top: 100%;
  left: 0;
  right: 0;
  list-style-type: none;
  transition: opacity 0.5s ease-in;
  box-shadow: rgb(0 0 0 / 50%) 0px 4px 16px 0px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  a {
    color: white;
    outline: none;
    padding: 1rem;
  }

  a:hover,
  a:active {
    background-color: rgba(255, 121, 63, 1);
  }
`;
