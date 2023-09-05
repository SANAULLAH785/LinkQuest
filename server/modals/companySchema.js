const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required:true,
  },
  industry:{
    type: String,
    required:true
  },
  companysize:{
    type:Number,
    required:true,
  },
  review:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
],
  // rating: {
  //   type: Number,
  //   min: 1,
  //   max: 5,
  //   required: true,
  // },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
