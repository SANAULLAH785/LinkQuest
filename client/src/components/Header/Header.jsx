import React, { useState } from "react";
import { Box } from "@mui/material";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import "./Header.scss";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
