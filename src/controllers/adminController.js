const mongoose = require('mongoose')
const adminModel = require("../models/adminModel");
const clientModel = require("../models/clients/clientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const clientPasswordChangeModel = require('../models/clients/clientPasswordChangeModel');

//const validation = require("../validations/validation");
const registerAdmin = async ( req, res) =>{
  try{
    let adminData = req.body;
    console.log("anmol")
    console.log(adminData)
    let {fname, lname, profileImage, email, password} = adminData;
    if (!fname)
      return res.status(400).send({ status: false, message: "first name is mandatory" });

    if (!lname)
      return res.status(400).send({ status: false, message: "last name is mandatory" });


//________________________________________________________
    if (!email)
      return res.status(400).send({ status: false, message: "email is mandatory" });
    if(typeof(email) != "string"){
      return res.status(400).send({status: false, message:" please send proper email"})
    }
    email = adminData.email = email.trim().toLowerCase();
    if(email == "")
      return res.status(400).send({status: false, message:" please send proper email"})
//_____________________________________________________
    
     if (!password)
      return res.status(400).send({ status: false, message: "password is mandatory" });

    if (typeof (password) != "string")
      return res.status(400).send({ status: false, message: "please provide password in string " });

    password = adminData.password = password.trim();
    if (password == "")
      return res.status(400).send({ status: false, message: "Please provide password value" });


    //regex password
    // if (!validation.validatePassword(password))
      // return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting password
    let hashing = bcrypt.hashSync(password, 10);
    adminData.password = hashing;
//_____________________________________________________

     let isAdminExist = await adminModel.findOne({ email: email });

    if (isAdminExist) {
      if (isAdminExist.email == email)
        return res.status(400).send({ status: false, message: "email id already exist, send another email" });
  }
    //   adminData.profileImage = req.image;
    let adminCreated = await adminModel.create(adminData);
    return res.status(200).send({status: true ,message:"user got created ", data : adminCreated})
}
  catch(error){
    return res.status(500).send({status: false, message: error.message});
  }
}

const loginAdmin = async(req,res)=>{
  try{
    let loginData = req.body;
    let{email, password} = loginData;
    //________________________________________________________
    if (!email)
      return res.status(400).send({ status: false, message: "email is mandatory" });
    if(typeof(email) != "string"){
      return res.status(400).send({status: false, message:" please send proper email"})
    }
    email = loginData.email = email.trim().toLowerCase();
    if(email == "")
      return res.status(400).send({status: false, message:" please send proper email"})
//_____________________________________________________
    
     if (!password)
      return res.status(400).send({ status: false, message: "password is mandatory" });

    if (typeof password != "string")
      return res.status(400).send({ status: false, message: "please provide password in string " });

    password = loginData.password = password.trim();
    if (password == "")
      return res.status(400).send({ status: false, message: "Please provide password value" });


    //regex password
    // if (!validation.validatePassword(password))
      // return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting password
    // let hashing = bcrypt.hashSync(password, 10);
    // userData.password = hashing;
//_____________________________________________________\
    let isAdminExists = await adminModel.findOne({email:email});
    if(!isAdminExists)
      return res.status(404).send({status:false, message:"Email doesn't exists "})

    let passwordCompare = await bcrypt.compare(password, isAdminExists.password)
  if(!passwordCompare) 
    return res.status(404).send({status:false, message:"password doesn't match"});
    let token = jwt.sign(
      {adminId : isAdminExists.email,  exp: Math.floor(Date.now() / 1000) + 86400}, "aeccisecurity");
     let tokenInfo = { userId: isAdminExists._id, token: token };

    res.setHeader('x-api-key', token)

    return res.status(200).send({ status: true, message: "Admin login successfully", data: tokenInfo });
}
    
  catch(error){
    return res.status(500).send({status:false, message:error.message})
  }
}

const getAdminDetails = async (req,res)=>{
  try{
      let adminData = await adminModel.find();
      return res.status(200).send({status: true, message: "get admin data", data: adminData})
  }
  catch(error){
    return res.status(500).send({status: false, message: error.message})
  }
}

const getCompanyDetailsForAdmin = async (req, res) => {
  try {
      let companyId = req.params;
      if (!clientId) return res.status(400).send({ status: false, message: "Please Enter clientId value" });
      let clientCompanyDetails = await clientModel.findById(clientId);
      if (!clientCompanyDetails) return res.status(404).send({ status: false, message: "No data found" });
     
      
      return res.status(200).send({ status: true, message: "here's company Details", data: clientCompanyDetails });
  }
  catch (error) {
      return res.status(500).send({ status: false, message: error.message })
  }
}

const filledByAdmin = async (req, res)=>{
  try {
    let companyId = req.params.companyId;
    let data = req.body;
    let {memberShipNo, validUpTo, approved, reasonForNotchoosing}=data;
      
      if(!memberShipNo) return res.status(400).send({ status: false, message: "please fill membership no"});
      memberShipNo = data.memberShipNo= memberShipNo;
     
      if(!validUpTo) return res.status(400).send({ status: false, message: "please fill validUpTo"});
      validUpTo = data.validUpTo= validUpTo;

      if(!approved) return res.status(400).send({ status: false, message: "please fill approved"});
      approved = data.approved= approved;

      if(approved === false && !reasonForNotchoosing) return res.status(400).send({ status: false, message: "please put reason"});
      reasonForNotchoosing = data.reasonForNotchoosing= reasonForNotchoosing;

      if (!companyId) return res.status(400).send({ status: false, message: "Please Enter companyId value" });
      let clientCompanyDetails = await clientModel.findOneAndUpdate({_id:companyId},{$set:{memberShipNo:memberShipNo, validUpTo:validUpTo, approved:approved,reasonForNotchoosing:reasonForNotchoosing}},{new:true});
      if (!clientCompanyDetails) return res.status(404).send({ status: false, message: "No data found" });
      return res.status(200).send({ status: true, message: "Data updated successfully", data: clientCompanyDetails });
      
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const partiallyApproved = async (req,res)=>{
  try {
    let partiallyApproved = req.body;
    if(partiallyApproved === false) return res.status(400).send({status:false, message:"not approved"});
    // we are sending Email to the user 
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}



//change password request
const adminApprovedRequest = async (req, res) => {
  let id = req.params.changePasswordId;
  let data = req.body.approved;
  if(data === false) return res.status(400).send({ status: false, message: "no password change" }) 
  let changePasswordInfo = await clientPasswordChangeModel.findById(id);
  if (!changePasswordInfo) return res.status(404).send({ status: false, message: "document doesn't exists " })
  let email = changePasswordInfo.email;
  let isClientExists = await clientModel.findOneAndUpdate({ email: email },{$set:{password:changePasswordInfo.newPassword, confirmPassword: changePasswordInfo.confirmPassword}},{new:true});
  if (!isClientExists) return res.status(404).send({ status: false, message: "Email doesn't exists " })
  return res.status(200).send({ status: false, message: "changed password" })
  }

module.exports = {registerAdmin,loginAdmin,getAdminDetails,getCompanyDetailsForAdmin, filledByAdmin,adminApprovedRequest};
  