import React from "react";
import { Box } from "@mui/material";
import "./ReviewCard.scss";
import { formatDistanceToNow } from "date-fns";
import { BiStar ,BiPhoneCall} from "react-icons/bi";

const ReviewCard = ({
  content,
  rating,
  votes,
  verified,
  date,
  company,
  companyImage,
  ratings,
  address,
  contact,
  description,
  companysize,
  industry,
}) => {
  // const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<BiStar key={i} color={i < numStars ? "#1d90f4" : "gray"} />);
    }
    return stars;
  };

  return (
    <Box className="review-card-container">
      <Box className="header">
        <Box className="user-area">
          <img src={companyImage} alt="" />
          <p>{company}</p>
          <p>{renderStars(ratings)}</p>
          <p><BiPhoneCall/> {contact}</p>
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
        <p className="industry-label">Description</p>
        <p>{description}
        </p>
      </Box>
    </Box>
  );
};

export default ReviewCard;
