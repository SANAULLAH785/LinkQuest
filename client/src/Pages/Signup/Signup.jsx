import React from "react";
import {
  ApiCallPosts,
  ApiCallPost,
  ApiCallGet,
} from "../../components/Api/ApiCall";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { addUserData } from "../../Store/Slices/userSlice";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signup.scss";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId = process.env.REACT_APP_CLIENT_ID;

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
        const response = await ApiCallPost("/signup", payload);
        console.log(response.data);
        navigate("/signin");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const googleAuthHandler = async (credentials) => {
    try {
      const response = await ApiCallPosts("/google", credentials);
      console.log("helllloooooo", response);
      const token = response.data.token;
      const userData = response.data.user;
      localStorage.setItem("token", token);
      dispatch(addUserData(userData));
      navigate("/");
      window.location.reload();
      toast.success("SignIn Successfully");
    } catch (error) {}
  };
  return (
    <Box className="auth-wrapper">
      <Box className="auth-container">
        <Box className="auth-inner-cointainer">
          <Box className="auth-header">
            <h6 onClick={() => navigate("/")}>LinkQuest</h6>
            <p onClick={() => navigate("/")}>Home</p>
            <p onClick={() => navigate("/signin")}>Login</p>
          </Box>
          <Box className="auth-body">
            <h5>Create an Account</h5>
            <p className="login">
              Already have an account?{" "}
              <p className="login-text" onClick={() => navigate("/signin")}>
                {" "}
                Login
              </p>
            </p>
            <Box className="auth-form">
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                  onSuccess={(credentials) => googleAuthHandler(credentials)}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
              <br />
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
