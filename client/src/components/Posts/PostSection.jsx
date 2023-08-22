import React from "react";
import PostCard from "./PostCard";
import { Box, Grid } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import "./PostSection.scss";

const PostSection = () => {
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
          <button>Add Post</button>
        </Box>
      </Grid>
      <Grid item md={12}>
        <PostCard />
      </Grid>
    </Grid>
  );
};

export default PostSection;
