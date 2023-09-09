const mongoose = require('mongoose')
const adminModel = require("../models/adminModel");
const clientModel = require("../models/clients/clientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const crypto = require("crypto")
const forgotPasswordModel = require("../models/forgotPasswordModel")
const clientPasswordChangeModel = require('../models/clients/clientPasswordChangeModel');
const commercialDir = require('../models/clients/comercialDirectory');
const clientCompanyUpdateModel = require('../models/clients/clientCompanyUpdateModel');
const clientPersonalModel = require('../models/clients/clientPersonalModel');
//const validation = require("../validations/validation");
const validation = require("../validations/validation")

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

const registerAdmin = async ( req, res) =>{
  try{
    let adminData = req.body;
    console.log(adminData)
    let {adminId ,fname, lname, profileImage, email, password} = adminData;
    
    adminId=adminData.adminId = "admin_"+generateRandomString(10);
    profileImage = adminData.profileImage = req.image  ;

        
    if (!fname)
        return res.status(400).send({ status: false, message: "fname is required" });

    if (typeof (fname) != "string")
        return res.status(400).send({ status: false, message: "fname should be in String" });
      
    fname = adminData.fname = fname.trim();

    if (fname == "")
        return res.status(400).send({ status: false, message: "Please Enter fname value" });
//________________________________________________________

    if (!lname)
    return res.status(400).send({ status: false, message: "lname is required" });

    if (typeof (lname) != "string")
    return res.status(400).send({ status: false, message: "lname should be in String" });

    lname = adminData.lname = lname.trim();

    if (lname == "")
    return res.status(400).send({ status: false, message: "Please Enter lname value" });

//________________________________________________________
    if (!email)
    return res.status(400).send({ status: false, message: "email is mandatory" });
    if (typeof (email) != "string") {
    return res.status(400).send({ status: false, message: " please send proper email" })
    }
    email = adminData.email = email.trim().toLowerCase()
    if (email == "")
    return res.status(400).send({ status: false, message: " please send proper email" })

    if (!validation.validateEmail(email))
    return res.status(400).send({ status: false, message: "Please provide valid email id" });

    let isAdminExists = await adminModel.findOne({ email: email });

    if (isAdminExists) {
    if (isAdminExists.email == email)
        return res.status(400).send({ status: false, message: "email id already exist, send another email" });
    }
    //_____________________________________________________
        
    if (!password)
    return res.status(400).send({ status: false, message: "password is mandatory" });

    if (typeof (password) != "string")
    return res.status(400).send({ status: false, message: "please provide password in string " });
    password = adminData.password = password.trim();

    if (password == "")
    return res.status(400).send({ status: false, message: "Please provide password value" });

    if (!validation.validatePassword(password))
    return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting password
    let hashingPassword = bcrypt.hashSync(password, 10);
    adminData.password = hashingPassword;
      
//_____________________________________________________

    let adminCreated = await adminModel.create(adminData);
    return res.status(200).send({status: true ,message:"admin got created ", data : adminCreated})
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
    //   return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

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
      {adminId : isAdminExists._id,  exp: Math.floor(Date.now() / 1000) + 604800 }, "aeccisecurity");
     let tokenInfo = { userId: isAdminExists._id, token: token };
      console.log(tokenInfo)
    res.setHeader('x-api-key', token)

    return res.status(200).send({ status: true, message: "Admin login successfully", data: tokenInfo });
}
    
  catch(error){
    return res.status(500).send({status:false, message:error.message})
  }
}

const getAdminDetails = async (req,res)=>{
  try{
      let adminId = req.adminId;
      let adminData = await adminModel.findById(adminId).select({_id:0});
      return res.status(200).send({status: true, message: "get admin data", data: adminData})
  }
  catch(error){
    return res.status(500).send({status: false, message: error.message})
  }
}

const getCompanyDetailsForAdmin = async (req, res) => {
  try {
      let clientCompanyDetails = await clientModel.find().select({_id:0});
      if (clientCompanyDetails.length === 0) return res.status(404).send({ status: false, message: "No data found" });
      return res.status(200).send({ status: true, message: "here's company Details", data: clientCompanyDetails });
  }
  catch (error) {
      return res.status(500).send({ status: false, message: error.message })
  }
}

