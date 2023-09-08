const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const superAdminController =require("../controllers/superAdminController");
const administrationController = require("../controllers/administrationController");
const employeeJdController = require("../controllers/employeeJdController");
const clientController = require("../controllers/clients/clientController")
const clientEmailController = require("../controllers/clients/clientEmailController");
const clientGSTNoController = require("../controllers/clients/clientGSTNoController");
const recomendationLetterController= require("../controllers/clients/recomendationletterController");
const masterController = require("../controllers/master/masterController")
const wingsController = require("../controllers/clients/wingsController")
const memberShipServices = require("../controllers/memberShipServices");
const B2BRegistration = require("../controllers/clients/clientB2BController")

const auth = require("../middleware/auth");
const aws = require("../middleware/aws")
const clientAuth = require("../middleware/clientAuth")
const adminAuth = require("../middleware/adminAuth")
const superAdminAuth = require("../middleware/superadminAuth")

// const auth = require('../middlewares/auth')
//const aws = require("../middlewares/awsLink");

router.get("/test-me", function(req,res){
    const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
console.log("some")
console.log(`Database Host: ${dbHost}`);
console.log(`Database Port: ${dbPort}`);
console.log(`api key ${process.env.API_KEY}`)

    res.send({status: false, message:"just testing", some:dbPort})
})

//MASTER
router.get("/loginMaster", masterController.loginMaster);

//ADMIN
router.post("/registerAdmin", aws.awsLinkProfile, adminController.registerAdmin);
router.post("/loginAdmin", adminController.loginAdmin);
router.get("/getAdminDetails/:adminId",adminAuth.authentication,adminAuth.authorization, adminController.getAdminDetails)  //myaccount
router.get("/getCompanyDetailsForAdmin/:adminId",adminAuth.authentication,adminAuth.authorization,adminController.getCompanyDetailsForAdmin)
router.post("/filledByAdmin/:adminId/:companyId",adminAuth.authentication,adminAuth.authorization, adminController.filledByAdmin) 
router.post("/adminApprovedComDir/:adminId/:comDirId",adminAuth.authentication,adminAuth.authorization, adminController.adminApprovedComDir);
router.post("/adminApprovedRequest/:adminId/:changePasswordId",adminAuth.authentication,adminAuth.authorization, adminController.adminChangedPassword);
router.get("/getCompanyUpdateForAdmin/:adminId",adminAuth.authentication,adminAuth.authorization,adminController.getCompanyUpdateForAdmin);
router.get("/getPersonalUpdateForAdmin/:adminId",adminAuth.authentication,adminAuth.authorization,adminController.getPersonalUpdateForAdmin)
router.put("/updateCompany/:adminId/:updateCompanyId",adminAuth.authentication,adminAuth.authorization,adminController.updateCompany)
router.put("/updatePersonal/:adminId/:updatePersonalId",adminAuth.authentication,adminAuth.authorization, adminController.updatePersonal)

//SUPERADMIN
router.post("/registerSuperAdmin", aws.awsLinkProfile,superAdminController.registerSuperAdmin);
router.post("/loginSuperAdmin",superAdminController.loginSuperAdmin);
router.get ("/getSuperAdminDetails/:superAdminId",superAdminAuth.authentication,superAdminAuth.authorization,superAdminController.getSuperAdminDetails);
router.get ("/getCompanyDetailsForsuperAdmin/:superAdminId",superAdminAuth.authentication,superAdminAuth.authorization,superAdminController.getCompanyDetailsForsuperAdmin);
router.post ("/filledBysuperAdmin/:superAdminId/:companyId",superAdminAuth.authentication,superAdminAuth.authorization,superAdminController.filledBysuperAdmin);


//client 
router.post("/createClient", clientController.createClient);
router.post("/loginClient", clientController.loginClient);
router.post ("/logoutClient/:clientId", clientAuth.authentication,clientAuth.authorization, clientController.logoutClient)
router.get("/getCompanyDetails/:clientId",clientAuth.authentication,clientAuth.authorization,clientController.getCompanyDetails);
router.get("/getpersonalinfo/:clientId",clientAuth.authentication,clientAuth.authorization,clientController.getClientPersonalInfo);
router.post("/changePassword/:clientId",clientAuth.authentication,clientAuth.authorization,clientController.changePassword);
router.post("/commercialDir/:clientId" ,aws.awsLinkProfile, clientAuth.authentication,clientAuth.authorization,clientController.commercialDir);
router.put("/updateCompanyDetails/:clientId",clientAuth.authentication,clientAuth.authorization, clientController.updateCompanyDetails);
router.put("/updatePersonalDetalis/:clientId",clientAuth.authentication,clientAuth.authorization, clientController.updatePersonalDetails);
router.get("/imagePreview/*", aws.imagePreview)


//clientEmail
router.post("/createClientEmail", clientEmailController.createClientEmail);

