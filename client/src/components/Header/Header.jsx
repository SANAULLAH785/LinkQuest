import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../../Store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userEmail = useSelector((state) => state.userState.email);
  const userid = useSelector((state) => state.userState.id);
console.log(userid);

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
  const profilehandler = () => {
    navigate("/profile");
  };
  const logoutHandler = () => {
    console.log("logig Out");
    localStorage.removeItem("token");
    dispatch(removeUserData());
    navigate("/");
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
        <Box
          className="settings"
          onClick={() => toggleDropdown(!isDropdownOpen)}
        >
          {userEmail ? (
            <>
              <IoNotificationsSharp size={30} />
              <p>Account</p>
              <MdArrowDropDown size={25} />
              {isDropdownOpen && (
                <Box
                  className="dropdown-content"
                  onMouseLeave={() => toggleDropdown(false)}
                >
                  <Box className="each-option">
                    <p onClick={() => profilehandler()}>Profile</p>
                    <BiChevronRight size={25} />
                  </Box>
                  <Box className="each-option">
                    <p>Settings</p>
                    <BiChevronRight size={25} />
                  </Box>
                  <Box className="each-option">
                    <p onClick={() => logoutHandler()}>Log out</p>
                    <BiChevronRight size={25} />
                  </Box>
                </Box>
              )}
            </>
          ) : (
            <>
              <p onClick={() => navigate("/signup")}>Signup</p>
              <p onClick={() => navigate("/signin")}>Signin</p>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
