const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authControllers");

router.post("/signin", authControllers.SignIn);

router.post("/signup", authControllers.SignUp);

module.exports = router;
