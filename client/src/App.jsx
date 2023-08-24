import React from "react";
import Layout from "./components/Layout/Layout";
import MainWrapper from "./MainWrapper";
import store from "./Store";
import Signup from "./Pages/Signup/Signup";
import Signin from "./Pages/Signin/Signin";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
          <Router>
            <Routes>
              <Route exact path="/" element={<MainWrapper />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/signin" element={<Signin />} />
            </Routes>
          </Router>
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
