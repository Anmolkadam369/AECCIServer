let mongoose = require('mongoose')
const clientModel = require('../../models/clients/clientModel');
const bcrypt = require('bcrypt');
const clientPasswordChangeModel = require('../../models/clients/clientPasswordChangeModel');
const comercialDirectory = require('../../models/clients/comercialDirectory');
const companyUpdateModel = require('../../models/clients/clientCompanyUpdateModel');
const personalUpdateModel = require('../../models/clients/clientPersonalModel');

const jwt = require("jsonwebtoken");
const clientPersonalModel = require('../../models/clients/clientPersonalModel');
const validation = require("../../validations/validation")
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
         
            numberOfEmployees = clientsAllData.numberOfEmployees = numberOfEmployees.trim();

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
        
        if (!validation.validatePincode(pinCode)) return res.status(400).send({ status: false, message: "please provide valid  pincode" })
        
        if (typeof (pinCode) != "number")
            return res.status(400).send({ status: false, message: "pinCode should be in number" });

        if (pinCode == "")
            return res.status(400).send({ status: false, message: "Please Enter pinCode value" });

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
            return res.status(400).send({ status: false, message: "please provide valid first name " });
      

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

        if (typeof (telephoneNo) != "number")
            return res.status(400).send({ status: false, message: "telephoneNo should be in number" });
            

        if (telephoneNo == "")
            return res.status(400).send({ status: false, message: "Please Enter telephoneNo value" });

        //___________________________________PhoneNo______________________________________
        if (!phoneNo)
            return res.status(400).send({ status: false, message: "phoneNo is required" });

        if (typeof (phoneNo) != "number")
            return res.status(400).send({ status: false, message: "phoneNo should be in number" });

        if (phoneNo == "")
            return res.status(400).send({ status: false, message: "Please Enter phoneNo value" });

        // if (!validation.validateMobileNo(phoneNo))
        //     return res.status(400).send({ status: false, message: "please provide valid 10 digit Phone Number" });
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

        let branch = branchName;

        if (!branch)
            return res.status(400).send({ status: false, message: "branch is required" });

        if (typeof (branch) != "string")
            return res.status(400).send({ status: false, message: "branch should be in String" });
        branch = clientsAllData.branch = branch.trim();

        if (branch == "")
            return res.status(400).send({ status: false, message: "Please Enter branch value" });
        
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
            { clientId: isClientExists._id, exp: Math.floor(Date.now() / 1000) + 86400 }, "aeccisecurity");
        let tokenInfo = { userId: isClientExists._id, token: token };


        return res.status(200).send({ status: true, message: "Admin login successfully",info:isClientExists, data: tokenInfo });
    }

    catch (error) {
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

        let clientPersonalDetails = await clientModel.findById(clientId).select({ _id: 0, title: 1, firstName: 1, surName: 1, role: 1, email: 1, password: 1, confirmPassword: 1, telephoneNo: 1, phoneNo: 1, registeredBank: 1, branchDetails: 1 });
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

        if (newPassword == "")
            return res.status(400).send({ status: false, message: "Please Enter newPassword value" });

        let hashingNewPassword = bcrypt.hashSync(newPassword, 10);
        changePasswordInfo.newPassword = hashingNewPassword;
        //__________________________confirmPassword__________________________
        if (!confirmPassword)
            return res.status(400).send({ status: false, message: "confirmPassword is required" });

        if (typeof (confirmPassword) != "string")
            return res.status(400).send({ status: false, message: "confirmPassword should be in String" });

        if (confirmPassword == "")
            return res.status(400).send({ status: false, message: "Please Enter confirmPassword value" });

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

        if (companyName == "")
            return res.status(400).send({ status: false, message: "Please Enter companyName value" });

        //__________________________ownerName_______________________
        if (!ownersName)
            return res.status(400).send({ status: false, message: "ownersName is required" });

        if (typeof (ownersName) != "string")
            return res.status(400).send({ status: false, message: "ownersName should be in String" });

        if (ownersName == "")
            return res.status(400).send({ status: false, message: "Please Enter ownersName value" });


        //__________________________email_______________________
        if (!email)
            return res.status(400).send({ status: false, message: "email is required" });

        if (typeof (email) != "string")
            return res.status(400).send({ status: false, message: "email should be in String" });

        if (email == "")
            return res.status(400).send({ status: false, message: "Please Enter email value" });

        let isClientExists = await clientModel.findOne({ email: email });
        if (!isClientExists) return res.status(404).send({ status: false, message: "email not Found" });


        //__________________________est year_______________________
        if (!establishmentYear)
            return res.status(400).send({ status: false, message: "establishmentYear is required" });

        if (typeof (establishmentYear) != "string")
            return res.status(400).send({ status: false, message: "establishmentYear should be in string" });

        if (establishmentYear == "")
            return res.status(400).send({ status: false, message: "Please Enter establishmentYear value" });
        //__________________________Mobile No_______________________
        if (!mobileNo)
            return res.status(400).send({ status: false, message: "mobileNo is required" });

        if (typeof (mobileNo) != "string")
            return res.status(400).send({ status: false, message: "mobileNo should be in string" });

        if (mobileNo == "")
            return res.status(400).send({ status: false, message: "Please Enter mobileNo value" });
        //__________________________companyAddress_______________________
        if (!companyAdd)
            return res.status(400).send({ status: false, message: "companyAdd is required" });

        if (typeof (companyAdd) != "string")
            return res.status(400).send({ status: false, message: "companyAdd should be in String" });

        if (companyAdd == "")
            return res.status(400).send({ status: false, message: "Please Enter companyAdd value" });
        //__________________________product_______________________
        if (!companyProduct)
            return res.status(400).send({ status: false, message: "companyProduct is required" });

        if (typeof (companyProduct) != "string")
            return res.status(400).send({ status: false, message: "companyProduct should be in String" });

        if (companyProduct == "")
            return res.status(400).send({ status: false, message: "Please Enter companyProduct value" });
        //__________________________activity_______________________
        if (!companyActivity)
            return res.status(400).send({ status: false, message: "companyActivity is required" });

        if (typeof (companyActivity) != "string")
            return res.status(400).send({ status: false, message: "companyActivity should be in String" });

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
        let { isApproved,companyName, numberOfEmployees, clientId, businessCategory, howDidYouKnowAboutUs, telephoneNo, email, websiteAdd, address1, address2, country, state, pinCode, facebook, linkedIn, twitter } = updateData;
        let companyData = await clientModel.findById(companyId);
        if (!companyData) return res.status(404).send({ status: false, message: "no data found " })
        if (companyName) {
            if (typeof (companyName) != "string")
                return res.status(400).send({ status: false, message: "companyName should be in String" });

            if (companyName == "")
                return res.status(400).send({ status: false, message: "Please Enter companyName value" });
        }
        if (numberOfEmployees) {
            if (typeof (numberOfEmployees) != "string")
                return res.status(400).send({ status: false, message: "numberOfEmployees should be in String" });

            if (numberOfEmployees == "")
                return res.status(400).send({ status: false, message: "Please Enter numberOfEmployees value" });
        }
        if (businessCategory) {
            if (typeof (businessCategory) != "string")
                return res.status(400).send({ status: false, message: "businessCategory should be in String" });

            if (businessCategory == "")
                return res.status(400).send({ status: false, message: "Please Enter businessCategory value" });
        }

        // if (subCatagory) {
        //     if (typeof (subCatagory) != "string")
        //         return res.status(400).send({ status: false, message: "subCatagory should be in String" });

        //     if (subCatagory == "")
        //         return res.status(400).send({ status: false, message: "Please Enter subCatagory value" });
        // }

        if (howDidYouKnowAboutUs) {
            if (typeof (howDidYouKnowAboutUs) != "string")
                return res.status(400).send({ status: false, message: "howDidYouKnowAboutUs should be in String" });

            if (howDidYouKnowAboutUs == "")
                return res.status(400).send({ status: false, message: "Please Enter howDidYouKnowAboutUs value" });
        }

        if (telephoneNo) {
            if (typeof (telephoneNo) != "number")
                return res.status(400).send({ status: false, message: "telephoneNo should be in number" });

            if (telephoneNo == "")
                return res.status(400).send({ status: false, message: "Please Enter telephoneNo value" });
        }

        if (email) {
            if (typeof (email) != "string")
                return res.status(400).send({ status: false, message: "email should be in String" });

            if (email == "")
                return res.status(400).send({ status: false, message: "Please Enter email value" });
        }

        if (websiteAdd) {
            if (typeof (websiteAdd) != "string")
                return res.status(400).send({ status: false, message: "websiteAdd should be in String" });

            if (websiteAdd == "")
                return res.status(400).send({ status: false, message: "Please Enter websiteAdd value" });
        }

        if (address1) {
            if (typeof (address1) != "string")
                return res.status(400).send({ status: false, message: "address1 should be in String" });

            if (address1 == "")
                return res.status(400).send({ status: false, message: "Please Enter address1 value" });
        }

        if (address2) {
            if (typeof (address2) != "string")
                return res.status(400).send({ status: false, message: "address2 should be in String" });

            if (address2 == "")
                return res.status(400).send({ status: false, message: "Please Enter address2 value" });
        }

        if (country) {
            if (typeof (country) != "string")
                return res.status(400).send({ status: false, message: "country should be in String" });

            if (country == "")
                return res.status(400).send({ status: false, message: "Please Enter country value" });
        }

        if (state) {
            if (typeof (state) != "string")
                return res.status(400).send({ status: false, message: "state should be in String" });

            if (state == "")
                return res.status(400).send({ status: false, message: "Please Enter state value" });
        }

        if (pinCode) {
            if (typeof (pinCode) != "number")
                return res.status(400).send({ status: false, message: "pinCode should be in number" });

            if (pinCode == "")
                return res.status(400).send({ status: false, message: "Please Enter pinCode value" });
        }


        if (facebook) {
            if (typeof (facebook) != "string")
                return res.status(400).send({ status: false, message: "facebook should be in String" });

            if (facebook == "")
                return res.status(400).send({ status: false, message: "Please Enter facebook value" });
        }

        if (linkedIn) {
            if (typeof (linkedIn) != "string")
                return res.status(400).send({ status: false, message: "linkedIn should be in String" });

            if (linkedIn == "")
                return res.status(400).send({ status: false, message: "Please Enter linkedIn value" });
        }

        if (twitter) {
            if (typeof (twitter) != "string")
                return res.status(400).send({ status: false, message: "twitter should be in String" });

            if (twitter == "")
                return res.status(400).send({ status: false, message: "Please Enter twitter value" });
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

            if (title == "")
                return res.status(400).send({ status: false, message: "Please Enter title value" });
        }
        if (firstName) {
            if (typeof (firstName) != "string")
                return res.status(400).send({ status: false, message: "firstName should be in String" });

            if (firstName == "")
                return res.status(400).send({ status: false, message: "Please Enter firstName value" });
        }
        if (surName) {
            if (typeof (surName) != "string")
                return res.status(400).send({ status: false, message: "surName should be in String" });

            if (surName == "")
                return res.status(400).send({ status: false, message: "Please Enter surName value" });
        }

        if (role) {
            if (typeof (role) != "string")
                return res.status(400).send({ status: false, message: "role should be in String" });

            if (role == "")
                return res.status(400).send({ status: false, message: "Please Enter role value" });
        }

        if (phoneNo) {
            if (typeof (phoneNo) != "number")
                return res.status(400).send({ status: false, message: "phoneNo should be in number" });

            if (phoneNo == "")
                return res.status(400).send({ status: false, message: "Please Enter phoneNo value" });
        }

        if (address1) {
            if (typeof (address1) != "string")
                return res.status(400).send({ status: false, message: "address1 should be in String" });

            if (address1 == "")
                return res.status(400).send({ status: false, message: "Please Enter address1 value" });
        }

        if (address2) {
            if (typeof (address2) != "string")
                return res.status(400).send({ status: false, message: "address2 should be in String" });

            if (address2 == "")
                return res.status(400).send({ status: false, message: "Please Enter address2 value" });
        }

        if (country) {
            if (typeof (country) != "string")
                return res.status(400).send({ status: false, message: "country should be in String" });

            if (country == "")
                return res.status(400).send({ status: false, message: "Please Enter country value" });
        }

        if (state) {
            if (typeof (state) != "string")
                return res.status(400).send({ status: false, message: "state should be in String" });

            if (state == "")
                return res.status(400).send({ status: false, message: "Please Enter state value" });
        }

        if (pinCode) {
            if (typeof (pinCode) != "number")
                return res.status(400).send({ status: false, message: "pinCode should be in number" });

            if (pinCode == "")
                return res.status(400).send({ status: false, message: "Please Enter pinCode value" });
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






module.exports = { createClient, loginClient,logoutClient, getCompanyDetails, getClientPersonalInfo, changePassword, commercialDir, updateCompanyDetails, updatePersonalDetails };