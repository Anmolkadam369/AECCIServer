const mongoose = require ("mongoose");
// const dateTime = require("node-datetime")
const administrationModel = require ('../models/administrationModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const employeeJdModel = require("../models/employeeJdModel");
const nodemailer = require('nodemailer');
const crypto = require("crypto")
require('dotenv').config();
const forgotPasswordModel = require("../models/forgotPasswordModel")

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

const registerAdministration = async (req, res)=>{
  try{
    let registerAdministrationInfo = req.body;
    let {administrationId, profileImage,departmentName,officerName,employeeId,emailId,userName,password,designation,date,signature} = registerAdministrationInfo;

administrationId = registerAdministrationInfo.administrationId = "emp_"+generateRandomString(10); 
    //_______________________________Extarnal Data_________________________________________________
    
    profileImage = registerAdministrationInfo.profileImage = req.image  ;
    signature = registerAdministrationInfo.signature = req.image;
    let dated = new Date().getDate()
    let month = String(new Date().getMonth()+1)
    let year = new Date().getFullYear()
    console.log("month",month)
    let registrationDate = `${dated}-${month}-${year}`;
    date = registerAdministrationInfo.date = registrationDate;    

    //____________________departmentName __________
    if(!departmentName)
      return res.status(400).send({status: false, message: "departmentName is required"});

     if (departmentName == "")
      return res.status(400).send({ status: false, message: "Please Enter departmentName value" });

    
    if(typeof(departmentName) != "string")
      return res.status(400).send({status: false, message: "departmentName should be in String"});
    

    if(!officerName) 
      return res.status(400).send({status: false, message: "officerName is required"});

     if(typeof(officerName) != "string")
      return res.status(400).send({status: false, message: "officerName should be in String"});

    if (officerName == "")
      return res.status(400).send({ status: false, message: "Please Enter officerName value" });

    //______________________________
      
    if(!employeeId) 
      return res.status(400).send({status: false, message: "employeeId is required"});

      console.log(typeof(employeeId));
     if(typeof(employeeId) != "string")
      return res.status(400).send({status: false, message: "employeeId should be in string"});

    if (employeeId == "")
      return res.status(400).send({ status: false, message: "Please Enter employeeId value" });

    //______________________________
     if(!emailId) 
      return res.status(400).send({status: false, message: "emailId is required"});

     if(typeof(emailId) != "string")
      return res.status(400).send({status: false, message: "emailId should be in String"});

    if (emailId == "")
      return res.status(400).send({ status: false, message: "Please Enter emailId value" });

      let isEmployeeExist = await administrationModel.findOne({ emailId: emailId });

      if (isEmployeeExist) {
        if (isEmployeeExist.emailId == emailId)
          return res.status(400).send({ status: false, message: "email id already exist, send another email" });
    }
    //______________________________
    if(!designation) 
    return res.status(400).send({status: false, message: "designation is required"});

   if(typeof(designation) != "string")
    return res.status(400).send({status: false, message: "designation should be in String"});

  if (designation == "")
    return res.status(400).send({ status: false, message: "Please Enter designation value" });
    //______________________________

  
    if(!userName) 
      return res.status(400).send({status: false, message: "userName is required"});

     if(typeof(userName) != "string")
      return res.status(400).send({status: false, message: "userName should be in String"});

    if (userName == "")
      return res.status(400).send({ status: false, message: "Please Enter userName value" });
    //______________________________
        if(!password) 
      return res.status(400).send({status: false, message: "password is required"});

     if(typeof(password) != "string")
      return res.status(400).send({status: false, message: "password should be in String"});

    if (password == "")
      return res.status(400).send({ status: false, message: "Please Enter password value" });

    //hashing password 
    let hashing = bcrypt.hashSync(password, 10);
    registerAdministrationInfo.password = hashing; 

    //______________________________
    
    let logInTime = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate()
    registerAdministrationInfo.Date = logInTime;
    // console.log(values)
    // registerAdministrationInfo.tasks = values;
          //registration of an employee his/her photo
    //registerAdministration.signature = req.image;
    //____________________
    console.log([registerAdministrationInfo])
    console.log(registerAdministrationInfo.tasks)

    let employeeCreated = await administrationModel.create(registerAdministrationInfo)
    console.log("employeeCreated : ", employeeCreated)
    // let createdJd = await employeeJdModel.create(employeeJd);

    return res.status(201).send({status:true, message: "user created", data : employeeCreated})
  }
  catch (error){
    return res.status(500).send({status: false, message: error.message});
}
}

const loginAdministration = async(req,res,next)=>{
  try{
    let loginData = req.body;
    console.log("frontend Data :", loginData)

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

    // Encrypting password
    // let hashing = bcrypt.hashSync(password, 10);
    // loginData.password = hashing;
//_____________________________________________________
console.log("email", email)
    // let isAdministrationExist = await administrationModel.findOne({email:email});
    let isAdministrationExist = await administrationModel.findOne({emailId:email})
    console.log("bruh",isAdministrationExist)
    if(!isAdministrationExist)
      return res.status(404).send({status:false, message:"Email doesn't exists "})


    let passwordCompare = await bcrypt.compare(password, isAdministrationExist.password)
    console.log(passwordCompare);
  if(!passwordCompare) 
    return res.status(404).send({status:false, message:"password doesn't match"});
    let token = jwt.sign(
      {administrationId : isAdministrationExist._id,  exp: Math.floor(Date.now() / 1000) + 86400}, "aeccisecurity");
     let tokenInfo = { userId: isAdministrationExist._id, token: token };
     console.log(tokenInfo);


    res.setHeader('x-api-key', token)
        //__________________________________________________________________

        if(isAdministrationExist.emailId == "hr@aecci.org.in")
      return res.status(400).send({status:false, message:"you cannot logged in from here !!!!"})

        // next()
            
      //__________________________________________________________________
      console.log("tokenInfo", tokenInfo)
    return res.status(200).send({ status: true, message: `${isAdministrationExist.officerName} login successfully`, data:  isAdministrationExist, tokenInfo: tokenInfo});
}
catch(error){
  return res.status(500).send({status:false, message:error.message})
}
} 

const loginHR = async(req,res)=>{
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

    // Encrypting password
    // let hashing = bcrypt.hashSync(password, 10);
    // loginData.password = hashing;
//_____________________________________________________
console.log("email", email)
    // let isAdministrationExist = await administrationModel.findOne({email:email});
    let isAdministrationExist = await administrationModel.findOne({emailId:email})
    console.log("bruh",isAdministrationExist)
    if(!isAdministrationExist)
      return res.status(404).send({status:false, message:"Email doesn't exists "})
      if(isAdministrationExist.emailId != "hr@aecci.org.in")
      return res.status(400).send({message:false, message:"This is authorized for HR only"})

    let passwordCompare = await bcrypt.compare(password, isAdministrationExist.password)
    console.log(passwordCompare);
  if(!passwordCompare) 
    return res.status(404).send({status:false, message:"password doesn't match"});
    let token = jwt.sign(
      {administrationId : isAdministrationExist._id,  exp: Math.floor(Date.now() / 1000) + 86400}, "aeccisecurity");
     let tokenInfo = { userId: isAdministrationExist._id, token: token };
     console.log(tokenInfo);
    //  tokenInfo = bcrypt.hashSync(tokenInfo, 10);
    //  console.log(tokenInfo,"hey");

    res.setHeader('x-api-key', token)
        //__________________________________________________________________

       
      
      //__________________________________________________________________

    return res.status(200).send({ status: true, message: `${isAdministrationExist.officerName} login successfully`, data: isAdministrationExist, tokenInfo:tokenInfo });
}
catch(error){
  return res.status(500).send({status:false, message:error.message})
}
}

