import React, { useState } from "react";
import { Grid, Box, TextField } from "@mui/material";
import { BiImageAdd } from "react-icons/bi";
import { BsTextLeft } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addNewPostHandler } from "../../Store/Slices/postSlice";
import "./AddNewPost.scss";

const AddNewPost = () => {
  const dispatch = useDispatch();
  const [imageSection, setImageSection] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
  };

  const buttonHandler = (check) => {
    setImageSection(check);
  };

  return (
    <Box className="new-post-container">
      <Box className="closing-div"></Box>
      <Box className="header">
        <p>Add New Post</p>
        <Box
          className="close-button"
          onClick={() => dispatch(addNewPostHandler(false))}
        >
          <MdClose color="white" size={25} />
        </Box>
      </Box>
      <Box className="button-container">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <button
              style={{ opacity: `${imageSection ? 1 : "70%"}` }}
              onClick={() => buttonHandler(true)}
            >
              <BiImageAdd color="#f7f7f7" size={25} />
            </button>
          </Grid>
          <Grid item xs={6}>
            <button
              style={{ opacity: `${imageSection ? "70%" : 1}` }}
              onClick={() => buttonHandler(false)}
            >
              <BsTextLeft color="#f7f7f7" size={25} />
            </button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {imageSection ? (
          <Box className="image-section">
            <form action="">
              {selectedImage && (
                <Box className="image-preview">
                  <img src={selectedImage} alt="Selected" />
                  <Box className="close-button">
                    <MdClose size={25} onClick={clearSelectedImage} />
                  </Box>
                </Box>
              )}
              {!selectedImage && (
                <label htmlFor="image-input" className="input-image">
                  <div className="icon-wrapper">
                    <BsCardImage size={35} />
                  </div>
                  <p>Add Image</p>
                  <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}

              <textarea name="" id="" placeholder="add caption..."></textarea>

              <button>Post</button>
            </form>
          </Box>
        ) : (
          <Box className="text-container">
            <textarea
              name=""
              id=""
              placeholder="add your thoughts..."
            ></textarea>
            <button>Post</button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddNewPost;
