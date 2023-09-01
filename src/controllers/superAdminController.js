let mongoose = require('mongoose')
let superAdminModel = require("../models/superAdminModel");
let jwt = require("jsonwebtoken");
let bcrypt = require('bcrypt');
const clientModel = require('../models/clients/clientModel');
//let validation = require("../validations/validation");
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}


const registerSuperAdmin = async ( req, res) =>{
  try{
    let superAdminData = req.body;
    let {superAdminId , fname, lname, profileImage, email, password} = superAdminData;
    profileImage = superAdminData.profileImage = req.image  ;
    
    superAdminId = superAdminData.superAdminId = "superAdmin_"+generateRandomString(10);
    
    
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
    email = superAdminData.email = email.trim().toLowerCase();
    if(email == "")
      return res.status(400).send({status: false, message:" please send proper email"})
//_____________________________________________________
    
     if (!password)
      return res.status(400).send({ status: false, message: "password is mandatory" });

    if (typeof password != "string")
      return res.status(400).send({ status: false, message: "please provide password in string " });

    password = superAdminData.password = password.trim();
    if (password == "")
      return res.status(400).send({ status: false, message: "Please provide password value" });


    //regex password
    // if (!validation.validatePassword(password))
      // return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting password
    let hashing = bcrypt.hashSync(password, 10);
    superAdminData.password = hashing;
//_____________________________________________________

     let superAdminExist = await superAdminModel.findOne({ email: email });

    if (superAdminExist) {
      if (superAdminExist.email == email)
        return res.status(400).send({ status: false, message: "email id  already exist, send another email" });
  }
      superAdminData.profileImage = req.image;
    let superAdminCreated = await superAdminModel.create(superAdminData);
    return res.status(200).send({status: true ,message:"user got created ", data : superAdminCreated})
    
}
  catch(error){
    return res.status(500).send({status: false, message: error.message});
  }
}

const loginSuperAdmin = async(req,res)=>{
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
    let hashing = bcrypt.hashSync(password, 10);
    loginData.password = hashing;
//_____________________________________________________
    let isSuperAdminExists = await superAdminModel.findOne({email:email});
    if(!isSuperAdminExists)
      return res.status(404).send({status:false, message:"Email doesn't exists "})

    let passwordCompare = await bcrypt.compare(password, isSuperAdminExists.password)
  if(!passwordCompare) 
    return res.status(404).send({status:false, message:"password doesn't match"});
    let token = jwt.sign(
      {superAdminId : isSuperAdminExists._id,  exp: Math.floor(Date.now() / 1000) + 604800}, "aeccisecurity");
     let tokenInfo = { userId: isSuperAdminExists._id, token: token };

    res.setHeader('x-api-key', token)

    return res.status(200).send({ status: true, message: "Admin login successfully", data: tokenInfo });
}
    
  catch(error){
    return res.status(500).send({status:false, message:error.message})
  }
}

const getSuperAdminDetails = async (req,res)=>{
  try{
      let superAdminId = req.superAdminId;
      let superAdminData = await superAdminModel.findById(superAdminId);
      return res.status(200).send({status: true, message: "get superAdmin data", data: superAdminData})
  }
  catch(error){
    return res.status(500).send({status: false, message: error.message})
  }
}

