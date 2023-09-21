const User = require("../modals/userSchema");
const Company = require("../modals/companySchema");
const Post = require("../modals/postSchema");
const mongoose = require("mongoose");

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
      "name imageUrl email jobTitle skills"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

profileControllers.EditPersonalData = async (req, res) => {
  try {
    // console.log(req.body);
    const userId = req.userId;
    // console.log(userId);
    const { jobTitle, skills } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { jobTitle, skills, imageUrl: req.imageUrl }, // Update the fields you need
      { new: true }
    );

    res.status(200).json({ user: updatedUser });
    // console.log(updatedUser);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

profileControllers.GetWorkHistory = async(req, res) => {
  try{
  const userId=req.userId;
  if(!userId){
    return res.status(404).json({ message: "User not found" });

  }
  const user = await User.findById(userId).populate("workHistory.company").select("workHistory");

  // console.log(user);
  
  const workHistoryWithCompanyNames = user.workHistory.map((entry) => ({
    companyName: entry.company.name, 
    jobTitle: entry.jobTitle,
    dateOfJoining: entry.dateOfJoining,
    isPresentEmployee: entry.isPresentEmployee,
    dateOfLeft: entry.dateOfLeft,
  }));

  res.status(200).json({ workhistory: workHistoryWithCompanyNames });
  }catch(error){
    res.status(500).send({ message: "Internal server error" });

  }

};

profileControllers.AddWorkHistory = async (req, res) => {
  try {
    const { company, jobTitle, dateOfJoining, isPresentEmployee, dateOfLeft } =
      req.body;
    const userId = req.userId;
    const foundCompany = await Company.findOne({ name: company });

    if (!foundCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    const newWorkHistory = {
      company: foundCompany._id,
      jobTitle,
      dateOfJoining: new Date(dateOfJoining),
      isPresentEmployee,
      dateOfLeft: isPresentEmployee ? null : new Date(dateOfLeft),
    };
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { workHistory: newWorkHistory },
      },
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.save();

    res.status(201).json({ message: "Work history added successfully", user });
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

profileControllers.EditWorkHistory = (req, res) => {
  res.send("Edit Work History");
};

profileControllers.GetPersonalPosts = async(req, res) => {
  try{
    const userId=req.userId;

    if(!userId){
      return res.status(404).json({ message: "User not found" });

    }
  const user = await User.findById(userId).populate({
    path: "posts",
    model: "Post",
  }
  );
// const imageUrls = user.posts.map(post => post.imageUrl);

console.log(user)
res.status(200).json(user);


  }catch(error){
    res.status(500).json({message:"Internal Server Error"})
  }
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
