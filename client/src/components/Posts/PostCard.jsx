import React, { useState } from "react";
import { Box } from "@mui/material";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { ApiCallPost } from "../Api/ApiCall";
import { updateVotes } from "../../Store/Slices/voteSlice";
import { useSelector } from "react-redux";
import "./PostCard.scss";

const PostCard = ({
  description,
  imageUrl,
  caption,
  username,
  date,
  avatar,
  // votes,
  postId
}) => {
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  const [voting, setVoting] = useState(false);
  const dispatch = useDispatch();
  const votes = useSelector(state => state.voteState.votesMap[postId] || 0);
  const handleVote = async (type) => {
    if (voting) return;

    setVoting(true);
    try {
      const response = await ApiCallPost(`/posts/${postId}`, { type });
      console.log(response);
      const updatedVotes = response.data.updatedVotes;
      dispatch(updateVotes({ postId, newVoteCount: updatedVotes }));
      console.log("Redux store updated:", updatedVotes); // Add this line
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setVoting(false);
    }
  };

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
          <BsArrowUpShort onClick={() => handleVote("up")} size={25} />
          <p>{votes}</p>
          <BsArrowDownShort onClick={() => handleVote("down")} size={25} />
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
