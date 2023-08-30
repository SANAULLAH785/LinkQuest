import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./ReviewSection.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewReviewHandler } from "../../Store/Slices/reviewSlice";
import ReviewCard from "./ReviewCard";
import { ApiCallGet } from "../Api/ApiCall";

const ReviewSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reviewdata,setReviewdata]=useState([]);
  const userId = useSelector((state) => state.userState.id);

  const getreviews=async()=>{
  try{
  const response=await ApiCallGet('/reviews')
  console.log(response);
  setReviewdata(response.data.reviews);
  }catch(error){
console.log(error);
  }
  }
  useEffect(()=>{
    getreviews();
  },[])

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
        <Grid item md={12}>
        {reviewdata.map((review,index)=>(
          <ReviewCard
          key={index}
          id={review._id}
          content={review.content}
          ratings={review.ratings}
          votes={review.votes}
          verified={review.verified}
          company={review.company.name} 
          companyImage={review.company.imageUrl} 
          contact={review.company.contact}
          address={review.company.address}
          rating={review.company.rating}
          description={review.company.description}
          date={review.date}

          >

          </ReviewCard>
         ) )}

        </Grid>
      </Grid>
    </>
  );
};

export default ReviewSection;
