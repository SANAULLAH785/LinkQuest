import React, { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PostSection from "./components/Posts/PostSection";
import AddNewPost from "./components/Posts/AddNewPost";
import useWindowSize from "./utils/useWindowSize";
import CompanySection from "./components/Reviews/CompanySection";
import QuestionSection from "./components/Questions/QuestionSection";
import BadgeSection from "./components/Badges/BadgeSection";
import QuestionModal from "./components/Questions/QuestionModal";
import { useSelector, useDispatch } from "react-redux";
import { addNewPostHandler } from "./Store/Slices/postSlice";
import ReviewModal from "./components/Reviews/ReviewModal";

const MainWrapper = () => {
  const dispatch = useDispatch();
  const postStateBar = useSelector((state) => state.postState.addNewPost);
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const [sideBarWidth, setSideBarWidth] = useState(2);
  const [middleBarWidth, setMiddleBarWidth] = useState(7);
  const [rightBarWidth, setRightBarWidth] = useState(3);
  const [screenWidth, setScreenWidth] = useState(useWindowSize().width);

  const selectedOption = useSelector(
    (state) => state.functionalityState.sideBarOptions
  );

  const questionModal = useSelector(
    (state) => state.questionState.questionModalOpen
  );
  const reviewModal = useSelector((state) => state.reviewState.reviewModalOpen);
  useEffect(() => {
    if (postStateBar) {
      setRightBarWidth(4);
      setMiddleBarWidth(6);
      setSideBarWidth(2);
    } else {
      setRightBarWidth(3);
      setMiddleBarWidth(7);
      setSideBarWidth(2);
    }
  }, [postStateBar]);

  const sideBarHandler = () => {
    dispatch(addNewPostHandler(false));
    setIsOpenSideBar(!isOpenSideBar);

    if (isOpenSideBar) {
      setSideBarWidth(1);
      setMiddleBarWidth(8);
    } else {
      setSideBarWidth(2);
      setMiddleBarWidth(7);
    }
  };

  return (
    <>
      <Box className="homepage">
        <Header />
        {screenWidth < 900 ? (
          <Sidebar
            isOpenSideBar={isOpenSideBar}
            sideBarHandler={sideBarHandler}
          />
        ) : (
          ""
        )}

        <Box className="app-section">
          <Grid container spacing={2}>
            {screenWidth < 900 ? (
              ""
            ) : (
              <Grid item sm={sideBarWidth} className="sidebar">
                <Sidebar
                  isOpenSideBar={isOpenSideBar}
                  sideBarHandler={sideBarHandler}
                />
              </Grid>
            )}
            <>
              <Grid item xs={12} md={middleBarWidth} className="sidebar">
                {selectedOption === "posts" && <PostSection />}
                {selectedOption === "reviews" && (
                  <>{reviewModal ? <ReviewModal /> : <CompanySection />}</>
                )}
                {/* {selectedOption === "reviews" && <ReviewSection />} */}
                {selectedOption === "questions" && (
                  <>{questionModal ? <QuestionModal /> : <QuestionSection />}</>
                )}
                {selectedOption === "badges" && <BadgeSection />}
              </Grid>
            </>
            {screenWidth < 900 ? (
              ""
            ) : (
              <>
                {selectedOption === "posts" && (
                  <Grid item sm={rightBarWidth} className="sidebar">
                    {postStateBar ? (
                      <AddNewPost />
                    ) : (
                      <Sidebar
                        isOpenSideBar={isOpenSideBar}
                        sideBarHandler={sideBarHandler}
                      />
                    )}
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MainWrapper;
