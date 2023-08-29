import { Box, Grid } from "@mui/material";
import React from "react";
import { BsSearch } from "react-icons/bs";
import "./ReviewSection.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewReviewHandler } from "../../Store/Slices/reviewSlice";

const ReviewSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userState.id);

  const handelAddReview = () => {
    if (userId) {
    dispatch(addNewReviewHandler(true));
    }else{
    navigate("/signin");
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} className="">
          <Box className="searchbar">
            <Box className="search">
              <BsSearch size={15}></BsSearch>
            </Box>
            <input type="text" placeholder="Search"></input>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box className="buttonsection">
            <button onClick={() => handelAddReview()}>Add a Review</button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewSection;
