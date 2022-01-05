import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/client";
import theme from "./theme";
import client from "./graphql/client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
