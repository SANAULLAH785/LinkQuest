import React from "react";
import { Box } from "@mui/material";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { useDispatch } from "react-redux";
import "./PostCard.scss";

const PostCard = ({ description, imageUrl, caption, username, date }) => {
  return (
    <Box className="post-card-container">
      <Box className="header">
        <Box className="user-area">
          <img
            src="https://media.licdn.com/dms/image/D4D03AQFmRxQfBU-nIQ/profile-displayphoto-shrink_800_800/0/1671643608291?e=2147483647&v=beta&t=FKCGs1lq--wtDkHTqFCIXlZkUeKFbAm4oSQBVNS4oVQ"
            alt=""
          />
          <p>{username}</p>
        </Box>
        <p classname="date-section">{date}</p>
      </Box>
      <p>{description}</p>
      <img src={imageUrl} alt="" />
      <Box className="footer">
        <p className="caption">{caption}</p>
        <Box className="votes">
          <BsArrowUpShort size={25} />
          <p>102</p>
          <BsArrowDownShort size={25} />
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