const getEmpData = async(req,res)=>{
  try {
    const employeeId = req.params.employeeId;
    console.log(employeeId)
     
    let getInfo = await administrationModel.find({isDeleted:false});
    console.log(getInfo)
    if(!getInfo)return res.status(400).send({status: false, message:"No user Found"})
  res.status(200).send({status:true, message: "employees information ", data : getInfo })
  } catch (error) {
    return res.status(500).send({status:false, message:error.message})
  }
}

const getMyaccount = async (req,res)=>{
  const employeeId = req.params.employeeId;
    console.log(employeeId)
  let getInfo = await administrationModel.findOne({administrationId:employeeId});
  if(!getInfo)return res.status(400).send({status: false, message:"No user Found"});
  res.status(200).send({status:true, message:`${getInfo.officerName} 's information !`, data : getInfo })
}

const getWantedAdministrationList = async (req,res)=>{
  try{
    const employeeId = req.params.employeeId;
    console.log(employeeId)
     
    let getInfo = await employeeJdModel.find({employeeId:employeeId});
    console.log(getInfo)
    if(!getInfo)return res.status(400).send({status: false, message:"No user Found"})
  res.status(200).send({status:true, message: "employees information ", data : getInfo })
  }
   catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}

const updateInfo = async (req,res)=>{
     try{
      let values=[];
       let empId = req.params.normalEmployee;
    let updateEmployeeInfo = req.body;
    let {profileImage,departmentName,officerName,userName,password,date,signature,employeeId,tasks, emailId,designation} = updateEmployeeInfo;
      //registration of an employee his/her photo
    //registerAdministration.profileImage = req.image;
    //____________________
    
      //_______________________________Extarnal Data_________________________________________________
    if(profileImage)
    profileImage = updateEmployeeInfo.profileImage = req.image;

    if(signature)
    signature = updateEmployeeInfo.signature = req.image;

    let dated = new Date().getDate()
    let month = String(new Date().getMonth()+1)
    let year = new Date().getFullYear()
    console.log("month",month)
    let registrationDate = `${year}-${month}-${dated}`;
    date = updateEmployeeInfo.date = registrationDate;  


//____________________departmentName __________
    if(departmentName){
     if (departmentName == "")
      return res.status(400).send({ status: false, message: "Please Enter departmentName value" });

    if(typeof(departmentName) != "string")
      return res.status(400).send({status: false, message: "departmentName should be in String"});

    if(officerName){ 

     if(typeof(officerName) != "string")
      return res.status(400).send({status: false, message: "officerName should be in String"});

    if (officerName == "")
      return res.status(400).send({ status: false, message: "Please Enter officerName value" });
}
    //______________________________
      
    if(employeeId) {
      console.log(typeof(employeeId))
     if(typeof(employeeId) != "number")
      return res.status(400).send({status: false, message: "employeeId should be in Number"});

    if (employeeId == "")
      return res.status(400).send({ status: false, message: "Please Enter employeeId value" });
}
    //______________________________
      if(emailId){
        if(typeof(emailId) != "string")
        return res.status(400).send({status: false, message: "emailId should be in String"});
  
      if (emailId == "")
        return res.status(400).send({ status: false, message: "Please Enter emailId value" });
  
        let isEmployeeExist = await administrationModel.findOne({ emailId: emailId });
  
        if (isEmployeeExist) {
          if (isEmployeeExist.emailId == emailId)
            return res.status(400).send({ status: false, message: "email id already exist, send another email" });
      }
    }
    //______________________________

      if(designation){
        if(typeof(designation) != "string")
    return res.status(400).send({status: false, message: "designation should be in String"});

  if (designation == "")
    return res.status(400).send({ status: false, message: "Please Enter designation value" });
      }

    //______________________________
  
    if(userName) { 
     if(typeof(userName) != "string")
      return res.status(400).send({status: false, message: "userName should be in String"});

    if (userName == "")
      return res.status(400).send({ status: false, message: "Please Enter userName value" });
    }
    //______________________________
    if(password){ 
     if(typeof(password) != "string")
      return res.status(400).send({status: false, message: "password should be in String"});

    if (password == "")
      return res.status(400).send({ status: false, message: "Please Enter password value" });
       
    //hashing password 
      let hashing = bcrypt.hashSync(password, 10);
      password = updateEmployeeInfo.password = hashing;
    console.log(updateEmployeeInfo.password)
    }

    //______________________________
    // console.log("values :", values)
    // tasks = updateEmployeeInfo.tasks = values;
          //registration of an employee his/her photo
    // registerAdministration.signature = req.image;
    //____________________
    let updatedEmployee = await administrationModel.findOneAndUpdate({administrationId : empId, isDeleted:false}, {$set:{profileImage:profileImage, departmentName:departmentName, officerName:officerName, employeeId:employeeId,emailId:emailId, designation:designation, userName:userName, password:password, tasks:tasks}}, {new:true});
       
    return res.status(200).send({status:true, message: "user Upadated", data : updatedEmployee})
  }
}
   catch (error) {
         return res.status(500).send({ status: false, message: error.message })
  }
}

