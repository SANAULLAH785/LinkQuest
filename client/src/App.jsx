import React from "react";
import Layout from "./components/Layout/Layout";
import Homepage from "./Homepage";
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
          <Homepage />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
