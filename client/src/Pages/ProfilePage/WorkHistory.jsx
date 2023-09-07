import React, {useState}from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField } from "@mui/material";
import { MdClose } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addUserData } from "../../Store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import { ApiCallPosts, ApiCallPutwithData } from "../../components/Api/ApiCall";
const WorkHistory = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const dispatch = useDispatch();
    const navigate=useNavigate();
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
      jobTitle: "",
      skills:"",
     
      
    };
  
    const validationSchema = Yup.object({
      image: Yup.mixed()
        .required("An image is required")
        .test("fileType", "Only image files are allowed", (value) => {
          return value && value.type.startsWith("image/");
        }),
    
      jobTitle: Yup.string().required("A jobTitle is required"),
      skills: Yup.string().required("A skills is required"),

     
    });
    
  
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        console.log(" profile Form values:", values);
        const formData = new FormData();
        formData.append('jobTitle', values.jobTitle);
        formData.append('skills', values.skills);
        formData.append('image', values.image);
        console.log('formdata',formData);

        try {
          
          const response =  await ApiCallPutwithData("/personalData", formData, "multipart/form-data")
          console.log(response.data);
          const userdata=response.data.user;
          dispatch(addUserData(userdata));
          navigate("/");
        } catch (error) {
          console.log(error)
        }

    
      },
    });
  return (
    <Box className="wrapper">
        <Box className="container">
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
           id="jobTitle"
           name="jobTitle"
           label=" jobTitle"
           // value={formik.values.jobTitle}
           onChange={formik.handleChange}
           error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
           helperText={formik.touched.jobTitle && formik.errors.jobTitle}
           InputLabelProps={{ className: 'blue-label' }} 
         />
         <TextField
           id="skills"
           name="skills"
           label="Add Your skills"
           // defaultValue={formik.values.skills}
           onChange={formik.handleChange}
           error={
             formik.touched.skills && Boolean(formik.errors.skills)
           }
           helperText={formik.touched.skills && formik.errors.skills}
           InputLabelProps={{ className: 'blue-label' }} 
         />
       </div>
      
       <div className="buttons">
         <button type="submit">Complete Profile</button>
       </div>
     </form>
     </Box>
     </Box>
  );
};

export default WorkHistory;
