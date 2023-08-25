import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Box, Grid } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import postData from "../../lib/postsData";
import { useDispatch } from "react-redux";
import { addNewPostHandler } from "../../Store/Slices/postSlice";
import { ApiCallGet } from "../Api/ApiCall";
import axios from "axios";
import "./PostSection.scss";

const PostSection = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/posts");
      console.log(response.data);
      setPostData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Grid container spacing={2}>
      {/* <div style={{ color: "white" }} onClick={(event) => getposts(event)}>
        <h1>Hel</h1>
      </div> */}
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
          <button onClick={() => dispatch(addNewPostHandler(true))}>
            Add Post
          </button>
        </Box>
      </Grid>
      <Grid item md={12}>
        {postData.map((post, index) => (
          <PostCard
            key={index} 
            postId={post._id}     
            caption={post.caption}
            description={post.description}
            imageUrl={post.imageUrl}
            username={post.user.name}
            date={post.date}
            avatar={post.user.imageUrl}
            votes={post.votes}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default PostSection;
