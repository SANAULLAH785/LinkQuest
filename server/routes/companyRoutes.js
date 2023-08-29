const { Router } = require("express");
const router = Router();
const companyControllers = require("../controllers/companyControllers");
const imagesaver = require("../middlewares/imageSaver");


router.get("/company/:id", companyControllers.GetSingleCompany);

router.post("/addcompany", imagesaver,companyControllers.AddCompany);

module.exports = router;
