import React, { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
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
        <Grid container spacing={2}>
          <Grid item xs={6} md={isOpenSideBar ? 2 : 1}>
            <Sidebar
              isOpenSideBar={isOpenSideBar}
              sideBarHandler={sideBarHandler}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Homepage;
