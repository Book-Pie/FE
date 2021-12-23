import SignUpForm from "components/SignUpForm/SignUpForm";
import { Container } from "./style";

// 재사용하는 컴포넌트에는 레이아웃을 주지말자.
const SignUp = () => {
  return (
    <Container>
      <div>
        <h1>회원가입</h1>
      </div>
      <SignUpForm />
    </Container>
  );
};

export default SignUp;
