import React, { useState } from "react";
import "./QuestionModal.scss";
import { Box } from "@mui/material";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { sideBarOptionsHandler } from "../../Store/Slices/functionalitySlice";
import { setQuestionModalOpen } from "../../Store/Slices/questionSlice";
import AddQuestion from "./AddQuestion";
import "./QuestionModal.scss";

const QuestionModal = () => {
  const dispatch = useDispatch();
  const { username, avatar, date, title, imageUrl, votes, caption, tags } =
    useSelector((state) => state.questionState.selectedQuestion);

  // const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  const [votesNumber, setVotesNumber] = useState(votes);
  const [timerId, setTimerId] = useState(null);
  const [initialRender, setInitialRender] = useState(true);

  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [voteStatus, setVoteStatus] = useState();

  const voteHandler = () => {};

  const questionSectionHandler = () => {
    dispatch(sideBarOptionsHandler("questions"));
    dispatch(setQuestionModalOpen(false));
  };

  return (
    <>
      <h2>
        <span onClick={() => questionSectionHandler()} className="back-button">
          <BiChevronLeft size={40} />
        </span>{" "}
        {title}
      </h2>

      <Box className="question-model-container">
        {/* <Box className="header">
          <Box className="user-area">
            <img src={avatar} alt="" />
            <p>{username}</p>
          </Box>
          <p classname="date-section">{date}</p>
        </Box> */}
        <Box className="content-box">
          <Box className="votes-section">
            <Box className="votes">
              <span className="vote-button">
                <BsArrowUpShort
                  size={40}
                  color={upVoted ? "#1d90f4" : "white"}
                  onClick={() => voteHandler("upvote")}
                />
              </span>

              <p>{votesNumber}</p>

              <span className="vote-button">
                <BsArrowDownShort
                  size={40}
                  color={downVoted ? "tomato" : "white"}
                  onClick={() => voteHandler("downvote")}
                />
              </span>
            </Box>

            {/* <Box>
              <SlOptionsVertical />
            </Box> */}
          </Box>
          <Box>
            {/* <p class="title">{title}</p> */}

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
            </Box>
          </Box>
        </Box>
      </Box>
      <AddQuestion />
    </>
  );
};

export default QuestionModal;
