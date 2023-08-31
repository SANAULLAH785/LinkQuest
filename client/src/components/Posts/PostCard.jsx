import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { SlOptionsVertical } from "react-icons/sl";
import { BiComment } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  setPostModalOpen,
  setSelectedPost,
} from "../../Store/Slices/postSlice";
import { ApiCallPut } from "../Api/ApiCall";
import "./PostCard.scss";

const PostCard = ({
  description,
  imageUrl,
  caption,
  username,
  date,
  avatar,
  votes,
  id,
  voters,
}) => {
  const selectedData = {
    description,
    imageUrl,
    caption,
    username,
    date,
    avatar,
    votes,
    id,
    voters,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

  // States for vote Handling
  const [votesNumber, setVotesNumber] = useState(votes);
  const [timerId, setTimerId] = useState(null);
  const [initialRender, setInitialRender] = useState(true);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [voteStatus, setVoteStatus] = useState();
  const userId = useSelector((state) => state.userState.id);

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

  const openPostModal = () => {
    if (userId) {
      dispatch(setPostModalOpen(true));
      dispatch(setSelectedPost(selectedData));
    } else {
      navigate("/signin");
    }
  };

  const voteHandler = (check) => {
    if (userId) {
      if (timerId) {
        clearTimeout(timerId);
      }

      if (upVoted && check === "upvote") {
        setVotesNumber(votes - 1);
        setUpVoted(false);
        setVoteStatus("neutral");
      } else if (!upVoted && check === "upvote") {
        setVotesNumber((prevVote) => prevVote + 1);
        setUpVoted(true);
        setDownVoted(false);
        setVoteStatus("upvote");
      } else if (upVoted && check === "downvote") {
        setVotesNumber(votes - 2);
        setUpVoted(false);
        setDownVoted(true);
        setVoteStatus("downvote");
      } else if (downVoted && check === "downvote") {
        setVotesNumber(votes + 1);
        setDownVoted(false);
        setVoteStatus("neutral");
      } else if (!downVoted && check === "downvote") {
        setVotesNumber((prevVote) => prevVote - 1);
        setDownVoted(true);
        setUpVoted(false);
        setVoteStatus("downvote");
      } else if (downVoted && check === "upvote") {
        setVotesNumber(votes + 2);
        setUpVoted(true);
        setDownVoted(false);
        setVoteStatus("upvote");
      }

      setInitialRender(false);
    } else {
      navigate("/signin");
    }
  };

  const votesUpdate = () => {
    const newTimerId = setTimeout(async () => {
      await ApiCallPut(`/setPostVotes/${id}`, { vote: voteStatus })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.text);
        });
    }, 3000);
    setTimerId(newTimerId);
  };

  useEffect(() => {
    if (initialRender === false) {
      votesUpdate();
    }
  }, [votesNumber]);

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
          <Box className="comments" onClick={() => openPostModal()}>
            <BiComment size={25} />
            <p>Comments</p>
          </Box>
          <Box>
            <SlOptionsVertical />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
