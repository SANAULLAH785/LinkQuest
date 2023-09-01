import React, { useEffect, useState } from "react";
import "./QuestionModal.scss";
import { Box } from "@mui/material";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { sideBarOptionsHandler } from "../../Store/Slices/functionalitySlice";
import { setQuestionModalOpen } from "../../Store/Slices/questionSlice";
import { ApiCallGet } from "../Api/ApiCall";
import AddAnswer from "./AddAnswer";
import AnswerCard from "./AnswerCard";
import { ApiCallPut } from "../Api/ApiCall";
import "./QuestionModal.scss";

const QuestionModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    username,
    avatar,
    date,
    title,
    imageUrl,
    votes,
    caption,
    tags,
    id,
    voters,
    questionUserId,
  } = useSelector((state) => state.questionState.selectedQuestion);

  // const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  const [votesNumber, setVotesNumber] = useState(votes);
  const [timerId, setTimerId] = useState(null);
  const [initialRender, setInitialRender] = useState(true);

  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [voteStatus, setVoteStatus] = useState();
  const [answers, setAnswers] = useState([]);
  const [loadAnswer, setLoadAnswer] = useState(1);
  const userId = useSelector((state) => state.userState.id);

  const getAnswers = async () => {
    try {
      const response = await ApiCallGet(`/answers/${id}`);
      setAnswers(response.data.answers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const voterIndex = voters.findIndex(
      (voter) => voter.user.toString() === userId
    );

    if (voterIndex !== -1) {
      if (voters[voterIndex].voteStatus === "upvote") {
        setUpVoted(true);
      } else if (voters[voterIndex].voteStatus === "downvote") {
        setDownVoted(true);
      }
    }
  }, []);

  useEffect(() => {
    getAnswers();
  }, [loadAnswer]);

  const voteHandler = (check) => {
    if (userId) {
      if (timerId) {
        clearTimeout(timerId);
      }

      if (upVoted && check === "upvote") {
        setVotesNumber((prev) => prev - 1);
        setUpVoted(false);
        setVoteStatus("neutral");
        // console.log("upvvoted and vote for upvote");
      } else if (!upVoted && !downVoted && check === "upvote") {
        setVotesNumber((prevVote) => prevVote + 1);
        setUpVoted(true);
        setDownVoted(false);
        setVoteStatus("upvote");
        // console.log("not upvoted and vote for upvote");
      } else if (upVoted && check === "downvote") {
        setVotesNumber((prev) => prev - 2);
        setUpVoted(false);
        setDownVoted(true);
        setVoteStatus("downvote");
        // console.log("upvoted and vote for downvote");
      } else if (downVoted && check === "downvote") {
        setVotesNumber((prev) => prev + 1);
        setDownVoted(false);
        setVoteStatus("neutral");
        // console.log("downvvoted and vote for downvote");
      } else if (!downVoted && check === "downvote") {
        setVotesNumber((prevVote) => prevVote - 1);
        setDownVoted(true);
        setUpVoted(false);
        setVoteStatus("downvote");
        // console.log("not downvvoted and vote for upvote");
      } else if (downVoted && check === "upvote") {
        setVotesNumber((prev) => prev + 2);
        setUpVoted(true);
        setDownVoted(false);
        setVoteStatus("upvote");
        // console.log("downvvoted and vote for upvote");
      }

      setInitialRender(false);
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    if (initialRender === false) {
      votesUpdate();
    }
  }, [votesNumber]);

  const votesUpdate = () => {
    const newTimerId = setTimeout(async () => {
      await ApiCallPut(`/setQuestionVotes/${id}`, { vote: voteStatus })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.text);
        });
    }, 3000);
    setTimerId(newTimerId);
  };

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
      <h2>Answers:</h2>
      {answers.map((answer, index) => (
        <AnswerCard
          key={index}
          avatar={answer.user.imageUrl}
          username={answer.user.name}
          caption={answer.content}
          date={answer.date}
          verified={answer.verified}
          questionUserId={questionUserId}
          id={answer._id}
        />
      ))}
      <AddAnswer
        id={id}
        setLoadAnswer={setLoadAnswer}
        loadAnswer={loadAnswer}
      />
    </>
  );
};

export default QuestionModal;
