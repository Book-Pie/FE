import { Container } from "src/assets/style/global";
import Routers from "./router/Routers";
import Header from "./components/Main/Header";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Routers />
      </Container>
    </>
  );
};

export default App;
