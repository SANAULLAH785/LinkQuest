const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const Message = require("./modals/messageSchema");
const User = require("./modals/userSchema");
const ws = require("ws");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.jwtSecret;
// const url = "mongodb://127.0.0.1:27017/LinkQuest";
const url = process.env.url;
const port = 8000;

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const start = async () => {
  try {
    await connectDB(url);
    const server = app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );

    const wss = new ws.WebSocketServer({ server });
    const jwtSecret = jwtsecret;

    wss.on("connection", async (connection, req) => {
      // Decoding the Connected User Data from cookie token
      const cookies = req.headers.cookie;
      if (cookies) {
        const tokenCookieString = cookies
          .split(";")
          .find((str) => str.trim().startsWith("token="));
        if (tokenCookieString) {
          const token = tokenCookieString.split("=")[1];

          try {
            const userDetails = jwt.verify(token, jwtSecret);
            const { userId, username, imageUrl } = userDetails;
            connection.userId = userId;
            connection.userName = username;
            connection.imageUrl = imageUrl;
          } catch (error) {
            console.log(error);
          }
        }
      }

      const user = await User.findOne({ _id: connection.userId });
      const contacts = user.contacts || [];

      const notifyAboutOnlinePeople = () => {
        const onlineContacts = [...wss.clients].filter((client) => {
          return (
            client !== connection &&
            contacts.includes(client.userId) &&
            client.isAlive  
          );
        });

        const onlineContactData = onlineContacts.map((client) => ({
          userId: client.userId,
          userName: client.userName,
          imageUrl: client.imageUrl,
          online: true,
        }));

        connection.send(
          JSON.stringify({
            online: onlineContactData,
          })
        );
      };

      connection.isAlive = true;
      connection.timer = setInterval(() => {
        connection.ping();
        connection.deathTimer = setTimeout(() => {
          connection.isAlive = false;
          connection.terminate();
          notifyAboutOnlinePeople();
        }, 1000);
      }, 5000);

      connection.on("pong", () => {
        clearTimeout(connection.deathTimer);
      });

      connection.on("message", async (message) => {
        const parsedMessage = JSON.parse(message.toString());
        console.log(parsedMessage);
        const { chat, recipient } = parsedMessage;
        if (chat && recipient) {
          const messageDoc = await Message.create({
            sender: connection.userId,
            receiver: recipient,
            text: chat,
          });
          const clients = [...wss.clients].filter(
            (c) => c.userId === recipient
          );

          const recipientUser = await User.findOne({ _id: recipient });
          const senderUser = await User.findOne({ _id: connection.userId });

          if (recipientUser && senderUser) {
            if (!recipientUser.contacts.includes(connection.userId)) {
              recipientUser.contacts.push(connection.userId);
              await recipientUser.save();
            }
            if (!senderUser.contacts.includes(recipient)) {
              senderUser.contacts.push(recipient);
              await senderUser.save();
            }
          }

          clients.forEach((c) =>
            c.send(
              JSON.stringify({
                messageData: {
                  chat,
                  receiver: recipient,
                  messageId: messageDoc._id,
                  sender: connection.userId,
                },
              })
            )
          );
        }
      });

      // Sending the userData on establishing the contact
      notifyAboutOnlinePeople();
    });

    wss.on("close", (data) => {
      console.log("disconncted", data);
      onlineUsers.delete(connection.userId);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
