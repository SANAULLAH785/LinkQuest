import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { MdOutlinePostAdd, MdReviews } from "react-icons/md";
import { BsQuestionSquareFill, BsFillStarFill } from "react-icons/bs";
import { sideBarOptionsHandler } from "../../Store/Slices/functionalitySlice";
import { setQuestionModalOpen } from "../../Store/Slices/questionSlice";
import { setReviewModalOpen } from "../../Store/Slices/reviewSlice";

import "./Sidebar.scss";

const Sidebar = ({ isOpenSideBar, sideBarHandler }) => {
  // sx={{ width: "100px" }}
  const userData = useSelector((state) => state.userState);
  const firstName = userData.userName?.split(" ")[0];
  const selectedOption = useSelector(
    (state) => state.functionalityState.sideBarOptions
  );
  const dispatch = useDispatch();

  const questionSectionHandler = () => {
    dispatch(sideBarOptionsHandler("questions"));
    dispatch(setQuestionModalOpen(false));
  };
  const reviewSectionHandler=()=>{
    dispatch(sideBarOptionsHandler("reviews"));
    dispatch(setReviewModalOpen(false));
  }

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
          src={userData.imageUrl}
          alt=""
          style={{ width: isOpenSideBar ? "100px" : "50px" }}
        />
        <p style={{ fontSize: isOpenSideBar ? "20px" : "12px" }}>{firstName}</p>
        {isOpenSideBar ? (
          <>
            {userData.jobTitle ? (
              <p style={{ fontSize: "12px" }}>{userData.jobTitle}</p>
            ) : (
              <Link to={"/profile"} className="link">
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
          className={`sidebar-content ${isOpenSideBar ? "" : "onSideBarOpen"} ${
            selectedOption === "posts" ? "bg-blue" : ""
          }`}
          onClick={() => dispatch(sideBarOptionsHandler("posts"))}
        >
          <MdOutlinePostAdd size={25} />
          {isOpenSideBar ? <p>Posts</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${
            isOpenSideBar ? "" : "onSideBarOpen"
          }  ${selectedOption === "reviews" ? "bg-blue" : ""}`}
          onClick={() => reviewSectionHandler()}
        >
          <MdReviews size={25} />
          {isOpenSideBar ? <p>Reviews</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${
            isOpenSideBar ? "" : "onSideBarOpen"
          }  ${selectedOption === "questions" ? "bg-blue" : ""}`}
          onClick={() => questionSectionHandler()}
        >
          <BsQuestionSquareFill size={25} />
          {isOpenSideBar ? <p>Questions</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${
            isOpenSideBar ? "" : "onSideBarOpen"
          }  ${selectedOption === "badges" ? "bg-blue" : ""}`}
          onClick={() => dispatch(sideBarOptionsHandler("badges"))}
        >
          <BsFillStarFill size={25} />
          {isOpenSideBar ? <p>Badges</p> : ""}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
