const { Router } = require("express");
const router = Router();
const questionControllers = require("../controllers/questionControllers");
const auth = require("../middlewares/auth");
const imageSaver = require("../middlewares/imageSaver");

router.get("/questions", questionControllers.GetAllQuestions);

router.post("/question", auth, imageSaver, questionControllers.AddQuestion);

router.get("/question/:id", questionControllers.GetSingleQuestion);

router.post("/question/answer", questionControllers.AddAnswer);

router.put("/question", questionControllers.EditVotes);

router.put("/question/answer/:id", questionControllers.EditVerification);

module.exports = router;
