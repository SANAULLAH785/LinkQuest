const { Router } = require("express");
const router = Router();
const profileControllers = require("../controllers/profileControllers");
const auth = require("../middlewares/auth");
const imagesaver = require("../middlewares/imageSaver");


router.get("/personalData", auth, profileControllers.GetPersonalData);

router.get("/personalDataShort", auth, profileControllers.GetPersonalDataShort);

router.put("/personalData",auth,imagesaver, profileControllers.EditPersonalData);

router.get("/personalData/workHistory",auth, profileControllers.GetWorkHistory);

router.post("/personalData/workHistory", auth,profileControllers.AddWorkHistory);

router.put("/personalData/workHistory", profileControllers.EditWorkHistory);

router.get("/personalData/posts", profileControllers.GetPersonalPosts);

router.get("/personalData/post/:id", profileControllers.GetSinglePersonalPost);

router.get("/personalData/reviews", profileControllers.GetPersonalReviews);

router.get(
  "/personalData/review/:id",
  profileControllers.GetSinglePersonalReview
);

router.get("/personalData/questions", profileControllers.GetPersonalQuestions);

router.get(
  "/personalData/question/:id",
  profileControllers.GetSinglePersonalQuestion
);

router.get("/personalData/skills", profileControllers.GetPersonalSkills);

router.post("/personalData/skills", profileControllers.AddPersonalSkills);

router.get("/personalData/friends", profileControllers.GetPersonalFriends);

module.exports = router;
