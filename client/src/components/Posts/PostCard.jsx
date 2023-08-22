import React from "react";
import { Box } from "@mui/material";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import "./PostCard.scss";

const PostCard = () => {
  return (
    <Box className="post-card-container">
      <Box className="header">
        <Box className="user-area">
          <img
            src="https://media.licdn.com/dms/image/D4D03AQFmRxQfBU-nIQ/profile-displayphoto-shrink_800_800/0/1671643608291?e=2147483647&v=beta&t=FKCGs1lq--wtDkHTqFCIXlZkUeKFbAm4oSQBVNS4oVQ"
            alt=""
          />
          <p>Awais</p>
        </Box>
        <p classname="date-section">6d</p>
      </Box>
      <p>
        {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
        blanditiis eum quam cumque beatae eligendi veritatis ex atque! Nulla
        rerum neque ab laudantium, veniam magni molestiae aliquam? Commodi,
        recusandae iure? Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Non error, dignissimos ab cupiditate alias perspiciatis
        consequuntur maiores sit? Tenetur ullam, voluptas obcaecati soluta
        molestiae perferendis doloribus inventore enim corrupti accusantium? */}
      </p>
      <img
        src="https://www.bleepstatic.com/content/hl-images/2020/08/04/nodejs-header.jpg"
        alt=""
      />
      <Box className="footer">
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
