const User = require("../modals/userSchema");
const profileControllers = {};

profileControllers.GetPersonalData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

profileControllers.GetPersonalDataShort = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select(
      "name imageUrl email jobTitle"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

profileControllers.EditPersonalData = (req, res) => {
  res.send("Edit Personal Data");
};

profileControllers.GetWorkHistory = (req, res) => {
  res.send("Get Work History");
};

profileControllers.AddWorkHistory = (req, res) => {
  res.send("Add Work History");
};

profileControllers.EditWorkHistory = (req, res) => {
  res.send("Edit Work History");
};

profileControllers.GetPersonalPosts = (req, res) => {
  res.send("Get Personal Posts");
};

profileControllers.GetSinglePersonalPost = (req, res) => {
  res.send("Get Single Personal Post");
};

profileControllers.GetPersonalReviews = (req, res) => {
  res.send("Get Personal Reviews");
};

profileControllers.GetSinglePersonalReview = (req, res) => {
  res.send("Get Single Personal Review");
};

profileControllers.GetPersonalQuestions = (req, res) => {
  res.send("Get Personal Questions");
};

profileControllers.GetSinglePersonalQuestion = (req, res) => {
  res.send("Get Single Personal Question");
};

profileControllers.GetPersonalSkills = (req, res) => {
  res.send("Get Personal Skills");
};

profileControllers.AddPersonalSkills = (req, res) => {
  res.send("Post Personal Questions");
};

profileControllers.GetPersonalFriends = (req, res) => {
  res.send("Get Personal Friends");
};

module.exports = profileControllers;
