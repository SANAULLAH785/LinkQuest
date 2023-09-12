const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authControllers");
const auth = require("../middlewares/auth");
const passport = require("passport");

router.post("/signin", authControllers.SignIn);
router.post("/signup", authControllers.SignUp);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/api/google/callback",
  passport.authenticate("google"),
  authControllers.GoogleCallback
);

module.exports = router;
