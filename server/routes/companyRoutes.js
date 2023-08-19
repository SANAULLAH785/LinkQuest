const { Router } = require("express");
const router = Router();
const companyControllers = require("../controllers/companyControllers");

router.get("/company/:id", companyControllers.GetSingleCompany);

router.post("/company/review", companyControllers.AddCompanyAndItsReview);

module.exports = router;
