import React from 'react';
import ReactDOM from 'react-dom';
import {createTheme, ThemeProvider} from "@mui/material";
import { Provider } from "react-redux";
import { App } from './components';
import reportWebVitals from './reportWebVitals';
import { store } from "./store";
import './assets/css/styles.scss';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 12,
  },
  palette: {
    primary: {
      main: '#363636',
      dark: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          fontSize: 16,
          justifyContent: "flex-start"
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
