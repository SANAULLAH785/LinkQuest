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
import { setReviewModalOpen } from "../../Store/Slices/reviewSlice";
import { useDispatch, useSelector } from "react-redux";


const AddCompany = ({ onClose, clearSearch }) => {
  const dispatch=useDispatch();
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
    rating: 0,
    address: "",
    contact: "",
    description: "",
    industry: "",
    companysize: 0,
    websiteUrl: "",
    
  };

  const validationSchema = Yup.object({
    image: Yup.mixed()
      .required("An image is required")
      .test("fileType", "Only image files are allowed", (value) => {
        return value && value.type.startsWith("image/");
      }),
    rating: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5")
      .required("Rating is required"),
    name: Yup.string().required("A name is required"),
    address: Yup.string().required("Address is required"),
    contact: Yup.string()
      .matches(/^\d{11}$/, "Contact must be exactly 11 digits")
      .required("Contact is required"),
    description: Yup.string().required("Description is required"),
    industry: Yup.string().required("Industry is required"),
    companysize: Yup.number()
      .typeError("Company size must be a number")
      .required("Company size is required"),
    websiteUrl: Yup.string()
      // .url("Invalid URL")
      .required("Website URL is required"),
  });
  

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(" company Form values:", values);
      await ApiCallPost("/addcompany", values, "multipart/form-data")
        .then((res) => {
          console.log(res);
          onClose();
          clearSearch();

           dispatch(setReviewModalOpen(true));
          // toast.success("Post added Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  // const handelClose=()=>{
  //   onClose();
  // }
  return (
    <Box className="main">
       <Box
          className="close-icon"
          onClick={() => {
            onClose();
            clearSearch();
          }}
        >
          <MdClose size={25} />
        </Box>
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
            // value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputLabelProps={{ className: 'blue-label' }} 
          />
          <TextField
            id="rating"
            name="rating"
            label="rating"
            type="number"
            // defaultValue={formik.values.rating}
            onChange={formik.handleChange}
            error={formik.touched.rating && Boolean(formik.errors.rating)}
            helperText={formik.touched.rating && formik.errors.rating}
            InputLabelProps={{ className: 'blue-label' }} 
          />
        </div>
        <div className="fields-container">
          <TextField
            id="address"
            name="address"
            label="Address"
            // value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            InputLabelProps={{ className: 'blue-label' }}
          />
          <TextField
            id="contact"
            name="contact"
            label="Contact"
            // value={formik.values.contact}
            onChange={formik.handleChange}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
            InputLabelProps={{ className: 'blue-label' }} 
          />
        </div>
        <div className="fields-container">
          <TextField
            id="description"
            name="description"
            label="Description"
            // value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            InputLabelProps={{ className: 'blue-label' }} 
          />
          <TextField
            id="companysize"
            name="companysize"
            label="Company Size"
            // defaultValue={formik.values.companysize}
            onChange={formik.handleChange}
            error={
              formik.touched.companysize && Boolean(formik.errors.companysize)
            }
            helperText={formik.touched.companysize && formik.errors.companysize}
            InputLabelProps={{ className: 'blue-label' }} 
          />
        </div>
        <div className="fields-container">
          <TextField
            id="industry"
            name="industry"
            label="Industry"
            // value={formik.values.industry}
            onChange={formik.handleChange}
            error={formik.touched.industry && Boolean(formik.errors.industry)}
            helperText={formik.touched.industry && formik.errors.industry}
            InputLabelProps={{ className: 'blue-label' }} 
          />
          <TextField
            id="websiteUrl"
            name="websiteUrl"
            label="websiteUrl"
            // value={formik.values.websiteUrl}
            onChange={formik.handleChange}
            error={
              formik.touched.websiteUrl && Boolean(formik.errors.websiteUrl)
            }
            helperText={formik.touched.websiteUrl && formik.errors.websiteUrl}
            InputLabelProps={{ className: 'blue-label' }} 
          />
        </div>
        <div className="buttons">
          <button type="submit">Add Company</button>
        </div>
      </form>
    </Box>

    // </Box>
  );
};

export default AddCompany;
