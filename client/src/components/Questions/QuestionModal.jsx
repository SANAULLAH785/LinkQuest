import React from "react";
import "./QuestionModal.scss";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const QuestionModal = () => {
  const { username, avatar, date, title, imageUrl, votes, caption, tags } =
    useSelector((state) => state.questionState.selectedQuestion);
  return (
    <>
      <h1>Question</h1>
      <Box className="question-card-container">
        <Box className="header">
          <Box className="user-area">
            <img src={avatar} alt="" />
            <p>{username}</p>
          </Box>
          <p classname="date-section">{date}</p>
        </Box>
        <p class="title">{title}</p>

        <img src={imageUrl} alt="" />
        <Box className="footer">
          <Box>
            <p className="caption">{caption}</p>
          </Box>

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
    </>
  );
};

export default QuestionModal;
