const Company=require('../modals/companySchema');
const Review =require('../modals/reviewSchema');


const companyControllers = {};

companyControllers.GetSingleCompany = async (req, res) => {
  try {
    const id = req.params.id;

    const reviews = await Review.find({company:id}).populate({
      path: "user",
      select: "name imageUrl",
    });

   

    res.status(200).json({reviews});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

companyControllers.AddCompany = async(req, res) => {
  try{
    console.log(req.body);
    const{name,contact,address,websiteUrl,rating,description,industry,companysize}=req.body;
    console.log(req.body.name);
    const newcompany=new Company({
      name:name,
      contact:contact,
      address:address,
      websiteUrl:websiteUrl,
      imageUrl:req.imageUrl,
      rating:rating,
      description:description,
      industry:industry,
      companysize:companysize,
    });
    await newcompany.save();
    console.log(newcompany);
    res.status(200).json({message:"company created successfully"});
    }catch(error){
      console.log(error);
      res.status(500).json({message:"internal server error"});
    }};
    companyControllers.GetAllCompanies=async(req,res)=>{
      try{
        const company=await Company.find({});
        console.log(company);
        res.status(200).json({company});
    
    
      }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
      }
    };
    
module.exports = companyControllers;
