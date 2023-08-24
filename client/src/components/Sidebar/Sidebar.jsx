import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { MdOutlinePostAdd, MdReviews } from "react-icons/md";
import { BsQuestionSquareFill, BsFillStarFill } from "react-icons/bs";

import "./Sidebar.scss";

const Sidebar = ({ isOpenSideBar, sideBarHandler }) => {
  // sx={{ width: "100px" }}
  const userData = useSelector((state) => state.userState);
  const firstName = userData.userName.split(" ")[0];

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
          src={userData.avatar}
          alt=""
          style={{ width: isOpenSideBar ? "100px" : "50px" }}
        />
        <p style={{ fontSize: isOpenSideBar ? "20px" : "12px" }}>{firstName}</p>
        {isOpenSideBar ? (
          <>
            {userData.jobTitle ? (
              <p style={{ fontSize: "12px" }}>{userData.jobTitle}</p>
            ) : (
              <Link to={"/signup"} className="link">
                Complete your Profile
              </Link>
            )}
          </>
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
