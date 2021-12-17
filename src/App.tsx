import React, { useEffect, useState } from "react";
import Test from "components/Test";
import axios from "axios";
import { print } from "utils/print";
import styled from "styled-components";
import "style/example.css";

const StyledTest = styled.div`
  background-color: red;
`;

const App = () => {
  // hotreload 이해 로직
  const [state, setState] = useState(1);
  useEffect(() => {
    // babel runtime
    (async () => {})();
  }, []);
  console.log(state);
  print("테스트를 해보자");

  return (
    <StyledTest>
      <div className="example__a">
        핫리로더를안쓰면 스테이트가 초기화되어버립니다.ss1111
        플러그인에2222222asdasd22 ReactRefreshWebpackPlugin()를 추가하면 유지가
        됩니다.111122222313222sadasasd
        <button onClick={() => setState((prev) => prev + 1)}>++</button>
        <Test />
      </div>
    </StyledTest>
  );
};

export default App;
