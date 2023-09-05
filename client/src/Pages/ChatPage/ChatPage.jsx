import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Header from "../../components/Header/Header";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import "./ChatPage.scss";
const ChatPage = () => {
  const logedInUser = useSelector((state) => state.userState.id);
  const [ws, setWs] = useState(null);

  const [onlinePeople, setOnlinePeople] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    document.cookie = "token=" + token;

    const ws = new WebSocket(`ws://localhost:8000`);
    setWs(ws);

    ws.addEventListener("message", handleMessage);

    return () => {
      ws.close();
    };
  }, []);

  const showOnlinePeople = (people) => {
    console.log(people);
    setOnlinePeople(people.online);
  };

  const handleMessage = (e) => {
    const messageData = JSON.parse(e.data);
    showOnlinePeople(messageData);
  };

  const selectContactHandler = (data) => {
    setSelectedContact(data);
    console.log(data);
  };

  const excludeLogedUser = onlinePeople.filter((p) => p.userId !== logedInUser);

  return (
    <Box className="container">
      <Header />

      <Grid container spacing={2} className="chat-container">
        <Grid xs={3} item>
          <Box className="sidebar">
            Contact
            <Box className="people-box">
              {excludeLogedUser.map((people, index) => {
                return (
                  <Box
                    className={`people ${
                      people.userId === selectedContact ? "color-blue" : ""
                    }`}
                    key={index}
                    onClick={() => selectContactHandler(people.userId)}
                  >
                    <img src={people.imageUrl} alt="" />
                    <p>{people.userName}</p>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid>
        <Grid xs={9} item className="chatbar">
          <Box className="chatbox">Grid</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
