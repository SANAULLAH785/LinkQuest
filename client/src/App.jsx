import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import MainWrapper from "./MainWrapper";
import store from "./Store";
import Signup from "./Pages/Signup/Signup";
import Signin from "./Pages/Signin/Signin";
import QuestionDetails from "./Pages/QuestionDetails/QuestionDetails";
import ChatPage from "./Pages/ChatPage/ChatPage";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/globals.scss";
import AddReviews from "./components/Reviews/AddReviews";
import AddCompany from "./components/Reviews/AddCompany";
import ProfilePage from "./Pages/ProfilePage/Profile/ProfilePage";
import ProfileSideBar from "./Pages/ProfilePage/ProfileSideBar";
import ProfileSection from "./Pages/ProfilePage/ProfileSection";

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {},
    },
  },
});

const App = () => {
  const token = localStorage.getItem("token");

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

              <Route
                path="/chat"
                element={token ? <ChatPage /> : <MainWrapper />}
              />
              <Route path="/Complete/Profile" element={<ProfilePage />}></Route>
              <Route path="/Editprofile" element={<ProfileSideBar />}></Route>
              <Route path="/profile" element={<ProfileSection />}></Route>
            </Routes>
          </Router>
        </Layout>
        <Toaster />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
