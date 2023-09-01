import React from "react";
import { Box } from "@mui/material";
import "./ReviewCard.scss";
import { formatDistanceToNow } from "date-fns";
import { BiStar, BiPhoneCall } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setReviewModalOpen,setSelectedCompanyData } from "../../Store/Slices/reviewSlice";

const ReviewCard = ({
  content,
  ratings,
  votes,
  verified,
  date,
  company,
  companyImage,
  rating,
  address,
  contact,
  description,
  companysize,
  industry,
}) => {
  const dispatch = useDispatch();

  const reviewModalHandler=()=>{
    dispatch(setReviewModalOpen(true));
    dispatch(setSelectedCompanyData({
      companyImage,
      company,
      rating,
      contact,
      address,
      companysize,
      industry


    }))
  }
  // const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<BiStar key={i} color={i < numStars ? "#1d90f4" : "gray"} />);
    }
    return stars;
  };

  return (
    <Box className="review-card-container"
    onClick={()=>reviewModalHandler()}
    >
      <Box className="header">
        <Box className="user-area">
          <Box className="header-first">
            <img src={companyImage} alt="" />
            <p>{company}</p>
            <p>{renderStars(rating)}</p>
            <p>
              <BiPhoneCall /> {contact}
            </p>
          </Box>

          <a>Reviews</a>
        </Box>
      </Box>
      <Box className="info-row">
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
      </Box>
      <Box>
        {description ? (
          <>
            {" "}
            <p className="industry-label">Description</p>
            <p>{description}</p>{" "}
          </>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default ReviewCard;
