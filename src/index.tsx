import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import store, { customHistory } from "modules/store";
import React from "react";
import GlobalStyle from "src/assets/style/global";
import App from "./App";
import styledTheme from "./assets/style/styledTheme";
import materialThme from "./assets/style/muiTheme";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <MaterialThemeProvider theme={materialThme}>
      <StyledThemeProvider theme={styledTheme}>
        <Provider store={store}>
          <Router history={customHistory}>
            <GlobalStyle />
            <App />
          </Router>
        </Provider>
      </StyledThemeProvider>
    </MaterialThemeProvider>
  </React.StrictMode>,
  rootElement,
);
