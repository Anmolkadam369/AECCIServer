let mongoose = require('mongoose')
const clientModel = require('../../models/clients/clientModel');
const bcrypt = require('bcrypt');
const clientPasswordChangeModel = require('../../models/clients/clientPasswordChangeModel');
const comercialDirectory = require('../../models/clients/comercialDirectory');
const companyUpdateModel = require('../../models/clients/clientCompanyUpdateModel');
const personalUpdateModel = require('../../models/clients/clientPersonalModel');
const nodemailer = require('nodemailer');
const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const forgotPasswordModel = require("../../models/forgotPasswordModel")
const clientPersonalModel = require('../../models/clients/clientPersonalModel');
const validation = require("../../validations/validation");
const clientMarketingModel = require('../../models/clients/clientMarketingModel');
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const iecRegex = /^[A-Z]{3}[0-9]{5}[A-Z]{2}$/;

const createClient = async (req, res) => {
    try {
        let clientsAllData = req.body;
        let { selectMembership,numberOfEmployees, companyName, inputNumber, websiteAdd, address1, address2, address3, address4, country, state, pinCode, businessCategory, howDidYouKnowAboutUs, title, firstName, surName, role, email, password, confirmPassword, telephoneNo, phoneNo, registeredBank,registeredAccountNo,IFSCCode,branchName, branchDetails, modeOfCommunication ,throughEmail, throughCalls} = clientsAllData;
       
       
        //_______________selectMembership____________________
        if (!selectMembership)
            return res.status(400).send({ status: false, message: "selectMembership is required" });

            selectMembership = clientsAllData.selectMembership = selectMembership.trim();

        if (selectMembership == "")
            return res.status(400).send({ status: false, message: "Please Enter selectMembership value" });


        if (typeof (selectMembership) != "string")
            return res.status(400).send({ status: false, message: "selectMembership should be in String" });

        //______________companyName________________

        if (!companyName)
            return res.status(400).send({ status: false, message: "companyName is required" });

        if (typeof (companyName) != "string")
            return res.status(400).send({ status: false, message: "companyName should be in String" });
           
         companyName = clientsAllData.companyName = companyName.trim();

        if (companyName == "")
            return res.status(400).send({ status: false, message: "Please Enter companyName value" });

        //_________________GSTNo_____________

       if (!inputNumber)
        return res.status(400).send({ status: false, message: "inputNumber is mandatory" });

        if(typeof(inputNumber) != "string"){
        return res.status(400).send({status: false, message:" please send proper inputNumber"})
        }

        inputNumber = clientsAllData.inputNumber = inputNumber.trim();


        if(inputNumber == "") return res.status(400).send({status: false, message:" please send proper inputNumber"});

        if(inputNumber.length !== 10 && inputNumber.length !== 15)  return res.status(400).send({status: false, message:" please send proper GSTNo or IEC Code"});

        if(inputNumber.length == 15){
        if (!gstRegex.test(inputNumber))return res.status(400).json({ valid: false, message: 'Invalid GST number.' });
        }

        if(inputNumber.length === 10){
        if (!iecRegex.test(inputNumber))return res.status(400).json({ valid: false, message: 'Invalid IEC number.' });
        }


        if (!numberOfEmployees)
            return res.status(400).send({ status: false, message: "numberOfEmployees is required" });

        if (typeof (numberOfEmployees) != "number")
            return res.status(400).send({ status: false, message: "numberOfEmployees should be in number" });
         
            // numberOfEmployees = clientsAllData.numberOfEmployees = numberOfEmployees.trim();

        if (numberOfEmployees == "")
            return res.status(400).send({ status: false, message: "Please Enter numberOfEmployees value" });


        //_________________websiteAdd_____________

        if (!websiteAdd)
            return res.status(400).send({ status: false, message: "websiteAdd is required" });

        if (typeof (websiteAdd) != "string")
            return res.status(400).send({ status: false, message: "websiteAdd should be in String" });
         
            websiteAdd = clientsAllData.websiteAdd = websiteAdd.trim();

        if (websiteAdd == "")
            return res.status(400).send({ status: false, message: "Please Enter websiteAdd value" });

        if(!validation.validateWebsite(websiteAdd))
            return res.status(400).send({ status: false, message: "please provide valid website" });


        //_________________add1_____________

        if (!address1)
            return res.status(400).send({ status: false, message: "address1 is required" });

        if (typeof (address1) != "string")
            return res.status(400).send({ status: false, message: "address1 should be in String" });
            
            address1 = clientsAllData.address1 = address1.trim();

        if (address1 == "")
            return res.status(400).send({ status: false, message: "Please Enter address1 value" });

        if (!address2)
            return res.status(400).send({ status: false, message: "address2 is required" });

        if (typeof (address2) != "string")
            return res.status(400).send({ status: false, message: "address2 should be in String" });
            address2 = clientsAllData.address2 = address2.trim();

        if (address2 == "")
            return res.status(400).send({ status: false, message: "Please Enter address2 value" });
        //_________________________________________________________________________
        if (address3) {

            if (typeof (address3) != "string")
                return res.status(400).send({ status: false, message: "address3 should be in String" });

             address3 = clientsAllData.address3 = address3.trim();

            if (address3 == "")
                return res.status(400).send({ status: false, message: "Please Enter address3 value" });
        }

        if (address4) {
            if (typeof (address4) != "string")
                return res.status(400).send({ status: false, message: "address4 should be in String" });
                address4 = clientsAllData.address4 = address4.trim();

            if (address4 == "")
                return res.status(400).send({ status: false, message: "Please Enter address4 value" });
        }

        //________________________________country_________________________________________
        if (!country)
            return res.status(400).send({ status: false, message: "country is required" });

        if (typeof (country) != "string")
            return res.status(400).send({ status: false, message: "country should be in String" });
            country = clientsAllData.country = country.trim();

        if (country == "")
            return res.status(400).send({ status: false, message: "Please Enter country value" });

        //________________________________state_________________________________________
        if (!state)
            return res.status(400).send({ status: false, message: "state is required" });

        if (typeof (state) != "string")
            return res.status(400).send({ status: false, message: "state should be in String" });
            state = clientsAllData.state = state.trim();

        if (state == "")
            return res.status(400).send({ status: false, message: "Please Enter state value" });

        //________________________________pinCode_________________________________________

        if (!pinCode)
            return res.status(400).send({ status: false, message: "pinCode is required" });
        
        
        if (typeof (pinCode) != "number")
        return res.status(400).send({ status: false, message: "pinCode should be in number" });
    
        if (pinCode == "")
            return res.status(400).send({ status: false, message: "Please Enter pinCode value" });
        
        if (!validation.validatePincode(pinCode)) return res.status(400).send({ status: false, message: "please provide valid  pincode" })

        //________________________________businessCategory_________________________________________

        if (!businessCategory)
            return res.status(400).send({ status: false, message: "businessCategory is required" });

        if (typeof (businessCategory) != "string")
            return res.status(400).send({ status: false, message: "businessCategory should be in String" });
        
            businessCategory = clientsAllData.businessCategory = businessCategory.trim();

        if (businessCategory == "")
            return res.status(400).send({ status: false, message: "Please Enter businessCategory value" });

        //___________________________________howDidYouKnowAboutUs______________________________________
        if (!howDidYouKnowAboutUs) 
            return res.status(400).send({ status: false, message: "howDidYouKnowAboutUs is required" });
        
            if (typeof (howDidYouKnowAboutUs) != "string")
                return res.status(400).send({ status: false, message: "howDidYouKnowAboutUs should be in String" });
            
            howDidYouKnowAboutUs = clientsAllData.howDidYouKnowAboutUs = howDidYouKnowAboutUs.trim();
            
            if (howDidYouKnowAboutUs == "")
                return res.status(400).send({ status: false, message: "Please Enter howDidYouKnowAboutUs value" });
        



        //___________________________________PERSONAL INFO______________________________________

        //___________________________________title______________________________________

        if (!title)
            return res.status(400).send({ status: false, message: "title is required" });

        if (typeof (title) != "string")
            return res.status(400).send({ status: false, message: "title should be in String" });
            
            title = clientsAllData.title = title.trim();

        if (title == "")
            return res.status(400).send({ status: false, message: "Please Enter title value" });

        //___________________________________firstName______________________________________

        if (!firstName)
            return res.status(400).send({ status: false, message: "firstName is required" });

        if (typeof (firstName) != "string")
            return res.status(400).send({ status: false, message: "firstName should be in String" });
        
            firstName = clientsAllData.firstName = firstName.trim();

        if (firstName == "")
            return res.status(400).send({ status: false, message: "Please Enter firstName value" });

        if (!validation.validateName(firstName))
            return res.status(400).send({ status: false, message: "please provide valid first name " });
      
        //___________________________________surName______________________________________
        if (!surName)
            return res.status(400).send({ status: false, message: "surName is required" });

        if (typeof (surName) != "string")
            return res.status(400).send({ status: false, message: "surName should be in String" });
            
            surName = clientsAllData.surName = surName.trim();

        if (surName == "")
            return res.status(400).send({ status: false, message: "Please Enter surName value" });

        if (!validation.validateName(surName))
            return res.status(400).send({ status: false, message: "please provide valid last name " });
      

        //___________________________________role______________________________________
        if (!role)
            return res.status(400).send({ status: false, message: "role is required" });

        if (typeof (role) != "string")
            return res.status(400).send({ status: false, message: "role should be in String" });
            
            role = clientsAllData.role = role.trim();
        
        if (role == "")
            return res.status(400).send({ status: false, message: "Please Enter role value" });

        //___________________________________email______________________________________

        if (!email)
            return res.status(400).send({ status: false, message: "email is mandatory" });
        if (typeof (email) != "string") {
            return res.status(400).send({ status: false, message: " please send proper email" })
        }
        email = clientsAllData.email = email.trim().toLowerCase()
        if (email == "")
            return res.status(400).send({ status: false, message: " please send proper email" })

        if (!validation.validateEmail(email))
            return res.status(400).send({ status: false, message: "Please provide valid email id" });
      
        let isClientExists = await clientModel.findOne({ email: email });

        if (isClientExists) {
            if (isClientExists.email == email)
                return res.status(400).send({ status: false, message: "email id already exist, send another email" });
        }
        //___________________________________password______________________________________
        if (!password)
            return res.status(400).send({ status: false, message: "password is mandatory" });

        if (typeof (password) != "string")
            return res.status(400).send({ status: false, message: "please provide password in string " });
            password = clientsAllData.password = password.trim();

        if (password == "")
            return res.status(400).send({ status: false, message: "Please provide password value" });

        if (!validation.validatePassword(password))
            return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });
      
        //Encrypting password
        let hashingPassword = bcrypt.hashSync(password, 10);
        clientsAllData.password = hashingPassword;

        //regex password
        // if (!validation.validatePassword(password))
        // return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });


        //___________________________________confirmPassword______________________________________

        if (!password)
            return res.status(400).send({ status: false, message: "password is mandatory" });

        if (!confirmPassword)
            return res.status(400).send({ status: false, message: "confirmPassword is mandatory" });

        if (typeof (confirmPassword) != "string")
            return res.status(400).send({ status: false, message: "please provide confirmPassword in string " });
            
            confirmPassword = clientsAllData.confirmPassword = confirmPassword.trim();

        if (confirmPassword == "")
            return res.status(400).send({ status: false, message: "Please provide confirmPassword value" });
        
        if (!validation.validatePassword(confirmPassword))
            return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });
      
        let passwordCompare = await bcrypt.compare(confirmPassword, clientsAllData.password)
        console.log(passwordCompare);
        if (!passwordCompare)
            return res.status(404).send({ status: false, message: "password doesn't match" });

        //Encrypting confirmpassword
        let hashingconfirmPassword = bcrypt.hashSync(password, 10);
        clientsAllData.confirmPassword = hashingconfirmPassword;

        //___________________________________telephoneNo______________________________________
        
        if (!telephoneNo)
            return res.status(400).send({ status: false, message: "telephoneNo is required" });

        if (typeof (telephoneNo) != "string")
            return res.status(400).send({ status: false, message: "telephoneNo should be in string" });
            

        if (telephoneNo == "")
            return res.status(400).send({ status: false, message: "Please Enter telephoneNo value" });

        if (!validation.validateTelephoneNo(telephoneNo))
            return res.status(400).send({ status: false, message: "please provide valid telephone No" });
            //___________________________________PhoneNo______________________________________
        if (!phoneNo)
            return res.status(400).send({ status: false, message: "phoneNo is required" });

        if (typeof (phoneNo) != "number")
            return res.status(400).send({ status: false, message: "phoneNo should be in number" });

        if (phoneNo == "")
            return res.status(400).send({ status: false, message: "Please Enter phoneNo value" });

        // if(!mobileNumberPattern.test(phoneNo))
        //     return res.status(400).send({ status: false, message: "please provide valid 10 digit Phone Number" });

        if (!validation.validateMobileNo(phoneNo))
            return res.status(400).send({ status: false, message: "please provide valid 10 digit Phone Number" });
        //___________________________________registeredBank______________________________________
        if (!registeredBank)
            return res.status(400).send({ status: false, message: "registeredBank is required" });

        if (typeof (registeredBank) != "string")
            return res.status(400).send({ status: false, message: "registeredBank should be in String" });

        registeredBank = clientsAllData.registeredBank = registeredBank.trim();
        
        if (registeredBank == "")
            return res.status(400).send({ status: false, message: "Please Enter registeredBank value" });

        //___________________________________branchDetails______________________________________
        

        let accNo = registeredAccountNo;

        if (!accNo)
            return res.status(400).send({ status: false, message: "accNo is required" });

        if (typeof (accNo) != "string")
            return res.status(400).send({ status: false, message: "accNo should be in String" });
            
        accNo = clientsAllData.accNo = accNo.trim();

        if (accNo == "")
            return res.status(400).send({ status: false, message: "Please Enter accNo value" });

        let ifsc = IFSCCode;
        if (!ifsc)
            return res.status(400).send({ status: false, message: "ifsc is required" });

        if (typeof (ifsc) != "string")
            return res.status(400).send({ status: false, message: "ifsc should be in String" });
            
            ifsc = clientsAllData.ifsc = ifsc.trim();

        if (ifsc == "")
            return res.status(400).send({ status: false, message: "Please Enter ifsc value" });
        


        if (typeof (throughEmail) != "boolean")
            return res.status(400).send({ status: false, message: "throughEmail should be in boolean" });

        if (typeof (throughCalls) != "boolean")
        return res.status(400).send({ status: false, message: "throughCalls should be in boolean" });

        let clientCreated = await clientModel.create(clientsAllData);
        return res.status(201).send({ status: true, message: "client got created ", data: clientCreated })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const loginClient = async (req, res) => {
    try {
        let loginData = req.body;
        let { email, password } = loginData;
        //________________________________________________________
        if (!email)
            return res.status(400).send({ status: false, message: "email is mandatory" });
        if (typeof (email) != "string") {
            return res.status(400).send({ status: false, message: " please send proper email" })
        }
        email = loginData.email = email.trim().toLowerCase();
        if (email == "")
            return res.status(400).send({ status: false, message: " please send proper email" })
        if (!validation.validateEmail(email))
            return res.status(400).send({ status: false, message: "Please provide valid email id" });
      
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
        //   let hashing = bcrypt.hashSync(password, 10);
        //   userData.password = hashing;
        //_____________________________________________________
        let isClientExists = await clientModel.findOne({ email: email });
        if (!isClientExists)
            return res.status(404).send({ status: false, message: "Email doesn't exists " })

        let passwordCompare = await bcrypt.compare(password, isClientExists.password)
        if (!passwordCompare)
            return res.status(404).send({ status: false, message: "password doesn't match" });
        console.log(isClientExists._id)
        let token = jwt.sign(
            { clientId: isClientExists._id, exp: Math.floor(Date.now() / 1000) + 864000 }, "aeccisecurity");
        let tokenInfo = { userId: isClientExists._id, token: token };


        return res.status(200).send({ status: true, message: "Admin login successfully",info:isClientExists, data: tokenInfo });
    }

    catch (error) {
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
  
  const  forgotPasswordClient =async (req, res) => {
    let forgotPassword = req.body;
    let {email,resetToken,resetTokenExpires} = forgotPassword;
    // Find forgotPassword by email (you should replace this with your database query)
    const foundforgotPassword = clientModel.findOne({email: email});
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
  
  const resetPasswordClient =async (req, res) => {
  
    let data = req.body;
    let { newPassword,confirmPassword } = data;
    let token = req.params.token;
    
    if (!newPassword)
    return res.status(400).send({ status: false, message: "newPassword is mandatory" });

    if (typeof (newPassword) != "string")
        return res.status(400).send({ status: false, message: "please provide newPassword in string " });
        newPassword = data.newPassword = newPassword.trim();

    if (newPassword == "")
        return res.status(400).send({ status: false, message: "Please provide newPassword value" });

    if (!validation.validatePassword(newPassword))
        return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting newPassword
    let hashingnewPassword = bcrypt.hashSync(newPassword, 10);
    newPassword = data.newPassword = hashingnewPassword;

    //___________________________________confirmPassword______________________________________

    if (!newPassword)
        return res.status(400).send({ status: false, message: "password is mandatory" });

    if (!confirmPassword)
        return res.status(400).send({ status: false, message: "confirmPassword is mandatory" });

    if (typeof (confirmPassword) != "string")
        return res.status(400).send({ status: false, message: "please provide confirmPassword in string " });
        
        confirmPassword = data.confirmPassword = confirmPassword.trim();

    if (confirmPassword == "")
        return res.status(400).send({ status: false, message: "Please provide confirmPassword value" });

    if (!validation.validatePassword(confirmPassword))
        return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    let passwordCompare = await bcrypt.compare(confirmPassword, data.newPassword)
    console.log(passwordCompare);
    if (!passwordCompare)
        return res.status(404).send({ status: false, message: "password doesn't match" });

    //Encrypting confirmpassword
    let hashingconfirmPassword = bcrypt.hashSync(confirmPassword, 10);
    confirmPassword = data.confirmPassword = hashingconfirmPassword;

    const user =await forgotPasswordModel.findOne({resetToken:token});
    console.log(user)
    // if (!user) return res.status(400).send({status:false, message: 'Invalid token' });
    if(user.resetTokenExpires < Date.now()) return res.status(400).send({status:false, message: 'Token expired'  });
   
  
    let some = await clientModel.findOneAndUpdate({email:user.email},{$set:{password:newPassword, confirmPassword:confirmPassword}},{new:true});
    console.log(some)
    return res.json({ message: 'Password reset successful' });
  }


  const apporveMail = async (req,res)=>{
      try {
      let emailData = req.body;
      let {email} = emailData;
      if (!email)
        return res.status(400).send({ status: false, message: "email is mandatory" });
        console.log(typeof(email))
      if(typeof(email) != "string"){
        return res.status(400).send({status: false, message:" please send proper email"})
      }
      email = emailData.email = email.trim().toLowerCase();
      if(email == "")
        return res.status(400).send({status: false, message:" please send proper email"})
      if(!validation.validateEmail(email)) return res.status(400).json({ valid: false, message: 'Invalid email.' });
        let foundData = await clientModel.findOne({email:email, approved:true})
        if(!foundData) return res.status(400).send({status: false, message:"Not Authorized to proceed !!!"})
        return res.status(200).send({status:true, message:"verified Email"})
  
      } catch (error) {
       return res.status(500).send({ status: false, message: error.message })
      }
  }




const logoutClient = async (req,res)=>{
    try{
        return res.status(200).send({ status: true, message: "logged out successfully !!!" });
    }
    catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getCompanyDetails = async (req, res) => {
    try {
        let clientId = req.params.clientId;
        if (!clientId)
            return res.status(400).send({ status: false, message: "Please Enter clientId value" });

        let clientCompanyDetails = await clientModel.findById(clientId).select({ _id: 0, companyName: 1, GSTNo: 1, IECNo: 1, websiteAdd: 1, address1: 1, address2: 1, address3: 1, address4: 1, country: 1, state: 1, pinCode: 1, businessCategory: 1, howDidYouKnowAboutUs: 1 });
        console.log(clientCompanyDetails)
        if (!clientCompanyDetails)
            return res.status(404).send({ status: false, message: "No data found" });

        return res.status(200).send({ status: true, message: "here's company Details", data: clientCompanyDetails });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getClientPersonalInfo = async (req, res) => {
    try {
        let clientId = req.params.clientId;
        if (!clientId)
            return res.status(400).send({ status: false, message: "Please Enter clientId value" });

        let clientPersonalDetails = await clientModel.findById(clientId).select({ _id: 0, title: 1, firstName: 1, surName: 1, role: 1, email: 1, telephoneNo: 1, phoneNo: 1, registeredBank: 1, branchDetails: 1 ,address1:1,address2:1,address3:1,address4:1,country:1,state:1,pinCode:1});
       console.log(clientPersonalDetails)
        if (!clientPersonalDetails)
            return res.status(404).send({ status: false, message: "No data found" });

        return res.status(200).send({ status: true, message: "here's personal Details", data: clientPersonalDetails });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const changePassword = async (req, res) => {
    try {
        let clientId = req.params.clientId;
        let changePasswordInfo = req.body;
        let { email,currentPassword, newPassword, confirmPassword } = changePasswordInfo;
        if (!clientId)
            return res.status(400).send({ status: false, message: "Please Enter clientId value" });
        //__________________________currentPassword__________________________
        if (!currentPassword)
            return res.status(400).send({ status: false, message: "currentPassword is required" });

        if (typeof (currentPassword) != "string")
            return res.status(400).send({ status: false, message: "currentPassword should be in String" });

        if (currentPassword == "")
            return res.status(400).send({ status: false, message: "Please Enter currentPassword value" });
        
            currentPassword = changePasswordInfo.currentPassword = currentPassword.trim();

        let isClientExists = await clientModel.findById(clientId);
        if (!isClientExists)
            return res.status(404).send({ status: false, message: "client doesn't exists " })
        email = changePasswordInfo.email = isClientExists.email;
        let passwordCompare = await bcrypt.compare(currentPassword, isClientExists.password)
        if (!passwordCompare)
            return res.status(404).send({ status: false, message: "password doesn't match" });
            let hashingCurrentPassword = bcrypt.hashSync(currentPassword, 10);
            changePasswordInfo.currentPassword = hashingCurrentPassword;
        
            //__________________________newPassword__________________________
        if (!newPassword)
            return res.status(400).send({ status: false, message: "newPassword is required" });

        if (typeof (newPassword) != "string")
            return res.status(400).send({ status: false, message: "newPassword should be in String" });
        
            newPassword = changePasswordInfo.newPassword = newPassword.trim();

        if (newPassword == "")
            return res.status(400).send({ status: false, message: "Please Enter newPassword value" });
            if(!validation.validatePassword(newPassword)) return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

        let hashingNewPassword = bcrypt.hashSync(newPassword, 10);
        changePasswordInfo.newPassword = hashingNewPassword;
        //__________________________confirmPassword__________________________
        if (!confirmPassword)
            return res.status(400).send({ status: false, message: "confirmPassword is required" });

        if (typeof (confirmPassword) != "string")
            return res.status(400).send({ status: false, message: "confirmPassword should be in String" });
            
            confirmPassword = changePasswordInfo.confirmPassword = confirmPassword.trim();

        if (confirmPassword == "")
            return res.status(400).send({ status: false, message: "Please Enter confirmPassword value" });
            if(!validation.validatePassword(confirmPassword)) return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

        let hashingConfirmPassword = bcrypt.hashSync(confirmPassword, 10);
        changePasswordInfo.confirmPassword = hashingConfirmPassword;
        //________________________________________________________________________

        let changePasswordData =await clientPasswordChangeModel.create(changePasswordInfo);

        return res.status(200).send({ status: true, message: "Our Team Will contact you and withing 24 hours you will be notified !!!", messageForfronted: `${isClientExists.companyName} has  send request for change password his email ${isClientExists.email}!!! `, data: changePasswordData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const commercialDir = async (req, res) => {
    try {
        let id = req.params.clientId;
        let isAvailable = await clientModel.findById(id);
        if (!isAvailable)
            return res.status(404).send({ status: false, message: "no data found " })
        if(isAvailable.selectMembership === "Digital User") return res.status(400).send({ status: false, message: "Members Only!!!" })
        let dirInfo = req.body;
        let { companyLogo, companyName, ownersName, email, establishmentYear, companyAdd, mobileNo, companyProduct, companyActivity } = dirInfo;

        //__________________________companyLogo_______________________
        companyLogo = dirInfo.companyLogo = req.image;

        //__________________________name_______________________
        if (!companyName)
            return res.status(400).send({ status: false, message: "companyName is required" });

        if (typeof (companyName) != "string")
            return res.status(400).send({ status: false, message: "companyName should be in String" });
        
        companyName = dirInfo.companyName = companyName.trim();
        
        if (companyName == "")
            return res.status(400).send({ status: false, message: "Please Enter companyName value" });

        //__________________________ownerName_______________________
        if (!ownersName)
            return res.status(400).send({ status: false, message: "ownersName is required" });

        if (typeof (ownersName) != "string")
            return res.status(400).send({ status: false, message: "ownersName should be in String" });
        
            ownersName = dirInfo.ownersName = ownersName.trim();

        if (ownersName == "")
            return res.status(400).send({ status: false, message: "Please Enter ownersName value" });


        //__________________________email_______________________
        if (!email)
            return res.status(400).send({ status: false, message: "email is required" });

        if (typeof (email) != "string")
            return res.status(400).send({ status: false, message: "email should be in String" });
            
            email = dirInfo.email = email.trim();

        if (email == "")
            return res.status(400).send({ status: false, message: "Please Enter email value" });

        if (!validation.validateEmail(email))
            return res.status(400).send({ status: false, message: "Please provide valid email id" });

        let isClientExists = await clientModel.findOne({ email: email });
        if (!isClientExists) return res.status(404).send({ status: false, message: "email not Found" });


        //__________________________est year_______________________
        if (!establishmentYear)
            return res.status(400).send({ status: false, message: "establishmentYear is required" });

        if (typeof (establishmentYear) != "string")
            return res.status(400).send({ status: false, message: "establishmentYear should be in string" });

            establishmentYear = dirInfo.establishmentYear = establishmentYear.trim();
            establishmentYear = Number(establishmentYear)

        if (establishmentYear == "")
            return res.status(400).send({ status: false, message: "Please Enter establishmentYear value" });
        //__________________________Mobile No_______________________
        if (!mobileNo)
            return res.status(400).send({ status: false, message: "mobileNo is required" });

        if (typeof (mobileNo) != "string")
            return res.status(400).send({ status: false, message: "mobileNo should be in string" });
        mobileNo = dirInfo.mobileNo = mobileNo.trim();
        mobileNo = Number(mobileNo)
        
        if (mobileNo == "")
            return res.status(400).send({ status: false, message: "Please Enter mobileNo value" });
        
        if (!validation.validateMobileNo(mobileNo))
            return res.status(400).send({ status: false, message: "please provide valid 10 digit Phone Number" });
        
        
        //__________________________companyAddress_______________________
        if (!companyAdd)
            return res.status(400).send({ status: false, message: "companyAdd is required" });

        if (typeof (companyAdd) != "string")
            return res.status(400).send({ status: false, message: "companyAdd should be in String" });
        
            companyAdd = dirInfo.companyAdd = companyAdd.trim();

        if (companyAdd == "")
            return res.status(400).send({ status: false, message: "Please Enter companyAdd value" });
        
        
        //__________________________product_______________________
        if (!companyProduct)
            return res.status(400).send({ status: false, message: "companyProduct is required" });

        if (typeof (companyProduct) != "string")
            return res.status(400).send({ status: false, message: "companyProduct should be in String" });
        
            companyProduct = dirInfo.companyProduct = companyProduct.trim();

        if (companyProduct == "")
            return res.status(400).send({ status: false, message: "Please Enter companyProduct value" });
        //__________________________activity_______________________
        if (!companyActivity)
            return res.status(400).send({ status: false, message: "companyActivity is required" });

        if (typeof (companyActivity) != "string")
            return res.status(400).send({ status: false, message: "companyActivity should be in String" });
        
            companyActivity = dirInfo.companyActivity = companyActivity.trim();

        if (companyActivity == "")
            return res.status(400).send({ status: false, message: "Please Enter companyActivity value" });


        let dirCreated = await comercialDirectory.create(dirInfo);
        return res.status(201).send({ status: true, message: "directory got created ", data: dirCreated });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

const updateCompanyDetails = async (req, res) => {
    try {
        let companyId = req.params.clientId;
        let updateData = req.body;
        let { isApproved,companyName,subCategory,  numberOfEmployees, clientId, businessCategory, howDidYouKnowAboutUs, telephoneNo, email, websiteAdd, address1, address2, country, state, pinCode, facebook, linkedIn, twitter } = updateData;
        let companyData = await clientModel.findById(companyId);
        if (!companyData) return res.status(404).send({ status: false, message: "no data found " })
        
        if (companyName) {
            if (typeof (companyName) != "string")
            return res.status(400).send({ status: false, message: "companyName should be in String" });
           
         companyName = updateData.companyName = companyName.trim();

        if (companyName == "")
            return res.status(400).send({ status: false, message: "Please Enter companyName value" });
        }
//-------------------------------------------------------------------------------------------
        if (numberOfEmployees) {
            if (typeof (numberOfEmployees) != "number")
            return res.status(400).send({ status: false, message: "numberOfEmployees should be in number" });
        
        if (numberOfEmployees == "")
            return res.status(400).send({ status: false, message: "Please Enter numberOfEmployees value" });
        }
//-------------------------------------------------------------------------------------------

        if (businessCategory) {
            if (typeof (businessCategory) != "string")
                return res.status(400).send({ status: false, message: "businessCategory should be in String" });
            
                businessCategory = updateData.businessCategory = businessCategory.trim();

            if (businessCategory == "")
                return res.status(400).send({ status: false, message: "Please Enter businessCategory value" });
        }

        if (subCatagory) {
            if (typeof (subCatagory) != "string")
                return res.status(400).send({ status: false, message: "subCatagory should be in String" });

            if (subCatagory == "")
                return res.status(400).send({ status: false, message: "Please Enter subCatagory value" });
        }

        if (howDidYouKnowAboutUs) {
            if (typeof (howDidYouKnowAboutUs) != "string")
                return res.status(400).send({ status: false, message: "howDidYouKnowAboutUs should be in String" });
            howDidYouKnowAboutUs = updateData.howDidYouKnowAboutUs = howDidYouKnowAboutUs.trim();

            if (howDidYouKnowAboutUs == "")
                return res.status(400).send({ status: false, message: "Please Enter howDidYouKnowAboutUs value" });
        }

        if (telephoneNo) {
            if (typeof (telephoneNo) != "string")
                return res.status(400).send({ status: false, message: "telephoneNo should be in string" });

            if (telephoneNo == "")
                return res.status(400).send({ status: false, message: "Please Enter telephoneNo value" });
        }

        if (email) {
            if (typeof (email) != "string") {
                return res.status(400).send({ status: false, message: " please send proper email" })
            }
            email = updateData.email = email.trim().toLowerCase()
            if (email == "")
                return res.status(400).send({ status: false, message: " please send proper email" })
    
            if (!validation.validateEmail(email))
                return res.status(400).send({ status: false, message: "Please provide valid email id" });
          
            let isClientExists = await clientModel.findOne({ email: email });
    
            if (isClientExists) {
                if (isClientExists.email == email)
                    return res.status(400).send({ status: false, message: "email id already exist, send another email" });
            }
        }

        if (websiteAdd) {
        if (typeof (websiteAdd) != "string") 
            return res.status(400).send({ status: false, message: "websiteAdd should be in String" });
         
        websiteAdd = updateData.websiteAdd = websiteAdd.trim();

        if (websiteAdd == "")
            return res.status(400).send({ status: false, message: "Please Enter websiteAdd value" });

        if(!validation.validateWebsite(websiteAdd))
            return res.status(400).send({ status: false, message: "please provide valid website" });

        }

        if (address1) {
            if (typeof (address1) != "string")
                return res.status(400).send({ status: false, message: "address1 should be in String" });
            
            address1 = updateData.address1 = address1.trim();

            if (address1 == "")
                return res.status(400).send({ status: false, message: "Please Enter address1 value" });
        }

        if (address2) {
            if (typeof (address2) != "string")
                return res.status(400).send({ status: false, message: "address2 should be in String" });
            
            address2 = updateData.address2 = address2.trim();

            if (address2 == "")
                return res.status(400).send({ status: false, message: "Please Enter address2 value" });
        }

        if (country) {
            if (typeof (country) != "string")
                return res.status(400).send({ status: false, message: "country should be in String" });
            country = updateData.country = country.trim();

            if (country == "")
                return res.status(400).send({ status: false, message: "Please Enter country value" });
        }

        if (state) {
            if (typeof (state) != "string")
                return res.status(400).send({ status: false, message: "state should be in String" });
                country = updateData.country = country.trim();

            if (state == "")
                return res.status(400).send({ status: false, message: "Please Enter state value" });
        }

        if (pinCode) {
            if (typeof (pinCode) != "number")
            return res.status(400).send({ status: false, message: "pinCode should be in number" });
        
            if (pinCode == "")
                return res.status(400).send({ status: false, message: "Please Enter pinCode value" });
            
            if (!validation.validatePincode(pinCode)) return res.status(400).send({ status: false, message: "please provide valid  pincode" })
        }


        if (facebook) {
            if (typeof (facebook) != "string")
                return res.status(400).send({ status: false, message: "facebook should be in String" });
            facebook = updateData.facebook = facebook.trim();

            if (facebook == "")
                return res.status(400).send({ status: false, message: "Please Enter facebook value" });
            
            if (!validation.validateFacebook(facebook)) 
                return res.status(400).send({ status: false, message: "please provide valid  facebook link" })
            
        }

        if (linkedIn) {
            if (typeof (linkedIn) != "string")
                return res.status(400).send({ status: false, message: "linkedIn should be in String" });
            linkedIn = updateData.linkedIn = linkedIn.trim();

            if (linkedIn == "")
                return res.status(400).send({ status: false, message: "Please Enter linkedIn value" });
        
            if (!validation.validateLinkedIn(linkedIn)) 
                return res.status(400).send({ status: false, message: "please provide valid  linkeIn link" })
            
            }

        if (twitter) {
            if (typeof (twitter) != "string")
                return res.status(400).send({ status: false, message: "twitter should be in String" });
            twitter = updateData.twitter = twitter.trim();

            if (twitter == "")
                return res.status(400).send({ status: false, message: "Please Enter twitter value" });
        
            if (!validation.validateTwitter(twitter)) 
                return res.status(400).send({ status: false, message: "please provide valid  twitter link" })
            
        }
        clientId = updateData.clientId = companyId;
        let createdData = await companyUpdateModel.create(updateData);
        // let updatedData = await clientModel.findByIdAndUpdate({ companyId }, { $set: { companyName: companyName, numberOfEmployees: numberOfEmployees, businessCategory: businessCategory, howDidYouKnowAboutUs: howDidYouKnowAboutUs, telephoneNo: telephoneNo, email: email, websiteAdd: websiteAdd, address1: address1, address2: address2, country: country, state: state, pinCode: pinCode, facebook: facebook, twitter: twitter, linkedIn: linkedIn } }, { new: true });
        return res.status(200).send({ status: true, message: "data will update within 24 hours !!!"})


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}


const updatePersonalDetails = async (req, res) => {
    try {
        let companyId = req.params.clientId;
        let updateData = req.body;
        let { isApproved, title, firstName, surName, role, phoneNo, address1, address2, country, state, pinCode } = updateData;
        let companyData = await clientModel.findById(companyId);
        if (!companyData) return res.status(404).send({ status: false, message: "no data found " })
        if (title) {
            if (typeof (title) != "string")
                return res.status(400).send({ status: false, message: "title should be in String" });
            
            title = updateData.title = title.trim();

            if (title == "")
                return res.status(400).send({ status: false, message: "Please Enter title value" });
        }
        if (firstName) {
            if (typeof (firstName) != "string")
                return res.status(400).send({ status: false, message: "firstName should be in String" });
            
            firstName = updateData.firstName = firstName.trim();

            if (firstName == "")
                return res.status(400).send({ status: false, message: "Please Enter firstName value" });
        }
        if (surName) {
            if (typeof (surName) != "string")
                return res.status(400).send({ status: false, message: "surName should be in String" });
        
            surName = updateData.surName = surName.trim();

            if (surName == "")
                return res.status(400).send({ status: false, message: "Please Enter surName value" });
        }

        if (role) {
            if (typeof (role) != "string")
                return res.status(400).send({ status: false, message: "role should be in String" });
            role = updateData.role = role.trim();

            if (role == "")
                return res.status(400).send({ status: false, message: "Please Enter role value" });
        }

        if (phoneNo) {
            if (typeof (phoneNo) != "number")
            return res.status(400).send({ status: false, message: "phoneNo should be in number" });

        if (phoneNo == "")
            return res.status(400).send({ status: false, message: "Please Enter phoneNo value" });

        if (!validation.validateMobileNo(phoneNo))
            return res.status(400).send({ status: false, message: "please provide valid 10 digit Phone Number" });
        }

        if (address1) {
            if (typeof (address1) != "string")
                return res.status(400).send({ status: false, message: "address1 should be in String" });
            
            address1 = updateData.address1 = address1.trim();

            if (address1 == "")
                return res.status(400).send({ status: false, message: "Please Enter address1 value" });
        }

        if (address2) {
            if (typeof (address2) != "string")
                return res.status(400).send({ status: false, message: "address2 should be in String" });
            
            address2 = updateData.address2 = address2.trim();

            if (address2 == "")
                return res.status(400).send({ status: false, message: "Please Enter address2 value" });
        }

        if (country) {
            if (typeof (country) != "string")
                return res.status(400).send({ status: false, message: "country should be in String" });
            country = updateData.country = country.trim();

            if (country == "")
                return res.status(400).send({ status: false, message: "Please Enter country value" });
        }

        if (state) {
            if (typeof (state) != "string")
                return res.status(400).send({ status: false, message: "state should be in String" });
                country = updateData.country = country.trim();

            if (state == "")
                return res.status(400).send({ status: false, message: "Please Enter state value" });
        }

        if (pinCode) {
            if (typeof (pinCode) != "number")
            return res.status(400).send({ status: false, message: "pinCode should be in number" });
        
            if (pinCode == "")
                return res.status(400).send({ status: false, message: "Please Enter pinCode value" });
            
            if (!validation.validatePincode(pinCode)) return res.status(400).send({ status: false, message: "please provide valid  pincode" })
        }
        // let updatedData = await clientModel.findByIdAndUpdate({ companyId }, { $set: { title: title, firstName: firstName, role: role, phoneNo: phoneNo, address1: address1, address2: address2, address3: address3, address4: address4, country: country, state: state, pinCode: pinCode } }, { new: true });
        // return res.status(200).send({ status: true, message: "data updated successfully", data: updatedData })
        clientId = updateData.clientId = companyId;
        let createdData = await clientPersonalModel.create(updateData);
        // let updatedData = await clientModel.findByIdAndUpdate({ companyId }, { $set: { companyName: companyName, numberOfEmployees: numberOfEmployees, businessCategory: businessCategory, howDidYouKnowAboutUs: howDidYouKnowAboutUs, telephoneNo: telephoneNo, email: email, websiteAdd: websiteAdd, address1: address1, address2: address2, country: country, state: state, pinCode: pinCode, facebook: facebook, twitter: twitter, linkedIn: linkedIn } }, { new: true });
        return res.status(200).send({ status: true, message: "data will update within 24 hours !!!"})

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const marketingDetails = async (req,res)=>{
    try {
        let companyId = req.params.clientId;
        let marketingInfo = req.body;
        let {companyName,website,companyEmail,telephone,phone,emails,posts,calls,campaigns,awards,weeklyBullets, eventUpdates,magzine,newsLetters,sponsorship}= marketingInfo;
        let companyData = await clientModel.findById(companyId);
        if (!companyData) return res.status(404).send({ status: false, message: "no data found " })
        companyName = marketingInfo.companyName = companyData.companyName;
        website = marketingInfo.website = companyData.websiteAdd;
        telephone = marketingInfo.telephone = companyData.telephoneNo;
        phone= marketingInfo.phone = companyData.phoneNo;
        companyEmail = marketingInfo.companyEmail = companyData.email;
        if (emails) {
            if (typeof (emails) != "boolean")
                return res.status(400).send({ status: false, message: "emails should be in boolean" });
        }
        if (posts) {
            if (typeof (posts) != "boolean")
                return res.status(400).send({ status: false, message: "posts should be in boolean" });
        }
        if (calls) {
            if (typeof (calls) != "boolean")
                return res.status(400).send({ status: false, message: "calls should be in boolean" });
        }
        if (campaigns) {
            if (typeof (campaigns) != "boolean")
                return res.status(400).send({ status: false, message: "campaigns should be in boolean" });
        }
        if (awards) {
            if (typeof (awards) != "boolean")
                return res.status(400).send({ status: false, message: "awards should be in boolean" });
        }
        if (weeklyBullets) {
            if (typeof (weeklyBullets) != "boolean")
                return res.status(400).send({ status: false, message: "weeklyBullets should be in boolean" });
        }
        if (eventUpdates) {
            if (typeof (eventUpdates) != "boolean")
                return res.status(400).send({ status: false, message: "eventUpdates should be in boolean" });
        }
        if (sponsorship) {
            if (typeof (sponsorship) != "boolean")
                return res.status(400).send({ status: false, message: "sponsorship should be in boolean" });
        }
        if (magzine) {
            if (typeof (magzine) != "boolean")
                return res.status(400).send({ status: false, message: "magzine should be in boolean" });
        }
        if (newsLetters) {
            if (typeof (newsLetters) != "boolean")
                return res.status(400).send({ status: false, message: "newsLetters should be in boolean" });
        }
        
        let dataCreated = await clientMarketingModel.create(marketingInfo);
        res.status(200).send({status:true, message:"marketing Data", data:dataCreated})

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = { createClient, loginClient,forgotPasswordClient,resetPasswordClient,apporveMail, logoutClient, getCompanyDetails, getClientPersonalInfo, changePassword, commercialDir, updateCompanyDetails, updatePersonalDetails,marketingDetails };