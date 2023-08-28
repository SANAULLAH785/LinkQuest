import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import { Box, Grid } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addNewPostHandler } from "../../Store/Slices/postSlice";
import { useNavigate } from "react-router-dom";
import { ApiCallGet } from "../Api/ApiCall";
import axios from "axios";
import "./PostSection.scss";

const PostSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openPostModal = useSelector((state) => state.postState.postModalOpen);
  const userId = useSelector((state) => state.userState.id);
  const [postData, setPostData] = useState([]);
  console.log(postData);

  const getPosts = async () => {
    try {
      const response = await ApiCallGet("/posts");
      setPostData(response.data.Posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const addPostHanlder = () => {
    if (userId) {
      dispatch(addNewPostHandler(true));
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      {openPostModal ? <PostModal /> : ""}
      <Grid container spacing={2}>
        <Grid item md={12} className="">
          <Box className="searchbar">
            <Box className="search">
              <BsSearch size={15} />
            </Box>
            <input type="text" placeholder="Search" />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box className="button-section">
            <button onClick={() => addPostHanlder()}>Add Post</button>
          </Box>
        </Grid>
        <Grid item md={12}>
          {postData.map((post, index) => (
            <PostCard
              key={index}
              id={post._id}
              caption={post.caption}
              description={post.description}
              imageUrl={post.imageUrl}
              username={post.user.name}
              date={post.date}
              avatar={post.user.imageUrl}
              votes={post.votes}
              voters={post.voters}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default PostSection;
