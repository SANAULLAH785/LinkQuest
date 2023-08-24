import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addUserData } from "../../Store/Slices/userSlice";
import "./Header.scss";

const Header = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getPosts = async () => {
    const headers = {
      "Content-Type": "application/json",
      token: token,
    };
    try {
      const response = await axios.get(
        "http://localhost:8000/personalDataShort",
        { headers }
      );
      const userData = response.data;
      console.log(userData);
      dispatch(addUserData(userData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const toggleDropdown = (check) => {
    setIsDropdownOpen(check);
  };
  return (
    <Box className="Header">
      <h3 className="title">LinkQuest</h3>
      <Box className="header-profile">
        <IoNotificationsSharp size={30} />
        <Box
          className="settings"
          onClick={() => toggleDropdown(!isDropdownOpen)}
        >
          <p>Account</p>
          <MdArrowDropDown size={25} />
          {isDropdownOpen && (
            <Box
              className="dropdown-content"
              onMouseLeave={() => toggleDropdown(false)}
            >
              <Box className="each-option">
                <p>Profile</p>
                <BiChevronRight size={25} />
              </Box>
              <Box className="each-option">
                <p>Settings</p>
                <BiChevronRight size={25} />
              </Box>
              <Box className="each-option">
                <p>Log out</p>
                <BiChevronRight size={25} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
