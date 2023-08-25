import React from "react";
import "./PostModal.scss";
import { Box } from "@mui/material";
import PostCard from "./PostCard";
import { setPostModalOpen } from "../../Store/Slices/postSlice";
import { useDispatch } from "react-redux";

const PostModal = () => {
  const dispatch = useDispatch();
  return (
    <Box
      className="main-container"
      onClick={() => dispatch(setPostModalOpen(false))}
    >
      Hey Babe
    </Box>
  );
};

export default PostModal;
