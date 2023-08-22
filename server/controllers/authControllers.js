const authControllers = {};
const User = require("../modals/userSchema");

authControllers.SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

authControllers.SignIn = (req, res) => {
  res.send("hello");
};

module.exports = authControllers;
