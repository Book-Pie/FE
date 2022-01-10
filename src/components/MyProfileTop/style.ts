import styled from "styled-components";
import { styled as mStyled } from "@mui/material";
import Input from "@mui/material/Input";

export const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 2rem;

  & > div:first-child {
    flex: 6;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div:last-child {
    flex: 4;
  }
`;

export const ProfileImg = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.mainLightBrown};
  }
  img {
    height: 200px;
    width: 200px;
  }
`;

export const UserInfoMation = styled.div`
  flex: 5;
  padding: 1rem 1.5rem;
  background-color: ${props => props.theme.colors.mainLightBrown};
  border-radius: 5px;
  color: ${props => props.theme.colors.mainDarkBrown};

  & > form,
  & > div {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    & > button {
      width: 150px;
      height: 100%;
      letter-spacing: 0.1rem;
      &:hover {
        opacity: 0.5;
      }
    }
    & > div {
      width: 150px;
      height: 100%;
    }

    & > span:first-child {
      font-weight: 900;
      font-size: 1.2rem;
      letter-spacing: 0.1rem;
    }
    & > span:last-child {
      font-size: 1.3rem;
    }
  }
  & > div + form,
  & > form + div,
  & > div + div {
    margin-top: 1rem;
  }
`;

export const CustomInput = mStyled(Input)(({ theme }) => {
  return {
    "::after": {
      borderColor: theme.colors.mainDarkBrown,
    },
  };
});
