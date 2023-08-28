import React, { useState } from "react";
import { Box } from "@mui/material";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { formatDistanceToNow } from "date-fns";

const QuestionCard = ({ username, avatar, imageUrl, date, votes, caption }) => {
  const [votesNumber, setVotesNumber] = useState(votes);
  const [timerId, setTimerId] = useState(null);
  const [initialRender, setInitialRender] = useState(true);

  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [voteStatus, setVoteStatus] = useState();

  const voteHandler = () => {};
  return (
    <Box className="post-card-container">
      <Box className="header">
        <Box className="user-area">
          <img src={avatar} alt="" />
          <p>{username}</p>
        </Box>
        <p classname="date-section">{date}</p>
      </Box>

      <img src={imageUrl} alt="" />
      <Box className="footer">
        <Box>
          <p className="caption">{caption}</p>
        </Box>
        <Box className="votes-section">
          <Box className="votes">
            <span className="vote-button">
              <BsArrowUpShort
                size={25}
                color={upVoted ? "#1d90f4" : "white"}
                onClick={() => voteHandler("upvote")}
              />
            </span>

            <p>{votesNumber}</p>

            <span className="vote-button">
              <BsArrowDownShort
                size={25}
                color={downVoted ? "tomato" : "white"}
                onClick={() => voteHandler("downvote")}
              />
            </span>
          </Box>

          <Box>
            <SlOptionsVertical />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionCard;
