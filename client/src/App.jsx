import React from "react";
import Layout from "./components/Layout/Layout";
import MainWrapper from "./MainWrapper";
import store from "./Store";
import Signup from "./Pages/Signup/Signup";
import Signin from "./Pages/Signin/Signin";
import QuestionDetails from "./Pages/QuestionDetails/QuestionDetails";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/globals.scss";
import AddReviews from "./components/Reviews/AddReviews";
import AddCompany from "./components/Reviews/AddCompany";

const theme = createTheme({
  components: {
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
              <Route exact path="/reviews" element={<AddReviews />} />
              <Route exact path="/addcompany" element={<AddCompany />} />
              <Route path="/question/:id" component={QuestionDetails} />
            </Routes>
          </Router>
        </Layout>
        <Toaster />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
