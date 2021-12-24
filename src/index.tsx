import ReactDOM from "react-dom";
import { Router } from "react-router";
import { Provider } from "react-redux";
import store, { customHistory } from "modules/store";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <App />
    </Router>
  </Provider>,
  rootElement,
);
