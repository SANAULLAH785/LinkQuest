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
  const [reviewdata, setReviewdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const userId = useSelector((state) => state.userState.id);

  const getreviews = async () => {
    try {
      const response = await ApiCallGet("/reviews");
      console.log(response);
      setReviewdata(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getreviews();
  }, []);

  const handelAddReview = () => {
    if (userId) {
      dispatch(addNewReviewHandler(true));
    } else {
      navigate("/reviews");
    }
  };
  const filteredReviews = reviewdata.filter((review) =>
    review.company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} className="">
          <Box className="searchbar">
            <Box className="search">
              <BsSearch size={15}></BsSearch>
            </Box>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box className="buttonsection">
            <button onClick={() => handelAddReview()}>Add a Review</button>
          </Box>
        </Grid>
        <Grid item md={12}>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
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
                companysize={review.company.companysize}
                industry={review.company.industry}
                date={review.date}
              />
            ))
          ) : (
            <div className="no-results">
              <p>No results found.</p>
              <button className="add-company" onClick={() => navigate("/addcompany")}>
                Add Company
              </button>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewSection;
