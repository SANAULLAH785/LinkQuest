import React from "react";
import { Box } from "@mui/material";

const AnswerCard = ({ avatar, username, caption, date }) => {
  return (
    <Box className="question-card-container">
      <Box className="header">
        <Box className="user-area">
          <img src={avatar} alt="" />
          <p>{username}</p>
        </Box>
        <p classname="date-section">{date}</p>
      </Box>
      <p class="title">{caption}</p>
    </Box>
  );
};

export default AnswerCard;
