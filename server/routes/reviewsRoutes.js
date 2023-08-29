const { Router } = require("express");
const router = Router();
const reviewControllers = require("../controllers/reviewControllers");
const imagesaver = require("../middlewares/imageSaver");
const auth =require('../middlewares/auth');


router.get("/reviews", reviewControllers.getAllReviews);

router.post("/review/:id",auth, reviewControllers.AddReview);

router.post("/company/review",auth,imagesaver, reviewControllers.AddCompanyAndItsReview);

router.put("/review", reviewControllers.EditVotes);

module.exports = router;
