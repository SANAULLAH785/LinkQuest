import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./CompanySection.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewReviewHandler } from "../../Store/Slices/reviewSlice";
import ReviewCard from "./CompanyCard";
import { ApiCallGet } from "../Api/ApiCall";
import AddCompany from "./AddCompany";

const ComapnySection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companydata, setCompanyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [addcompany,setAddCompany]=useState(false);

  const userId = useSelector((state) => state.userState.id);
  const clearSearch = () => {
    setSearchQuery(""); 
  };
  const getCompanies = async () => {
    try {
      const response = await ApiCallGet("/companies");
      console.log(response);
      setCompanyData(response.data.company);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompanies();
  }, []);

  const handelAddReview = () => {
    if (userId) {
      dispatch(addNewReviewHandler(true));
    } else {
      navigate("/reviews");
    }
  };
  const filteredComapny = companydata.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} className="">
          <Box className="searchbar">
            <Box className="search">
              <BsSearch size={15}></BsSearch>
            </Box>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Grid>
        {/* <Grid item md={12}>
          <Box className="buttonsection">
            <button onClick={() => handelAddReview()}>Add a Review</button>
          </Box>
        </Grid> */}
        <Grid item md={12}>
        {addcompany ? (
            <AddCompany onClose={() => setAddCompany(false)} clearSearch={clearSearch}  /> 
          ):
          filteredComapny.length > 0 ? (
            filteredComapny.map((company, index) => (
              <ReviewCard
                key={index}
                // id={review._id}
                // content={review.content}
                // ratings={review.ratings}
                // votes={review.votes}
                // verified={review.verified}
                id={company._id}
                company={company.name}
                companyImage={company.imageUrl}
                contact={company.contact}
                address={company.address}
                rating={company.rating}
                description={company.description}
                companysize={company.companysize}
                industry={company.industry}
              />
            ))
          ) : (
            <div className="no-results">
              <p>No results found. Did you want to add new company? </p>
              <button className="add-company" onClick={() => setAddCompany(true)}>
                Add Company
              </button>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ComapnySection;
