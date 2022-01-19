import styled from "styled-components";

export const Button = styled.button``;

export const BrownSubButton = styled.button`
  font-size: ${props => (props.small ? "14px" : "18px")};
  width: ${props => (props.small ? "100px" : "160px")};
  height: ${props => (props.small ? "35px" : "53px")};
  margin: 0 10px 0 7px;
  border-radius: 5px;
  border: solid 1px #4f3629;
  background-color: #fff;
  color: #4f3629;
  font-weight: 600;

  &:hover {
    background-color: #edeae9;
    cursor: pointer;
  }
`;

export const BrownMainButton = styled.button`
  width: 200px;
  height: 53px;
  margin: 0 0 0 10px;
  border-radius: 5px;
  background-color: #4f3629;
  font-size: 15px;
  font-weight: 600;
  font-style: normal;
  line-height: 1.5;
  color: #fff;
  font-size: 17px;
  font-weight: 600;

  &:hover {
    background-color: #edeae9;
    color: #4f3629;
    cursor: pointer;
  }
`;
