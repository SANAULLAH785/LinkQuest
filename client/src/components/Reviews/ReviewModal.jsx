import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviewModalOpen } from "../../Store/Slices/reviewSlice";
import { sideBarOptionsHandler } from "../../Store/Slices/functionalitySlice";
import { BiStar, BiPhoneCall } from "react-icons/bi";
import {BiChevronLeft } from "react-icons/bi";
import './ReviewModal.scss';

const ReviewModal = () => {
  const {
    companyImage,
    company,
    rating,
    contact,
    address,
    companysize,
    industry,
  } = useSelector((state) => state.reviewState.selectedCompanyData);
  const dispatch = useDispatch();

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
        <h4> {rating}</h4>
        <h4>Address: {address}</h4>
        <h4>Company Size: {companysize}</h4>
        <h4>Industry: {industry}</h4>
      </div>
    </div>
  );
}

export default ReviewModal;
