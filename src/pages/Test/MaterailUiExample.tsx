import { styled as mStyled } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "styled-components";

const CustomButton = mStyled(Button)(({ theme }) => {
  return {
    color: theme.colors.white,
    background: theme.colors.mainDarkBrown,
    border: "1px solid transparent",
    ":hover": {
      background: theme.colors.white,
      color: theme.colors.mainDarkBrown,
      border: `1px solid ${theme.colors.mainDarkBrown}`,
    },
    ":focus": {
      background: theme.colors.white,
      color: theme.colors.mainDarkBrown,
      border: `1px solid ${theme.colors.mainDarkBrown}`,
    },
  };
});

const CustomCheckbox = mStyled(Checkbox)(({ theme }) => {
  return {
    color: theme.colors.mainDarkBrown,
    ":hover": {
      background: theme.colors.white,
      color: theme.colors.mainDarkBrown,
    },
    ":focus": {
      background: theme.colors.white,
      color: theme.colors.mainDarkBrown,
    },
  };
});

const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const MaterailUiExample = () => {
  return (
    <FlexBox>
      <CustomButton variant="contained">Primary</CustomButton>
      <Button variant="contained" color="mainDarkBrown">
        Primary
      </Button>
      <FormControlLabel control={<CustomCheckbox defaultChecked />} label="커스텀 체크박스 예제2" />
      <FormControlLabel control={<Checkbox defaultChecked color="mainDarkBrown" />} label="기본 체크박스 예제1" />
      <div />
    </FlexBox>
  );
};

export default MaterailUiExample;
