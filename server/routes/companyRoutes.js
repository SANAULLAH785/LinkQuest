const { Router } = require("express");
const router = Router();
const companyControllers = require("../controllers/companyControllers");
const imagesaver = require("../middlewares/imageSaver");


router.get("/companyreviews/:id", companyControllers.GetSingleCompany);
router.get("/getcompanies/", companyControllers.GetAllCompanies);


router.post("/addcompany", imagesaver,companyControllers.AddCompany);

module.exports = router;
