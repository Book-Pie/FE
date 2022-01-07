import ReactDOM from "react-dom";
import { Router } from "react-router";
import { Provider } from "react-redux";
import store, { customHistory } from "modules/store";
import { createGlobalStyle } from "styled-components";
import React from "react";
import App from "./App";

const rootElement = document.getElementById("root");

const GlobalStyle = createGlobalStyle`
a {
    color: black;
    display: block;
    text-decoration: none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={customHistory}>
        <GlobalStyle />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  rootElement,
);
