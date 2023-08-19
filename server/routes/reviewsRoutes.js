const { Router } = require("express");
const router = Router();
const reviewControllers = require("../controllers/reviewControllers");

router.get("/reviews", reviewControllers.getAllReviews);

router.post("/review", reviewControllers.AddReview);

router.post("/company/review", reviewControllers.AddCompanyAndItsReview);

router.put("/review", reviewControllers.EditVotes);

module.exports = router;
