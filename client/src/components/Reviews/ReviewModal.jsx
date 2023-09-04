import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviewModalOpen } from "../../Store/Slices/reviewSlice";
import { sideBarOptionsHandler } from "../../Store/Slices/functionalitySlice";
import { BiStar, BiPhoneCall } from "react-icons/bi";
import {BiChevronLeft } from "react-icons/bi";
import './ReviewModal.scss';
import ReviewCard from "./ReviewCard";
import { ApiCallGet } from "../Api/ApiCall";
import AddReviews from './AddReviews';

const ReviewModal = () => {
  const {
    companyImage,
    company,
    rating,
    contact,
    address,
    companysize,
    industry,
    id
  } = useSelector((state) => state.reviewState.selectedCompanyData);
  const dispatch = useDispatch();
  const [reviewdata,setReviewsData]=useState([]);
  const[loadreview,setLoadReview]=useState(1);
  
  console.log(id,company);
  const getreviews = async () => {
    try {
      const response = await ApiCallGet(`/company/${id}`);
      console.log(response);
      setReviewsData(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getreviews();
  },[])

  const reviewSectionHandler = () => {
    dispatch(sideBarOptionsHandler("reviews"));
    dispatch(setReviewModalOpen(false));
  };
  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<BiStar key={i} color={i < numStars ? "#1d90f4" : "gray"} />);
    }
    return stars;
  };

  return (
  <>
    <div className="review-modal">
        <span onClick={() => reviewSectionHandler()} className="back-button">
          <BiChevronLeft size={40} />
        </span>
      <div className="header">
        
        <img src={companyImage} alt={company} className="company-image" />
        <div className="company-info">
          <h2>{company}</h2>
          <h4> {renderStars(rating)}</h4>
          <p><BiPhoneCall></BiPhoneCall> {contact}</p>
        </div>
      </div>
      <div className="details">
      <div className="location-info">
          <p className="location-label">Location</p>
          <p>{address}</p>
        </div>
        <div className="size-info">
          <p className="size-label">Company Size</p>
          <p>{companysize}</p>
        </div>
        <div className="industry-info">
          <p className="industry-label">Industry</p>
          <p>{industry}</p>
        </div>
      </div>
    </div>
    <h2>Reviews:</h2>
    
     {reviewdata.map((reviews, index) => (
        <ReviewCard
          key={index}
          avatar={reviews.user.imageUrl}
          username={reviews.user.name}
          content={reviews.content}
          ratings={reviews.ratings}
        /> 
       ))} 
       <AddReviews
       id={id}
       setLoadReview={setLoadReview}
        loadreview={loadreview}
       
       ></AddReviews>
    </>
  );
}

export default ReviewModal;
