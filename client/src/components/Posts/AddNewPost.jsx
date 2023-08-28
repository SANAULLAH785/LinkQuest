import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Box, TextField } from "@mui/material";
import { BiImageAdd } from "react-icons/bi";
import { BsBox2HeartFill, BsTextLeft } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addNewPostHandler } from "../../Store/Slices/postSlice";
import { ApiCallPost } from "../Api/ApiCall";
import "./AddNewPost.scss";
import { toast } from "react-hot-toast";

const AddNewPost = () => {
  const dispatch = useDispatch();
  const [imageSection, setImageSection] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    formik.setFieldValue("image", null);
  };

  const buttonHandler = (check) => {
    setImageSection(check);
  };

  const descriptionInitialValue = {
    description: "",
  };

  const descriptionValidation = {
    description: Yup.string().required("Textfield is required"),
  };

  const descriptionFormik = useFormik({
    initialValues: descriptionInitialValue,
    validationSchema: Yup.object(descriptionValidation),
    onSubmit: async (values) => {
      console.log(values);
      await ApiCallPost("/textpost", values)
        .then((res) => {
          console.log(res);
          toast.success("Post added Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const initialValues = {
    image: null,
    caption: "",
  };

  const validationSchema = Yup.object({
    image: Yup.mixed()
      .required("An image is required")
      .test("fileType", "Only image files are allowed", (value) => {
        return value && value.type.startsWith("image/");
      }),
    caption: Yup.string().required("A caption is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
      await ApiCallPost("/post", values, "multipart/form-data")
        .then((res) => {
          console.log(res);
          toast.success("Post added Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
              {selectedImage && (
                <Box className="image-preview">
                  <img src={selectedImage} alt="Selected" />
                  <Box className="close-button">
                    <MdClose size={25} onClick={clearSelectedImage} />
                  </Box>
                </Box>
              )}
              {!selectedImage && (
                <label htmlFor="image" className="input-image">
                  <div className="icon-wrapper">
                    <BsCardImage size={35} />
                  </div>
                  <p>Add Image</p>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "image",
                        event.currentTarget.files[0]
                      );
                      handleImageChange(event);
                    }}
                  />
                  {formik.errors.image && formik.touched.image && (
                    <p className="error">{formik.errors.image}</p>
                  )}
                </label>
              )}

              <textarea
                name="caption"
                id="caption"
                placeholder="add caption..."
                onChange={formik.handleChange}
              ></textarea>
              {formik.errors.caption && formik.touched.caption && (
                <p className="error">{formik.errors.caption}</p>
              )}

              <button type="submit">Post</button>
            </form>
          </Box>
        ) : (
          <Box className="text-container">
            <form onSubmit={descriptionFormik.handleSubmit}>
              <textarea
                name="description"
                id="description"
                placeholder="add your thoughts..."
                onChange={descriptionFormik.handleChange}
              ></textarea>
              <button type="submit">Post</button>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddNewPost;