const getCompanyUpdateForAdmin = async (req, res) => {
  try {
      let clientCompanyDetails = await clientCompanyUpdateModel.find({isApproved:false}).select({_id:0});
      if (clientCompanyDetails.length === 0) return res.status(404).send({ status: false, message: "No data found" });
      return res.status(200).send({ status: true, message: "here's company Details for Update! ", data: clientCompanyDetails });
  }
  catch (error) {
      return res.status(500).send({ status: false, message: error.message })
  }
}

const getPersonalUpdateForAdmin = async (req, res) => {
  try {
      let clientCompanyDetails = await clientPersonalModel.find({isApproved:false}).select({_id:0});
      if (clientCompanyDetails.length === 0) return res.status(404).send({ status: false, message: "No data found" });
      return res.status(200).send({ status: true, message: "here's company Details for Update! ", data: clientCompanyDetails });
  }
  catch (error) {
      return res.status(500).send({ status: false, message: error.message })
  }
}

const updateCompany = async (req,res)=>{
  try{
    let updateId = req.params.updateCompanyId;
    let data = req.body;
    let {approvedForCompany, clientId} = data;
     
    if (typeof approvedForCompany != "boolean") return res.status(400).send({ status: false, message: "please provide approvedForCompany in boolean " });
    
    if (!clientId) return res.status(400).send({ status: false, message: "clientId is required" });
    if (clientId == "") return res.status(400).send({ status: false, message: "Please Enter clientId value" });
    clientId = data.clientId = clientId.trim();
    if (typeof (clientId) != "string") return res.status(400).send({ status: false, message: "clientId should be in String" });
    
    if(approvedForCompany === true){ 
    let foundData = await clientCompanyUpdateModel.findOneAndUpdate({clientId:clientId, _id:updateId},{$set:{isApproved:true}},{new:true});
    if(!foundData) return res.status(400).send({status:false, message:"No document Found !!!"});
    console.log(foundData)
    let updatedData = await clientModel.findOneAndUpdate({ _id: clientId }, { $set: { fname: foundData.companyName, numberOfEmployees: foundData.numberOfEmployees, businessCategory: foundData.businessCategory, howDidYouKnowAboutUs: foundData.howDidYouKnowAboutUs, telephoneNo: foundData.telephoneNo, email: foundData.email, websiteAdd: foundData.websiteAdd, address1: foundData.address1, address2: foundData.address2, country: foundData.country, state: foundData.state, pinCode: foundData.pinCode, facebook: foundData.facebook, twitter: foundData.twitter, linkedIn: foundData.linkedIn } }, { new: true });
    return res.status(200).send({status:true, message:"dataUpdated", data:updatedData})
  }

    return res.status(200).send({status:true, message:"Client's request is denied"})
  }
  
  
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}
}

const updatePersonal = async (req,res)=>{
  try{
    let updateId = req.params.updatePersonalId;
    let data = req.body;
    let {approvedForPersonal, clientId} = data;
     
    if (typeof approvedForPersonal != "boolean") return res.status(400).send({ status: false, message: "please provide approvedForPersonal in boolean " });
    
    if (!clientId) return res.status(400).send({ status: false, message: "clientId is required" });
    clientId = data.clientId = clientId.trim();
    if (clientId == "") return res.status(400).send({ status: false, message: "Please Enter clientId value" });
    if (typeof (clientId) != "string") return res.status(400).send({ status: false, message: "clientId should be in String" });
   
    if(approvedForPersonal === true){ 
    let foundData = await clientPersonalModel.findOneAndUpdate({clientId:clientId, _id:updateId},{$set:{isApproved:true}},{new:true});
    if(!foundData) return res.status(400).send({status:false, message:"No document Found !!!"});
    console.log(foundData)
    let updatedData = await clientModel.findOneAndUpdate({ _id: clientId  }, { $set: { title: foundData.title, firstName: foundData.firstName,surName:foundData.surName, role: foundData.role, phoneNo: foundData.phoneNo, address1: foundData.address1, address2: foundData.address2, country: foundData.country, state: foundData.state, pinCode: foundData.pinCode } }, { new: true });
    return res.status(200).send({status:true, message:"dataUpdated", data:updatedData})
  }

    return res.status(200).send({status:true, message:"data isn't updated "})
  }
  
  
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}
}

const adminApprovedComDir = async (req, res) => {
  try{
  let id = req.params.comDirId;
  let data = req.body.approved;
  let foundData= await commercialDir.findByIdAndUpdate({_id:id}, {approved:data}, {new:true});
  if (!foundData) return res.status(404).send({ status: false, message: "document doesn't exists" })
  console.log(foundData)
  return res.status(200).send({ status: false, message: "data updated" })
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }  
}

