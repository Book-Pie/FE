import { Typography } from "@mui/material";
import SignUpForm from "components/SignUpForm/SignUpForm";
import * as Styled from "./style";

const SignUp = () => {
  return (
    <Styled.SignUpContainer>
      <Typography variant="h3" fontWeight="bold">
        회원가입
      </Typography>
      <SignUpForm />
    </Styled.SignUpContainer>
  );
};

export default SignUp;
