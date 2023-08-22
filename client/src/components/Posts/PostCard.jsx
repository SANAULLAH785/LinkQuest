import React from "react";
import { Box } from "@mui/material";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { useDispatch } from "react-redux";
import "./PostCard.scss";

const PostCard = ({ description, imageUrl, caption, username, date }) => {
  return (
    <Box className="post-card-container">
      <Box className="header">
        <Box className="user-area">
          <img
            src="https://media.licdn.com/dms/image/D4D03AQFmRxQfBU-nIQ/profile-displayphoto-shrink_800_800/0/1671643608291?e=2147483647&v=beta&t=FKCGs1lq--wtDkHTqFCIXlZkUeKFbAm4oSQBVNS4oVQ"
            alt=""
          />
          <p>{username}</p>
        </Box>
        <p classname="date-section">{date}</p>
      </Box>
      <p>
        {description}
        {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
        blanditiis eum quam cumque beatae eligendi veritatis ex atque! Nulla
        rerum neque ab laudantium, veniam magni molestiae aliquam? Commodi,
        recusandae iure? Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Non error, dignissimos ab cupiditate alias perspiciatis
        consequuntur maiores sit? Tenetur ullam, voluptas obcaecati soluta
        molestiae perferendis doloribus inventore enim corrupti accusantium? */}
      </p>
      <img src={imageUrl} alt="" />
      <Box className="footer">
        <p className="caption">
          {caption}
          {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium
          laborum, veniam voluptas nesciunt omnis consectetur similique
          exercitationem architecto corrupti rem maxime minima, iure rerum quia
          velit soluta possimus pariatur! Dolor? */}
        </p>
        <Box className="votes">
          <BsArrowUpShort size={25} />
          <p>102</p>
          <BsArrowDownShort size={25} />
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