const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail'
  auth: {
    user: "anmolkadam369@gmail.com",
    pass: "xapeupenirhdxtgt"
  }
});

// Function to send forgot password email
const sendForgotPasswordEmail = (email, token) => {


  const mailOptions = {
    from: 'anmolkadam369@gmail.com', // Your email address
    to: email,
    subject: 'Password Reset',
    text: `Click the link to reset your password: http://localhost:3001/administration/resetPassword/${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const  forgotPasword =async (req, res) => {
  let forgotPassword = req.body;
  let {email,resetToken,resetTokenExpires} = forgotPassword;
  // Find forgotPassword by email (you should replace this with your database query)
  const foundforgotPassword = administrationModel.findOne({emailId: email});
  if (!foundforgotPassword) {
    return res.status(404).json({ message: 'user not found' });
  }

  // Generate and store reset token
  const token = crypto.randomBytes(20).toString('hex');
  console.log("token:",token)

  email=forgotPassword.email = email;
  resetToken = forgotPassword.resetToken = token;
  console.log("resetToken:",resetToken)

  resetTokenExpires = forgotPassword.resetTokenExpires = Date.now() + 6000000; // Token expires in 1 hour
  console.log("resetTokenExpires:",resetTokenExpires)
  console.log("forgotPassword:      ", forgotPassword)
  let allInfo = await forgotPasswordModel.create(forgotPassword);
  res.status(200).send({status:true, message:allInfo})
  req.token = token;
  console.log(req.token)
  sendForgotPasswordEmail(email,token)
};

const resetPassword =async (req, res) => {

  let data = req.body;
  let { newPassword } = data;
  let token = req.params.token;
  const user =await forgotPasswordModel.findOne({resetToken:token});
  console.log(user)
  // if (!user) return res.status(400).send({status:false, message: 'Invalid token' });
  if(user.resetTokenExpires < Date.now()) return res.status(400).send({status:false, message: 'Token expired'  });
  let hashing = bcrypt.hashSync(newPassword, 10);
  newPassword=data.newPassword = hashing; 

  await administrationModel.findOneAndUpdate({emailId:user.email},{$set:{password:newPassword}},{new:true});

  return res.json({ message: 'Password reset successful' });
}


const deleteEmployee = async (req, res)=>{
  try {
    const empolyeeId = req.params.normalEmployee;
    let isEmployeeExist = await administrationModel.findOne({administrationId : empolyeeId});
    if(!isEmployeeExist) return res.status(404).send({ status: false, message: "Employee doesn't exists"});
    if(isEmployeeExist.isDeleted == true) return res.status(400).send({ status: false, message: "Employee is Already Deleted"});
    if(isEmployeeExist.emailId == "hr@aecci.org.in") return res.status(400).send({ status: false, message: "You cannot Delete these Data"});
    let getInfo = await administrationModel.findOneAndUpdate({administrationId : empolyeeId, isDeleted:false },{$set:{isDeleted:true, deletedAt : Date.now()}},{new:true});
     console.log(getInfo)
      return res.status(200).send({ status: true, message: "success", message: "deleted successfully " , data: getInfo})
  } catch (error) {
     return res.status(500).send({ status: false, message: error.message })
  }
}

module.exports = {registerAdministration,loginAdministration,loginHR,getMyaccount,getEmpData,getWantedAdministrationList, updateInfo,forgotPasword,resetPassword,deleteEmployee}