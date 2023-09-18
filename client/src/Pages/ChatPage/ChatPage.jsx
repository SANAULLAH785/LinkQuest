import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import ChatForm from "./ChatForm";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import "./ChatPage.scss";
const ChatPage = () => {
  const logedInUser = useSelector((state) => state.userState.id);
  const [ws, setWs] = useState(null);

  const [onlinePeople, setOnlinePeople] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  const [search, setSearch] = useState("");
  const [searchedContacts, setSearchedContacts] = useState([]);
  // console.log(searchedContacts);
  const divUnderMessages = useRef();

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  useEffect(() => {
    let timer;

    const getSearchResults = async () => {
      if (search) {
        try {
          // console.log(search);
          const response = await axios.post(
            "http://localhost:8000/searchContacts",
            { search }
          );
          setSearchedContacts(response.data.users);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSearchedContacts([]);
      }
    };

    const handleSearchChange = (newSearch) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        getSearchResults();
      }, 1000);
    };
    handleSearchChange(search);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    document.cookie = "token=" + token;

    const ws = new WebSocket(`ws://localhost:8000`);
    setWs(ws);

    ws.addEventListener("message", handleMessage);

    return () => {
      ws.close();
    };
  }, [messages]);

  const showOnlinePeople = (people) => {
    setOnlinePeople(people.online);
  };

  const handleMessage = (e) => {
    const messageData = JSON.parse(e.data);
    console.log(messageData);
    if ("online" in messageData) {
      showOnlinePeople(messageData);
    } else {
      if (
        (messageData.messageData.sender === logedInUser &&
          messageData.messageData.receiver === selectedContact) ||
        (messageData.messageData.sender === selectedContact &&
          messageData.messageData.receiver === logedInUser)
      ) {
        // console.log(
        //   "inmessage",
        //   messageData.messageData.sender,
        //   selectedContact
        // );
        setMessages((prev) => [
          ...prev,
          {
            text: messageData.messageData.chat,
            sender: messageData.messageData.sender,
            receiver: messageData.messageData.receiver,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    const scrolledDiv = divUnderMessages.current;
    scrolledDiv?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedContact) {
      const getMessagesFromDb = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:8000/messages/${selectedContact}`,
            {
              headers: {
                token: token,
              },
            }
          );
          setMessages(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };
      getMessagesFromDb();
    }
  }, [selectedContact]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/getChatContacts`,
          {
            headers: {
              token: token,
            },
          }
        );

        // console.log("respose", response.data.contacts);
        // console.log("online", onlinePeople);

        const onlineUserIds = new Set(onlinePeople.map((obj) => obj.userId));

        const filteredContacts = response.data.contacts.filter(
          (obj) => !onlineUserIds.has(obj._id)
        );

        setContacts(filteredContacts);
      } catch (error) {
        console.log(error.message);
      }
    };
    getContacts();
  }, [onlinePeople]);

  const selectContactHandler = (data) => {
    const selectedId = data.userId !== undefined ? data.userId : data._id;
    const selectName = data.userName !== undefined ? data.userName : data.name;
    // console.log("selectedName", selectName);
    setSelectedContact(selectedId);
    // console.log(data);
    setSelectedName(selectName);
    setSearchedContacts([]);
    setSearch("");
  };

  const excludeLogedUser = onlinePeople.filter((p) => p.userId !== logedInUser);

  return (
    <Box className="chat-container">
      <Header />

      <Grid container spacing={2} className="chat-main-container">
        <Grid xs={3} item>
          <Box className="sidebar-container">
            <Box className="sidebar">
              Contact
              <Box className="contactSearchbar">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                {searchedContacts.length > 0 && (
                  <Box className="searched-contacts-container">
                    {searchedContacts
                      .filter((people) => people._id !== logedInUser)
                      .map((people, index) => {
                        return (
                          <Box
                            className={`chat-people ${
                              people.userId === selectedContact
                                ? "color-blue"
                                : ""
                            }`}
                            key={index}
                            onClick={() => selectContactHandler(people)}
                          >
                            <Box className="avatar">
                              {people.online && (
                                <Box className="online-dot"></Box>
                              )}

                              <img src={people.imageUrl} alt="" />
                            </Box>
                            <p>{people.name}</p>
                          </Box>
                        );
                      })}
                  </Box>
                )}
              </Box>
              <Box className="chat-people-box">
                <>
                  {excludeLogedUser.map((people, index) => {
                    return (
                      <Box
                        className={`chat-people ${
                          people.userId === selectedContact ? "color-blue" : ""
                        }`}
                        key={index}
                        onClick={() => selectContactHandler(people)}
                      >
                        <Box className="avatar">
                          {people.online && <Box className="online-dot"></Box>}

                          <img src={people.imageUrl} alt="" />
                        </Box>
                        <p>{people.userName}</p>
                      </Box>
                    );
                  })}
                </>
                <>
                  {contacts.map((people, index) => {
                    return (
                      <Box
                        className={`chat-people ${
                          people.userId === selectedContact ? "color-blue" : ""
                        }`}
                        key={index}
                        onClick={() => selectContactHandler(people)}
                      >
                        <Box className="avatar">
                          <img src={people.imageUrl} alt="" />
                        </Box>
                        <p>{people.name}</p>
                      </Box>
                    );
                  })}
                </>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={9} item className="chatbar">
          <Box className="chatbox">
            <p>{selectedName}</p>
            {selectedContact && (
              <>
                <Box className="message-section">
                  {messages.map((message, index) => {
                    const alignment =
                      message.sender === logedInUser ? "end" : "start";
                    const messageDate = message.date
                      ? new Date(message.date)
                      : new Date();

                    const formattedTime = messageDate.toLocaleString(
                      "en-US",
                      timeOptions
                    );

                    return (
                      <Box
                        className="comment"
                        justifyContent={alignment}
                        key={index}
                      >
                        {/* <img src={message.user?.imageUrl} alt="" /> */}
                        <Box className="content">
                          <Box>
                            <p className="text">{message.text}</p>
                          </Box>
                          <Box className="footer" justifyContent={alignment}>
                            <p className="date-ago">{formattedTime}</p>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                  <Box ref={divUnderMessages}></Box>
                </Box>
                <ChatForm
                  ws={ws}
                  selectedContact={selectedContact}
                  setMessages={setMessages}
                  sender={logedInUser}
                  receiver={selectedContact}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
