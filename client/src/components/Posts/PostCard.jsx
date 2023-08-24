import React from "react";
import { Box } from "@mui/material";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import "./PostCard.scss";

const PostCard = ({
  description,
  imageUrl,
  caption,
  username,
  date,
  avatar,
}) => {
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <Box className="post-card-container">
      <Box className="header">
        <Box className="user-area">
          <img src={avatar} alt="" />
          <p>{username}</p>
        </Box>
        <p classname="date-section">{timeAgo}</p>
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
