import React, { useState } from "react";
import { Box } from "@mui/material";
import { GrFormClose } from "react-icons/gr";
import "./Sidebar.scss";

const Sidebar = ({ isOpenSideBar, sideBarHandler }) => {
  // sx={{ width: "100px" }}

  return (
    <Box className="sidebar-container">
      <Box className="close-button " onClick={() => sideBarHandler(false)}>
        <GrFormClose size={25} />
      </Box>
      <Box className="profile-section">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt=""
          style={{ width: isOpenSideBar ? "100px" : "50px" }}
        />
        <p style={{ fontSize: isOpenSideBar ? "20px" : "16px" }}>Awais</p>
      </Box>
    </Box>
  );
};

export default Sidebar;
