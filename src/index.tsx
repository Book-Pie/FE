import ReactDOM from "react-dom";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import store, { customHistory } from "modules/store";
import React from "react";
import GlobalStyle from "assets/style/global";
import styledTheme from "assets/style/styledTheme";
import materialThme from "assets/style/muiTheme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <MaterialThemeProvider theme={materialThme}>
      <StyledThemeProvider theme={styledTheme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Router history={customHistory}>
              <GlobalStyle />
              <ReactQueryDevtools initialIsOpen />
              <App />
            </Router>
          </QueryClientProvider>
        </Provider>
      </StyledThemeProvider>
    </MaterialThemeProvider>
  </React.StrictMode>,
  rootElement,
);
