const { Router } = require("express");
const router = Router();
const questionControllers = require("../controllers/questionControllers");
const auth = require("../middlewares/auth");
const imageSaver = require("../middlewares/imageSaver");

router.get("/questions", questionControllers.GetAllQuestions);

router.post("/question", auth, imageSaver, questionControllers.AddQuestion);

router.get("/question/:id", questionControllers.GetSingleQuestion);

router.post("/question/answer/:id", auth, questionControllers.AddAnswer);

router.get("/answers/:id", questionControllers.GetAnswers);

router.put("/setQuestionVotes/:id", auth, questionControllers.EditVotes);

router.put("/answer/:id", auth, questionControllers.EditVerification);

module.exports = router;
