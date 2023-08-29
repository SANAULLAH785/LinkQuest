import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
// import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
// import { SlOptionsVertical } from "react-icons/sl";
// import { ApiCallGet } from "../Api/ApiCall";
// import { formatDistanceToNow } from "date-fns";
import { useDispatch } from "react-redux";
import {
  setQuestionModalOpen,
  setSelectedQuestion,
} from "../../Store/Slices/questionSlice";
import "./QuestionCard.scss";

const QuestionCard = ({
  username,
  avatar,
  imageUrl,
  date,
  votes,
  caption,
  title,
  tags,
}) => {
  const dispatch = useDispatch();
  // const [votesNumber, setVotesNumber] = useState(votes);
  // const [timerId, setTimerId] = useState(null);
  // const [initialRender, setInitialRender] = useState(true);

  // const [upVoted, setUpVoted] = useState(false);
  // const [downVoted, setDownVoted] = useState(false);
  // const [voteStatus, setVoteStatus] = useState();

  // const voteHandler = () => {};

  const questionModalHandler = () => {
    dispatch(setQuestionModalOpen(true));
    dispatch(
      setSelectedQuestion({
        username,
        avatar,
        date,
        title,
        imageUrl,
        votes,
        caption,
        tags,
      })
    );
  };

  return (
    <Box
      className="question-card-container"
      onClick={() => questionModalHandler()}
    >
      <Box className="header">
        <Box className="user-area">
          <img src={avatar} alt="" />
          <p>{username}</p>
        </Box>
        <p classname="date-section">{date}</p>
      </Box>
      <p class="title">{title}</p>

      {/* <img src={imageUrl} alt="" /> */}
      <Box className="footer">
        {/* <Box>
          <p className="caption">{caption}</p>
        </Box> */}

        <Box className="tags-section">
          {tags.map((tag, index) => (
            <>
              <p key={index} className="tags">
                {tag}
              </p>
            </>
          ))}
        </Box>
        {/* <Box className="votes-section">
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
        </Box> */}
      </Box>
    </Box>
  );
};

export default QuestionCard;
