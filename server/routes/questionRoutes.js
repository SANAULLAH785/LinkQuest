const { Router } = require("express");
const router = Router();
const questionControllers = require("../controllers/questionControllers");

router.get("/question", questionControllers.GetAllQuestions);

router.post("/question", questionControllers.AddQuestion);

router.get("/question/:id", questionControllers.GetSingleQuestion);

router.post("/question/answer", questionControllers.AddAnswer);

router.put("/question", questionControllers.EditVotes);

router.put("/question/answer/:id", questionControllers.EditVerification);

module.exports = router;
