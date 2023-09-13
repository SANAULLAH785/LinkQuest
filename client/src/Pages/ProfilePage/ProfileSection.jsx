import React, { useEffect, useState } from "react";
import useWindowSize from "../../utils/useWindowSize";
import { Grid, Box, backdropClasses } from "@mui/material";
import ProfilePage from "./Profile/ProfilePage";
import ProfileSideBar from "./ProfileSideBar";
import "./ProfileSection.scss";
import { useSelector, useDispatch } from "react-redux";
import WorkHistory from "../ProfilePage/WorkHistory/WorkHistory";
import Posts from "./Posts/Posts";
import { addNewWorkHistory } from "../../Store/Slices/workhistorySlice";
import AddNewWorkHistory from "./WorkHistory/AddNewWorkHistory";
import Header from "../../components/Header/Header";
import HistoryModal from "./WorkHistory/HistoryModal";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const [isOpenProfileSideBar, setIsOpenProfileSideBar] = useState(true);
  const [profileSideBarWidth, setProfileSideBarWidth] = useState(2);
  const [middleBarWidth, setMiddleBarWidth] = useState(7);
  const [rightBarWidth,setRightBarWidth]=useState(3);
  const [screenWidth, setScreenWidth] = useState(useWindowSize().width);

  const  workhistoryStatebar=useSelector((state)=>state.workhistoryState.addnewworkhistory);
  const selectedOption = useSelector(
    (state) => state.functionalityState.profileBarOptions
  );
  const historymodal=useSelector((state)=>state.workhistoryState.historymodal);

  
 
  useEffect(()=>{
    if(workhistoryStatebar){
      setMiddleBarWidth(6);
      setRightBarWidth(4);
      setProfileSideBarWidth(2);
    }
    else{
      setMiddleBarWidth(7);
      setRightBarWidth(3);
      setProfileSideBarWidth(2); 
    }
  },[workhistoryStatebar])

  const profilesideBarHandler = () => {
    dispatch(addNewWorkHistory(false));
    setIsOpenProfileSideBar(!isOpenProfileSideBar);
    

    if (isOpenProfileSideBar) {
      setProfileSideBarWidth(1);
      setMiddleBarWidth(8);
    } else {
      setProfileSideBarWidth(2);
      setMiddleBarWidth(7);
    }
  };

  return (
    <>
      <Box className="homepages">
        <Header/>

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
              {selectedOption==="workhistory" &&(<>{historymodal? <HistoryModal/>:<WorkHistory/>}</>)}
              {selectedOption==="posts" && <Posts></Posts>}
            
            </Grid>
            {screenWidth<900 ?(""):(
              <>
              {selectedOption==="workhistory" && !historymodal &&(
                <Grid item md={rightBarWidth} className="sidebar">
                  { workhistoryStatebar ?(
                    <AddNewWorkHistory/>
                  ):(
                    <ProfileSideBar
                    
                    isOpenProfileSideBar={isOpenProfileSideBar}
                    profilesideBarHandler={profilesideBarHandler}
                    />
                  )

                  }


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

export default ProfileSection;
