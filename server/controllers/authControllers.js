const authControllers = {};
const User = require("../modals/userSchema");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
require("dotenv").config();
const jstsecret = process.env.jwtSecret;
const generatePassword = require("generate-password");

const passwordOptions = {
  length: 12,
  numbers: true,
  symbols: true,
  uppercase: true,
  excludeSimilarCharacters: true,
};

authControllers.SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

authControllers.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existinguser = await User.findOne({ email, socialLogin: false });
    if (!existinguser) {
      return res
        .status(400)
        .json({ message: "user with this email does not exist" });
    }
    const ispassword = await bcrypt.compare(password, existinguser.password);
    if (!ispassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const tokenPayload = {
      userId: existinguser.id,
      username: existinguser.name,
      email: existinguser.email,
      imageUrl: existinguser.imageUrl,
      jobTitle: existinguser.jobTitle,
    };

    const responsePayload = {
      username: existinguser.name,
      email: existinguser.email,
      imageUrl: existinguser.imageUrl,
      jobTitle: existinguser.jobTitle,
    };
    const token = jwt.sign(tokenPayload, jstsecret);
    res.status(200).send({ token, user: responsePayload });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

authControllers.GoogleAuthHandler = async (req, res) => {
  try {
    const credential = req.body.credential;

    let existinguser = null;
    if (credential) {
      const decoded = jwt_decode(credential);
      const randomPassword = generatePassword.generate(passwordOptions);

      const user = await User.findOne({ email: decoded.email });
      if (user) {
        existinguser = user;
      } else {
        const newUser = new User({
          name: decoded.name,
          email: decoded.email,
          password: randomPassword,
          imageUrl: decoded.picture,
          socialLogin: true,
        });
        const savedUser = await newUser.save();
        existinguser = savedUser;
      }
    }

    const tokenPayload = {
      userId: existinguser.id,
      username: existinguser.name,
      email: existinguser.email,
      imageUrl: existinguser.imageUrl,
      jobTitle: existinguser.jobTitle,
    };

    const responsePayload = {
      username: existinguser.name,
      email: existinguser.email,
      imageUrl: existinguser.imageUrl,
      jobTitle: existinguser.jobTitle,
    };
    const token = jwt.sign(tokenPayload, jstsecret);
    res.status(200).send({ token, user: responsePayload });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

authControllers.GoogleCallback = (req, res) => {
  res.send("you reached");
};

module.exports = authControllers;
