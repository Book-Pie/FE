import { Container } from "src/assets/style/global";
import Routers from "./router/Routers";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Routers />
      </Container>
      <Footer />
    </>
  );
};

export default App;
