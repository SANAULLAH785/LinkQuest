const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authControllers");
const auth =require('../middlewares/auth');

router.post("/signin",authControllers.SignIn);

router.post("/signup", authControllers.SignUp);

module.exports = router;
