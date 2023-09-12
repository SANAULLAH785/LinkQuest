import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { MdOutlinePostAdd, MdReviews } from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import {MdWorkHistory} from "react-icons/md"
import {FaUserFriends} from "react-icons/fa";
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
   <Box className="sidebar-containers">
    <Box className="sidebar-content-containers">
        <Box
          className={`sidebar-content ${isOpenProfileSideBar ? "" : "onSideBarOpen"} ${
            selectedOption === "profile" ? "bg-blue" : ""
          }`}
          onClick={() => dispatch(profileBarOptionsHandler("profile"))}
        >
          <CgProfile size={25} />
          {isOpenProfileSideBar ? <p>Profile</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${
            isOpenProfileSideBar ? "" : "onSideBarOpen"
          }  ${selectedOption === "workhistory" ? "bg-blue" : ""}`}
          onClick={() => WorkhistorySectionHandler()}
        >
          <MdWorkHistory size={25} />
          {isOpenProfileSideBar ? <p>Work</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${isOpenProfileSideBar ? "" : "onSideBarOpen"} ${
            selectedOption === "posts" ? "bg-blue" : ""
          }`}
          onClick={() => dispatch(profileBarOptionsHandler("posts"))}
        >
          <MdOutlinePostAdd size={25} />
          {isOpenProfileSideBar ? <p>Posts</p> : ""}
        </Box>
        <Box
          className={`sidebar-content ${isOpenProfileSideBar ? "" : "onSideBarOpen"} ${
            selectedOption === "friends" ? "bg-blue" : ""
          }`}
          onClick={() => dispatch(profileBarOptionsHandler("friends"))}
        >
          <FaUserFriends size={25} />
          {isOpenProfileSideBar ? <p>Friends</p> : ""}
        </Box>
      
      </Box>
   </Box>
  );
};

export default ProfileSideBar;
