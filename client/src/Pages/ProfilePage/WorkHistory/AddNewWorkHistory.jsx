import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ApiCallGet, ApiCallPosts } from "../../../components/Api/ApiCall";
import {
  addNewWorkHistory,
  setGetHistory,
  setHistroyPath
} from "../../../Store/Slices/workhistorySlice";
import { useDispatch, useSelector } from "react-redux";
import "./AddNewWorkHistory.scss";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Box,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddNewWorkHistory = () => {
  const [companydata, setCompanyData] = useState([]);
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const gethistory = useSelector((state) => state.workhistoryState.gethistory);
  const [showAddCompanyButton, setShowAddCompanyButton] = useState(false);
  const getcompanies = async () => {
    try {
      const response = await ApiCallGet("/getcompanies");
      console.log(response.data);
      setCompanyData(response.data.company);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcompanies();
  }, []);
  const initialValues = {
    company: "",
    jobTitle: "",
    dateOfJoining: "",
    isPresentEmployee: false,
    dateOfLeft: "",
  };
  const validationSchema = Yup.object().shape({
    // company: Yup.string().required("Company is required"),
    // jobTitle: Yup.string().required("Job title is required"),
    // dateOfJoining: Yup.date().required("Date of joining is required"),
    // isPresentEmployee: Yup.boolean(),
    // dateOfLeft: Yup.date().when("isPresentEmployee", {
    //   is: false,
    //   then: Yup.date().required("Date of leaving is required when not an employee"),
    // }),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await ApiCallPosts(
          "/personalData/workHistory",
          values
        );
        console.log(response.data);
        dispatch(addNewWorkHistory(response.data.user));
        dispatch(setGetHistory(gethistory + 1));
        dispatch(addNewWorkHistory(false));   
      } catch (error) {
        console.log(error);
      }
    },
  });
  const handeladdnewworkhistroy = () => {
    dispatch(addNewWorkHistory(false));
  };
  const handelclick=()=>{
    navigate('/addcompany');
    dispatch(setHistroyPath("/profile"));
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="form">
        <Box className="close-button">
          <MdClose size={25} onClick={handeladdnewworkhistroy}></MdClose>
        </Box>
        <Autocomplete
          id="company"
          name="company"
          options={companydata.map((company) => company.name)}
          freeSolo
          onChange={(event, newValue) => {
            formik.setFieldValue("company", newValue);
            if (!companydata.some((company) => company.name === newValue)) {
              setShowAddCompanyButton(true); 
            } else {
              setShowAddCompanyButton(false); 
            }
            console.log(showAddCompanyButton);
          }}
          value={formik.values.company}
          renderInput={(params) => (
            <div>
              <TextField
                {...params}
                label="Company"
                margin="normal"
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
                InputLabelProps={{ className: "blue-label" }}
              />
              {showAddCompanyButton && (
                <div className="no-results">
                  <p>No results found.</p>
                  <button className="add-company"  onClick={handelclick}>Add Company</button>
                </div>
              )}
            </div>
          )}
        />
        <TextField
          id="jobTitle"
          name="jobTitle"
          label=" JobTitle"
          margin="normal"
          fullWidth
          onChange={formik.handleChange}
          error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
          helperText={formik.touched.jobTitle && formik.errors.jobTitle}
          InputLabelProps={{ className: "blue-label" }}
        />
        <TextField
          name="dateOfJoining"
          label="Date of Joining"
          type="date"
          margin="normal"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dateOfJoining}
          error={
            formik.touched.dateOfJoining && Boolean(formik.errors.dateOfJoining)
          }
          helperText={
            formik.touched.dateOfJoining && formik.errors.dateOfJoining
          }
          InputLabelProps={{ className: "blue-label" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isPresentEmployee"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.isPresentEmployee}
            />
          }
          label="Is Present Employee"
          className="MuiFormControlLabel-root"
        />
        {formik.values.isPresentEmployee ? null : (
          <TextField
            name="dateOfLeft"
            label="Date of Leaving"
            type="date"
            margin="normal"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfLeft}
            error={
              formik.touched.dateOfLeft && Boolean(formik.errors.dateOfLeft)
            }
            helperText={formik.touched.dateOfLeft && formik.errors.dateOfLeft}
            InputLabelProps={{ className: "blue-label" }}
          />
        )}
        <Button type="submit" className="addbutton">
          Add Work History
        </Button>
      </form>
    </>
  );
};

export default AddNewWorkHistory;
