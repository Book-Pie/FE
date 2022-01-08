import styled from "styled-components";
import { styled as mStyled } from "@mui/material";

export const Form = styled.form`
  display: flex;
  gap: 10px;

  & > div:first-child {
    flex: 8;
    div + div {
      margin-top: 0.5125rem;
    }
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

export const FullSizeButton = mStyled(Button)(({ theme }) => {
  return {
    background: theme.colors.mainDarkBrown,
    width: "100%",
    height: "100%",
    fontWeight: "bold",
    ":hover": {
      opacity: 0.7,
      background: theme.colors.mainDarkBrown,
    },
  };
});
