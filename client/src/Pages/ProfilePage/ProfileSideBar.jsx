import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { MdOutlinePostAdd, MdReviews } from "react-icons/md";
import './ProfileSideBar.scss';
import { profileBarOptionsHandler } from '../../Store/Slices/functionalitySlice';


const ProfileSideBar = ({isOpenProfileSideBar,profilesideBarHandler}) => {
  const dispatch=useDispatch();
  const selectedOption = useSelector(
    (state) => state.functionalityState.profileBarOptions
  );
  const WorkhistorySectionHandler=()=>{
    dispatch(profileBarOptionsHandler("workhistory"))
  }
  return (
   <Box className="sidebar-container">
    <Box className="sidebar-content-container">
        <Box
          className={`sidebar-content ${isOpenProfileSideBar ? "" : "onSideBarOpen"} ${
            selectedOption === "profile" ? "bg-blue" : ""
          }`}
          onClick={() => dispatch(profileBarOptionsHandler("profile"))}
        >
          <MdOutlinePostAdd size={25} />
          {isOpenProfileSideBar ? <p>Profile</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${
            isOpenProfileSideBar ? "" : "onSideBarOpen"
          }  ${selectedOption === "workhistory" ? "bg-blue" : ""}`}
          onClick={() => WorkhistorySectionHandler()}
        >
          <MdReviews size={25} />
          {isOpenProfileSideBar ? <p>WorkHistory</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${isOpenProfileSideBar ? "" : "onSideBarOpen"} ${
            selectedOption === "profile" ? "bg-blue" : ""
          }`}
          onClick={() => dispatch(profileBarOptionsHandler("profile"))}
        >
          <MdOutlinePostAdd size={25} />
          {isOpenProfileSideBar ? <p>Profile</p> : ""}
        </Box>
        {/* <Box
          className={`sidebar-content ${
            isOpenProfileSideBar ? "" : "onSideBarOpen"
          }  ${selectedOption === "questions" ? "bg-blue" : ""}`}
          onClick={() => questionSectionHandler()}
        >
          <BsQuestionSquareFill size={25} />
          {isOpenProfileSideBar ? <p>Questions</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${
            isOpenProfileSideBar ? "" : "onSideBarOpen"
          }  ${selectedOption === "badges" ? "bg-blue" : ""}`}
          onClick={() => dispatch(sideBarOptionsHandler("badges"))}
        >
          <BsFillStarFill size={25} />
          {isOpenProfileSideBar ? <p>Badges</p> : ""}
        </Box> */}
      </Box>
   </Box>
  );
};

export default ProfileSideBar;
