import { Box } from '@mui/material'
import React from 'react';
import './ReviewCard.scss';
import { BiStar, BiPhoneCall } from "react-icons/bi";
import {AiFillStar} from "react-icons/ai";


const ReviewCard=({content,ratings,username,avatar})=> {


    const renderStars = (numStars) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          stars.push(<AiFillStar key={i} color={i < numStars ? "rgb(255, 215, 0)" : "gray"} />);
        }
        return stars;
      };
  return (
    <Box  className="review-card-container">
         <Box className="header">
         <Box className="user-area">
          <img src={avatar} alt="" />
          <p>{username}</p>
        </Box>
        </Box>
        <Box className="details">
            <p>{content}</p>
            <p>{renderStars(ratings)}</p>

        </Box>
       
    </Box>
  )
}

export default ReviewCard