import React from "react";
import { ApiCallPost } from "../../components/Api/ApiCall";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signup.scss";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { lastName, firstName, email, password } = values;
      const name = firstName + " " + lastName;
      const payload = { name, email, password };

      try {
        // const response = await axios.post(
        //   "http://localhost:8000/signup",
        //   payload
        // );
        const response = await ApiCallPost("/signup", payload);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Box className="wrapper">
      <Box className="container">
        <Box className="inner-cointainer">
          <Box className="header">
            <h6 onClick={() => navigate("/")}>LinkQuest</h6>
            <p onClick={() => navigate("/")}>Home</p>
            <p onClick={() => navigate("/signin")}>Login</p>
          </Box>
          <Box className="body">
            <h5>Create an Account</h5>
            <p className="login">
              Already have an account?{" "}
              <p className="login-text" onClick={() => navigate("/signin")}>
                {" "}
                Login
              </p>
            </p>
            <Box className="form">
              <form onSubmit={formik.handleSubmit}>
                <Box className="names">
                  <Box className="each-name">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.firstName && formik.touched.firstName && (
                      <p className="error">{formik.errors.firstName}</p>
                    )}
                  </Box>
                  <Box className="each-name">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lastName && formik.touched.lastName && (
                      <p className="error">{formik.errors.lastName}</p>
                    )}
                  </Box>
                </Box>
                <Box className="body">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={formik.handleChange}
                  />

                  {formik.errors.email && formik.touched.email && (
                    <p className="error">{formik.errors.email}</p>
                  )}
                </Box>
                <Box className="body">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="error">{formik.errors.password}</p>
                  )}
                </Box>
                <Box className="body">
                  <button type="submit">Join</button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
        <Box className="text-section">
          <p className="signup-content">
            Ready to unlock a realm of opportunities? Join our dynamic community
            today! Build your profile, forge valuable connections, and explore a
            fusion of networking, Developers wisdom, and get Reviews'
            authenticity.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
