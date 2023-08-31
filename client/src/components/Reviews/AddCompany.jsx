import React, { useState } from "react";
import "./AddCompany.scss";
import { ApiCallPost } from "../Api/ApiCall";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Box, TextField } from "@mui/material";
import { BiImageAdd } from "react-icons/bi";
import { BsBox2HeartFill, BsTextLeft } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";

const AddCompany = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("imageurl", imageUrl);
      setSelectedImage(imageUrl);
      setImageFile(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    formik.setFieldValue("image", null);
  };
  const initialValues = {
    image: null,
    name: "",
    rating:0,
    address:"",
    contact:"",
    description:"",
    industry:"",
    companysize:0,
    

  };

  const validationSchema = Yup.object({
    image: Yup.mixed()
      .required("An image is required")
      .test("fileType", "Only image files are allowed", (value) => {
        return value && value.type.startsWith("image/");
      }),
    // caption: Yup.string().required("A caption is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(" company Form values:", values);
      await ApiCallPost("/addcompany", values, "multipart/form-data")
        .then((res) => {
          console.log(res);
          //   dispatch(addNewPostHandler(false));
          // toast.success("Post added Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
   
    <Box className="image-section">

     <form onSubmit={formik.handleSubmit}>
          <Box className="image-preview">
            {selectedImage && (
              <>
                <img src={selectedImage} alt="Selected" />
                <Box className="close-button">
                  <MdClose size={25} onClick={clearSelectedImage} />
                </Box>
              </>
            )}
          </Box>
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
                formik.setFieldValue("image", event.currentTarget.files[0]);
                handleImageChange(event);
              }}
            />
            {formik.errors.image && formik.touched.image && (
              <p className="error">{formik.errors.image}</p>
            )}
          </label>
          <div className="fields-container">
                    <TextField
                        id="name"
                        name="name"
                        label=" Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        id="ratings"
                        name="ratings"
                        label="Ratings"
                        type="number"
                        defaultValue={formik.values.rating}
                        onChange={formik.handleChange}
                        error={formik.touched.rating && Boolean(formik.errors.rating)}
                        helperText={formik.touched.rating && formik.errors.rating}
                    />
                </div>
                <div className="fields-container">
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                    <TextField
                        id="contact"
                        name="contact"
                        label="Contact"
                        value={formik.values.contact}
                        onChange={formik.handleChange}
                        error={formik.touched.contact && Boolean(formik.errors.contact)}
                        helperText={formik.touched.contact && formik.errors.contact}
                    />
                </div>
                <div className="fields-container">
                    <TextField
                        id="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        id="companysize"
                        name="companysize"
                        label="Company Size"
                        defaultValue={formik.values.companysize}
                        onChange={formik.handleChange}
                        error={formik.touched.companysize && Boolean(formik.errors.companysize)}
                        helperText={formik.touched.companysize && formik.errors.companysize}
                    />
                </div>
                <div className="fields-container">
                    <TextField
                        id="industry"
                        name="industry"
                        label="Industry"
                        value={formik.values.industry}
                        onChange={formik.handleChange}
                        error={formik.touched.industry && Boolean(formik.errors.industry)}
                        helperText={formik.touched.industry && formik.errors.industry}
                    />
                </div>
          <button type="submit">Post</button>

       
      </form>
      </Box>

    // </Box>
  );
};

export default AddCompany;
