import React, { useState } from "react";
import { Box } from "@mui/material";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { MdOutlinePostAdd, MdReviews } from "react-icons/md";
import { BsQuestionSquareFill, BsFillStarFill } from "react-icons/bs";

import "./Sidebar.scss";

const Sidebar = ({ isOpenSideBar, sideBarHandler }) => {
  // sx={{ width: "100px" }}

  return (
    <Box className="sidebar-container">
      <Box className="close-button " onClick={() => sideBarHandler(false)}>
        {isOpenSideBar ? (
          <BiChevronLeft size={25} />
        ) : (
          <BiChevronRight size={25} />
        )}
      </Box>
      <Box className="profile-section">
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          style={{ width: isOpenSideBar ? "100px" : "50px" }}
        />
        <p style={{ fontSize: isOpenSideBar ? "20px" : "12px" }}>Awais</p>
        {isOpenSideBar ? (
          <p style={{ fontSize: "12px" }}>MERN Stack Developer</p>
        ) : (
          ""
        )}
      </Box>
      <Box className="sidebar-content-container">
        <Box
          className={`sidebar-content ${isOpenSideBar ? "" : "onSideBarOpen"}`}
        >
          <MdOutlinePostAdd size={25} />
          {isOpenSideBar ? <p>Posts</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${isOpenSideBar ? "" : "onSideBarOpen"}`}
        >
          <MdReviews size={25} />
          {isOpenSideBar ? <p>Reviews</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${isOpenSideBar ? "" : "onSideBarOpen"}`}
        >
          <BsQuestionSquareFill size={25} />
          {isOpenSideBar ? <p>Questions</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${isOpenSideBar ? "" : "onSideBarOpen"}`}
        >
          <BsFillStarFill size={25} />
          {isOpenSideBar ? <p>Badges</p> : ""}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
