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
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

export const FullSizeButton = mStyled(Button)(({ theme }) => {
  return {
    background: theme.colors.mainDarkBrown,
    color: theme.colors.white,
    fontWeight: "bold",
    ":hover": {
      opacity: 0.7,
      background: theme.colors.mainDarkBrown,
    },
  };
});
