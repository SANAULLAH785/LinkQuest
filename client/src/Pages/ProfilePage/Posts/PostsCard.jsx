import React from "react";
import { Box, Grid } from "@mui/material";

import "./PostsCard.scss";

const PostsCard = ({ id, image, description }) => {
    console.log(image);
  return (
    <Box className="post-card-container">
      <p>{description}</p>
      <img src={image} alt="" />

</Box>
  );
};

export default PostsCard;