const filledByAdmin = async (req, res)=>{
  try {
    let companyId = req.params.companyId;
    if (!companyId) return res.status(400).send({ status: false, message: "Please Enter companyId value" });
    let data = req.body;
    let {approved, reasonForNotchoosing}=data;
    
    if (typeof approved != "boolean") return res.status(400).send({ status: false, message: "please provide approved in boolean " });
    approved = data.approved= approved;
    
    if(approved === false && !reasonForNotchoosing) return res.status(400).send({ status: false, message: "please put reason"});
    
    let clientDetails= await clientModel.findById(companyId)
    if (!clientDetails) return res.status(404).send({ status: false, message: "No data found" });
    
    if(approved === false){
    if (typeof (reasonForNotchoosing) != "string")
    return res.status(400).send({ status: false, message: "reasonForNotchoosing should be in String" });
    reasonForNotchoosing = data.reasonForNotchoosing = reasonForNotchoosing.trim();
    if (reasonForNotchoosing == "")
    return res.status(400).send({ status: false, message: "Please Enter reasonForNotchoosing value" });
    reasonForNotchoosing = data.reasonForNotchoosing= reasonForNotchoosing;
    }
    else if(approved === true){
      req.email = clientDetails.email;
      console.log(clientDetails.email, req.email)
      await mailSendingProcedure(req,res)
    }
    console.log("some")
    let clientCompanyDetails = await clientModel.findOneAndUpdate({_id:companyId},{$set:{approved:approved,reasonForNotchoosing:reasonForNotchoosing}},{new:true});
    if (!clientCompanyDetails) return res.status(404).send({ status: false, message: "No data found" });
    return res.status(200).send({ status: true, message: "Data updated successfully", data: clientCompanyDetails });
      
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}



const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail'
  auth: {
    user: "anmolkadam369@gmail.com",
    pass: "vcynqfpjuodxljyh"
  }
});

// Function to send forgot password email
const sendMailToClient = (email, token) => {

  console.log("KK1")

  const mailOptions = {
    from: 'anmolkadam369@gmail.com', // Your email address
    to: email,
    subject: 'your link client',
    text: `Click the link to fill further form :https://www.aecci.org.in/small-business-form/`
  };

  console.log("info")
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log("KK2")
      console.log('Email sent:', info.response);
    }
  });
};


const  mailSendingProcedure =async (req, res) => {
  console.log("email")
  console.log(req.email)
let sendMailing=req;
  let {email,resetToken,resetTokenExpires }=sendMailing;
  console.log(email)
  // Find forgotPassword by email (you should replace this with your database query)
  const foundUser = clientModel.findOne({email: email});
  if (!foundUser) {
    return res.status(404).json({ message: 'user not found' });
  }

  // Generate and store reset token
  const token = crypto.randomBytes(20).toString('hex');
  console.log("token:",token)

  email= sendMailing.email = email;
  resetToken = sendMailing.resetToken = token;
  console.log("resetToken:",resetToken)

  resetTokenExpires = sendMailing.resetTokenExpires = Date.now() + 6000000; // Token expires in 1 hour
  console.log("resetTokenExpires:",resetTokenExpires)
  // console.log("sendMailing:      ", sendMailing)
  let allInfo = await forgotPasswordModel.create(sendMailing);
  req.token = token;
  console.log(req.token)
  sendMailToClient(email,token)
};


















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
const adminChangedPassword = async (req, res) => {
  try{
  let id = req.params.changePasswordId;
  let data = req.body.approved;
  if(data === false) return res.status(400).send({ status: false, message: "no password change" }) 
  let changePasswordInfo = await clientPasswordChangeModel.findById(id);
  if (!changePasswordInfo) return res.status(404).send({ status: false, message: "document doesn't exists " })
  let email = changePasswordInfo.email;
  let isClientExists = await clientModel.findOneAndUpdate({ email: email },{$set:{password:changePasswordInfo.newPassword, confirmPassword: changePasswordInfo.confirmPassword}},{new:true});
  if (!isClientExists) return res.status(404).send({ status: false, message: "Email doesn't exists " })
  return res.status(200).send({ status: false, message: "changed password" })
  }catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }  
}



module.exports = {registerAdmin,adminApprovedComDir,updatePersonal,loginAdmin,updateCompany,getAdminDetails,getCompanyDetailsForAdmin,getCompanyUpdateForAdmin,getPersonalUpdateForAdmin, filledByAdmin,adminChangedPassword};
  