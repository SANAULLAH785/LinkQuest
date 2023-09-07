const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const expressWs = require("express-ws");
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

// app.ws("/websocket", (ws, req) => {
//   console.log("WebSocket connection established");

//   ws.on("message", (message) => {
//     console.log("Received message:", message);
//   });

//   ws.on("close", () => {
//     console.log("WebSocket connection closed");
//   });
// });

const start = async () => {
  try {
    await connectDB(url);
    const server = app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );

    const wss = new ws.WebSocketServer({ server });
    const jwtSecret = jwtsecret;

    wss.on("connection", (connection, req) => {
      console.log("connected");
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
      // console.log([...wss.clients].map((c) => c.userName));
      [...wss.clients].forEach((client) => {
        client.send(
          JSON.stringify({
            online: [...wss.clients].map((c) => ({
              userId: c.userId,
              userName: c.userName,
              imageUrl: c.imageUrl,
            })),
          })
        );
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();
