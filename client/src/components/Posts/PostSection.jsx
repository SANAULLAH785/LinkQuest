import React, { useEffect } from "react";
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
  // useEffect(() => {
  //   ApiCallGet("/posts")
  //     .then((res) => console.log(res))
  //     .catch((err) => err);
  // }, []);

  const getposts = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:8000/posts");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

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
            caption={post.caption}
            description={post.description}
            imageUrl={post.imageUrl}
            username={post.username}
            date={post.date}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default PostSection;
