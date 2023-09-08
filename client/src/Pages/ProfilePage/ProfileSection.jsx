import React, { useEffect, useState } from "react";
import useWindowSize from "../../utils/useWindowSize";
import { Grid, Box, backdropClasses } from "@mui/material";
import ProfilePage from "./ProfilePage";
import ProfileSideBar from "./ProfileSideBar";
import "./ProfileSection.scss";
import { useSelector, useDispatch } from "react-redux";
import WorkHistory from "./WorkHistory";
import Posts from "./Posts";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const [isOpenProfileSideBar, setIsOpenProfileSideBar] = useState(true);
  const [profileSideBarWidth, setProfileSideBarWidth] = useState(2);
  const [middleBarWidth, setMiddleBarWidth] = useState(10);
  const [screenWidth, setScreenWidth] = useState(useWindowSize().width);


  const selectedOption = useSelector(
    (state) => state.functionalityState.profileBarOptions
  );

  
 

  const profilesideBarHandler = () => {
    setIsOpenProfileSideBar(!isOpenProfileSideBar);

    if (isOpenProfileSideBar) {
      setProfileSideBarWidth(2);
      setMiddleBarWidth(10);
    } else {
      setProfileSideBarWidth(2);
      setMiddleBarWidth(10);
    }
  };

  return (
    <>
      <Box className="homepages">
        

        <Box className="app-sections">
          <Grid container spacing={2}>
            {screenWidth < 900 ? (
              ""
            ) : (
              <Grid item md={profileSideBarWidth} className="sidebars">
                <ProfileSideBar
                  isOpenProfileSideBar={isOpenProfileSideBar}
                  profilesideBarHandler={profilesideBarHandler}
                />
              </Grid>
            )}
            <Grid item xs={12} md={middleBarWidth} className="sidebars">
              {selectedOption === "profile" && <ProfilePage />}
              {selectedOption==="workhistory" &&<WorkHistory/>}
              {selectedOption==="posts" && <Posts></Posts>}
            
            </Grid>
            
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ProfileSection;