const getCompanyDetailsForsuperAdmin = async (req, res) => {
    try {
        let clientCompanyDetails = await clientModel.find({approved:true});
        if (clientCompanyDetails.length === 0) return res.status(404).send({ status: false, message: "No data found" });
        return res.status(200).send({ status: true, message: "here's company Details", data: clientCompanyDetails });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
  }

// const filledBysuperAdmin = async (req, res)=>{
//   try {
//     let clientId = req.params;
//     let data = req.body;
//     let {approvedBySuperAdminBySuperAdmin}=data;
      
//       if(approvedBySuperAdmin){
//        approvedBySuperAdmin  = data.approvedBySuperAdmin = approvedBySuperAdmin ;
//       if (!clientId) return res.status(400).send({ status: false, message: "Please Enter clientId value" });
//       let clientCompanyDetails = await clientModel.findOneAndUpdate({_id:clientId},{$set:{approvedBySuperAdmin:approvedBySuperAdmin}},{new:true});
//       if (!clientCompanyDetails) return res.status(404).send({ status: false, message: "No data found" });
//       return res.status(200).send({ status: true, message: "Data updated successfully", data: clientCompanyDetails });
//       }
//   } catch (error) {
//     return res.status(500).send({ status: false, message: error.message })
//   }
// }


let count = 1001;



const generateMemberShipNo =  (selectMembership,membershipno) => {
    if (!membershipno) {
        let shortMemberShipName;
        console.log(selectMembership)
        if (selectMembership === "Small Business") shortMemberShipName = "SB";
        if (selectMembership === "Start- Up") shortMemberShipName = "SU";
        if (selectMembership === "Corporate") shortMemberShipName = "CORP";
        if (selectMembership === "Non Profit Org") shortMemberShipName = "NPO";
        if (selectMembership === "Overseas") shortMemberShipName = "OS";
        if (selectMembership === "Corporate +") shortMemberShipName = "CORP+";
        console.log(count)
        count += count-count+1;
        console.log(count)

        const changes=(year)=>{
          const myArray = year.split('')
          myArray.shift();
          myArray.shift();
          const myString = myArray.join('')
            return myString;
          }

        let currentYear = new Date().getFullYear();
        let nextYear = (new Date().getFullYear()) + 1;
        currentYear = currentYear.toString()
        nextYear = nextYear.toString()
        currentYear = changes(currentYear)
        nextYear = changes(nextYear)

       

        // let generatedMemberShipNo = `AECCI/${shortMemberShipName}/${count}/${currentYear}-${nextYear}`;
        let generatedMemberShipNo = `${shortMemberShipName}${currentYear}${nextYear}-${count}`;
        
        console.log("here's your ticket no is ", generatedMemberShipNo)
       return generatedMemberShipNo;

    }
    else {
        return 'You have already generated the token';
    }
}
const filledBysuperAdmin = async (req, res)=>{
  try {
    let companyId = req.params.companyId;
    if (!companyId) return res.status(400).send({ status: false, message: "Please Enter companyId value" });
    let data = req.body;
    let {memberShipNo, validUpTo, approvedBySuperAdmin}=data;
      
    
    if(!validUpTo) return res.status(400).send({ status: false, message: "please fill validUpTo"});
    if (typeof validUpTo != "string") return res.status(400).send({ status: false, message: "please provide validUpTo in string " });
    if (validUpTo == "") return res.status(400).send({ status: false, message: "Please provide validUpTo value" });
    validUpTo = data.validUpTo= validUpTo;
    
    if (typeof approvedBySuperAdmin != "boolean") return res.status(400).send({ status: false, message: "please provide approvedBySuperAdmin in boolean " });
    approvedBySuperAdmin = data.approvedBySuperAdmin= approvedBySuperAdmin;
    
    let companyInfo = await clientModel.findById(companyId)
    if(approvedBySuperAdmin === true && companyInfo.selectMembership !== "Digital User"){
      console.log(companyInfo.memberShipNo)
      memberShipNo = generateMemberShipNo(companyInfo.selectMembership,companyInfo.memberShipNo);
      if(memberShipNo === 'You have already generated the token') return res.status(400).send({ status: false, message: "You have already generated the token" })
      console.log(memberShipNo)
      memberShipNo = data.memberShipNo= memberShipNo;
  }
      let clientCompanyDetails = await clientModel.findOneAndUpdate({_id:companyId},{$set:{memberShipNo:memberShipNo, validUpTo:validUpTo, approvedBySuperAdmin:approvedBySuperAdmin}},{new:true});
      if (!clientCompanyDetails) return res.status(404).send({ status: false, message: "No data found" });
      return res.status(200).send({ status: true, message: "Data updated successfully", data: clientCompanyDetails });
      
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}
module.exports = {registerSuperAdmin, loginSuperAdmin,getSuperAdminDetails,getCompanyDetailsForsuperAdmin,filledBysuperAdmin};
  