import React, { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PostSection from "./components/Posts/PostSection";
import { Grid, Box } from "@mui/material";

const Homepage = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);

  const sideBarHandler = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  return (
    <>
      <Box className="homepage">
        <Header />

        <Box className="app-section">
          <Grid container spacing={2}>
            <Grid item md={isOpenSideBar ? 2 : 1} className="sidebar">
              <Sidebar
                isOpenSideBar={isOpenSideBar}
                sideBarHandler={sideBarHandler}
              />
            </Grid>
            <Grid item md={isOpenSideBar ? 7 : 8} className="sidebar">
              <PostSection />
            </Grid>
            <Grid item md={3} className="sidebar">
              <Sidebar
                isOpenSideBar={isOpenSideBar}
                sideBarHandler={sideBarHandler}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
