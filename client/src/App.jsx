import React from "react";
import Layout from "./components/Layout/Layout";
import MainWrapper from "./MainWrapper";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import store from "./Store";
import "./styles/globals.scss";

const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {},
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <MainWrapper />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
