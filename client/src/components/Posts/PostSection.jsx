import React from "react";
import PostCard from "./PostCard";
import { Box, Grid } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import postData from "../../lib/postsData";
import { useDispatch } from "react-redux";
import { addNewPostHandler } from "../../Store/Slices/postSlice";
import "./PostSection.scss";

const PostSection = () => {
  const dispatch = useDispatch();

  return (
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
          <button onClick={() => dispatch(addNewPostHandler(true))}>
            Add Post
          </button>
        </Box>
      </Grid>
      <Grid item md={12}>
        {postData.map((post) => (
          <PostCard
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