// clientGSTNo/IEC CODE NO
router.post("/inputNumberCreated", clientGSTNoController.inputNumberCreated); 

//recommendationLetter
router.post("/createRecommendationLetter/:companyId",aws.recoDoc,recomendationLetterController.createRecomendationLetter);
router.get("/viewData/:id", recomendationLetterController.viewData);
router.put("/updateData/:id", recomendationLetterController.updateData);

// router.all("*/", async(req,res)=>{
    // return res.status(400).send({status: false, message:"invalid path"})
// })

//WINGS
router.post("/createExportWing/:companyId",aws.awsDoc, wingsController.createExportWing);
router.post("/captcha",wingsController.captcha);
router.post("/verify", wingsController.verify);
router.get("/previewData/:wingsId",wingsController.previewData);
// router.post("/getTickectNo/:wingsId", wingsController.generateTicketNo)
router.post("/sendMail/:companyId/:wingsId",wingsController.sendingMailToUser)

//Client B2B collaboration

router.post ("/clientB2BColloboration/:clientId", B2BRegistration.clientB2BColloboration )


//MEMBER SHIP SERVICES
router.post("/membershipservices/:clientId", memberShipServices.memberShipServices)




//Employee
router.post("/registerAdministration",aws.awsLinkProfile,aws.awsLinkEmployeeSignature,administrationController.registerAdministration);
router.post("/loginAdministration", administrationController.loginAdministration)
router.post("/loginHR", administrationController.loginHR)
router.get("/getMyaccount/:employeeId", auth.authentication,administrationController.getMyaccount);
router.post ("/administration/forgotPassword", administrationController.forgotPasword)
router.get ("/administration/resetPassword/:token", administrationController.resetPassword)

// JD 
//for first Time clicking
router.post("/createEmployeeJd/:employeeId",auth.authentication,auth.authorization, employeeJdController.createEmployeeJd );
//for next Line of JD
// router.post("/createAnotherOne/:employeeId",auth.authentication,auth.authorization,employeeJdController.createEmployeeJdForNextTime )
router.post("/requestForExtend/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.requestForExtend);
router.post ("/logOutJd/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.logOut);
// router.post("/thirtyMin/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.thirtyMinTimesUp);
// router.post("/fifteenMin/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.fifteenMinTimesUp);

//HR 
router.post("/giveDataOfEmployee/:employeeId",auth.authentication,auth.authorizationForHr,employeeJdController.giveDataOfEmployee)
router.get("/getAllEmpData/:employeeId",auth.authentication,auth.authorizationForHr,administrationController.getEmpData);
router.put("/updateInfo/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr, administrationController.updateInfo);
// router.post("/extendedTime/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.extendTime);
router.post("/extendByHr/:employeeId",auth.authentication,auth.authorizationForHr,employeeJdController.extendByHr)
router.get("/getWantedAdministrationList/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.getWantedAdministrationList);
router.get("/getWantedListByDate/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.getWantedListByDate)
router.get("/getExtendData/:employeeId", auth.authentication, auth.authorizationForHr,employeeJdController.getExtendData); 
router.delete("/deleteEmp/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,administrationController.deleteEmployee)

// const payment = require('../controllers/practice');
// router.post('/create-payment-intent', payment.createPaymentIntent)
module.exports = router;






//Employee
// router.post("/registerAdministration",aws.awsLinkProfile,aws.awsLinkEmployeeSignature, administrationController.registerAdministration);
// router.post("/loginAdministration", administrationController.loginAdministration)
// router.post("/loginHR", administrationController.loginHR)
// router.get("/getMyaccount/:employeeId", auth.authentication,administrationController.getMyaccount);
// // router.get("/getWantedAdministrationList/:employeeId", administrationController.getWantedAdministrationList);
// router.put("/updateInfo/:paramsId", administrationController.updateInfo);
// // router.delete("/deleteEmployee/:employeeId", administrationController.deleteEmployee);

// // NOT DONE YET
// router.post ("/administration/forgotPassword", administrationController.forgotPasword)
// router.get ("/administration/resetPassword/:token", administrationController.resetPassword)

// // JD 
// //for first Time clicking
// router.post("/createEmployeeJd/:employeeId",auth.authentication,auth.authorization, employeeJdController.createEmployeeJd );
// //for next Line of JD
// router.post("/createAnotherOne/:employeeId",auth.authentication,auth.authorization,employeeJdController.createEmployeeJdForNextTime )
// router.post ("/logOutJd/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.logOut);
// router.post("/thirtyMin/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.thirtyMinTimesUp);
// router.post("/fifteenMin/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.fifteenMinTimesUp);

 

// //HR 
// router.post("/extendedTime/:employeeId/:normalEmployee",auth.authentication,auth.authorization,employeeJdController.extendTime);
// // router.get("/getWantedAdministrationList/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.getWantedAdministrationList);
// // router.get("/getWantedListByDate/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.getWantedListByDate)

