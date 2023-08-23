const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();
// const url = "mongodb://127.0.0.1:27017/LinkQuest";
const url=process.env.url;
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
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
