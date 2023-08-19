const companyControllers = {};

companyControllers.GetSingleCompany = (req, res) => {
  res.send("Get Single Company by ID");
};

companyControllers.AddCompanyAndItsReview = (req, res) => {
  res.send("First Add the Company then its Review");
};
module.exports = companyControllers;
