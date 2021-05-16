import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";

import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
import deepPurple from "@material-ui/core/colors/deepPurple";
import blue from "@material-ui/core/colors/blue";
import indigo from "@material-ui/core/colors/indigo";
import { SocketProvider } from "./Contexts/SocketContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: pink[300],
      main: pink[500],
      dark: pink[700],
    },
    secondary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
    error: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <Router>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
