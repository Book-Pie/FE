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
  & > div {
    position: relative;
    cursor: pointer;
  }

  & > div:hover > .point {
    visibility: visible;
    opacity: 1;
    transform: translateY(0%);
  }
  .point {
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    position: absolute;
    top: 100%;
    background-color: ${p => p.theme.colors.white};
    z-index: 1;
    width: 100%;
    transition: all 0.5s ease-in-out;
    opacity: 0;
    transform: translateY(-50%);
    border-radius: 5px;
    ${p => p.theme.shadow[10]};
    height: 300px;
    color: ${p => p.theme.colors.mainDarkBrown};

    div {
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 20px;
    }

    .bronze,
    .silver,
    .gold {
      display: inline-block;
      font-size: 25px;
      text-align: center;
    }
    .bronze {
      color: #624637;
    }
    .silver {
      color: #c0c0c0;
    }
    .gold {
      color: #ffd700;
    }
    p {
      font-size: 20px;
      font-weight: 900;
    }

    span {
      font-weight: 600;
    }
    span:first-child {
      text-align: center;
      width: 130px;
    }
    span + span {
    }
  }

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
    & > button:first-child {
      width: 100%;
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
    & > span:nth-child(2) {
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
