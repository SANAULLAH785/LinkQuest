const Review =require('../modals/reviewSchema');
const Company=require('../modals/companySchema');
const reviewControllers = {};

reviewControllers.getAllReviews = async(req, res) => {
  try{
  const reviews=await Review.find({});
  res.status(200).json({reviews});
  }catch(error){
    res.status(500).json({message:"internal server error"});

  }

};

reviewControllers.AddReview = async(req, res) => {
  console.log(req.body);
  console.log(req.params);
  try{
  const {ratings,content,verified}=req.body;
  const userId=req.userId;
  console.log(userId);
  const companyId=req.params.id;
  console.log(companyId);
  const newreview= new Review({
    ratings:ratings,
    content:content,
    verified:verified,
    user:userId,
    company:companyId,
  });
  await newreview.save();
  
  res.status(200).json({message:"Post A Review"});
}catch(error){
  res.status(500).json({message:"internal server error"});
}
};

reviewControllers.AddCompanyAndItsReview =async (req, res) => {
  try{
  const{name,contact,address,websiteUrl,rating,ratings,content,verified}=req.body;
  const userId=req.userId;
  console.log(req.body);
  const newcompany=new Company({
    name:name,
    contact:contact,
    address:address,
    websiteUrl:websiteUrl,
    imageUrl:req.imageUrl,
    rating:rating,
  });
  console.log(newcompany);
  await newcompany.save();
  console.log(newcompany);
  console.log(newcompany.name);
  const newreview=new Review({
    ratings:ratings,
    content:content,
    verified:verified,
    user:userId,
    company:newcompany._id
  })
  await newreview.save();
  res.status(200).json({message:"reviewcreated successfully"});
  }catch(error){
    console.error(error);  // Log the actual error for debugging

    res.status(500).json({message:"internal server error"});
  }
};

reviewControllers.EditVotes = (req, res) => {
  res.send("Edit The Votes of Reviews");
};
module.exports = reviewControllers;
