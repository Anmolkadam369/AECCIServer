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

// const auth = require('../middlewares/auth')
//const aws = require("../middlewares/awsLink");

router.get("/test-me", function(req,res){
    res.send({status: false, message:"just testing"})
})

//MASTER
router.get("/loginMaster", masterController.loginMaster);




//ADMIN
router.post("/registerAdmin",  adminController.registerAdmin);
router.post("/loginAdmin", adminController.loginAdmin);
router.get("/getAdminDetails/:adminId",adminAuth.authentication,adminAuth.authorization, adminController.getAdminDetails)  //myaccount
router.get("/getCompanyDetailsForAdmin/:adminId",adminAuth.authentication,adminAuth.authorization,adminController.getCompanyDetailsForAdmin)
router.post("/filledByAdmin/:adminId/:companyId",adminAuth.authentication,adminAuth.authorization, adminController.filledByAdmin) 
router.post("/adminApprovedRequest/:changePasswordId",adminAuth.authentication,adminAuth.authorization, adminController.adminChangedPassword);

//SUPERADMIN
router.post("/registerSuperAdmin",  superAdminController.registerSuperAdmin);
router.get("/loginSuperAdmin",superAdminController.loginSuperAdmin);

//Employee
router.post("/registerAdministration",aws.awsLinkEmployeeProfile,aws.awsLinkEmployeeSignature, administrationController.registerAdministration);
router.post("/loginAdministration", administrationController.loginAdministration)
router.post("/loginHR", administrationController.loginHR)
router.get("/getMyaccount/:employeeId", auth.authentication,administrationController.getMyaccount);
// router.get("/getWantedAdministrationList/:employeeId", administrationController.getWantedAdministrationList);
router.put("/updateInfo/:paramsId", administrationController.updateInfo);
// router.delete("/deleteEmployee/:employeeId", administrationController.deleteEmployee);

// NOT DONE YET
router.post ("/administration/forgotPassword", administrationController.forgotPasword)
router.get ("/administration/resetPassword/:token", administrationController.resetPassword)

// JD 
//for first Time clicking
router.post("/createEmployeeJd/:employeeId",auth.authentication,auth.authorization, employeeJdController.createEmployeeJd );
//for next Line of JD
router.post("/createAnotherOne/:employeeId",auth.authentication,auth.authorization,employeeJdController.createEmployeeJdForNextTime )
router.post ("/logOutJd/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.logOut);
router.post("/thirtyMin/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.thirtyMinTimesUp);
router.post("/fifteenMin/:employeeId/:jdId",auth.authentication,auth.authorization, employeeJdController.fifteenMinTimesUp);

 

//HR 
router.post("/extendedTime/:employeeId/:normalEmployee",auth.authentication,auth.authorization,employeeJdController.extendTime);
// router.get("/getWantedAdministrationList/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.getWantedAdministrationList);
// router.get("/getWantedListByDate/:employeeId/:normalEmployee",auth.authentication,auth.authorizationForHr,employeeJdController.getWantedListByDate)




//client 
router.post("/createClient", clientController.createClient);
router.post("/loginClient", clientController.loginClient);
router.post ("/logoutClient/:clientId", clientAuth.authentication,clientAuth.authorization, clientController.logoutClient)
router.get("/getCompanyDetails/:clientId",clientAuth.authentication,clientAuth.authorization,clientController.getCompanyDetails);
router.get("/getpersonalinfo/:clientId",clientAuth.authentication,clientAuth.authorization,clientController.getClientPersonalInfo);
router.post("/changePassword/:clientId",clientController.changePassword);
router.post("/commercialDir/:id" ,clientController.commercialDir);
router.put("/updateCompanyDetails/:clientId", clientController.updateCompanyDetails);
router.put("/updatePersonalDetalis/:clientId", clientController.updatePersonalDetails);


//clientEmail
router.post("/createClientEmail", clientEmailController.createClientEmail);

// clientGSTNo/IEC CODE NO
router.post("/inputNumberCreated", clientGSTNoController.inputNumberCreated); 

//recommendationLetter
router.post("/createRecommendationLetter/:companyId",recomendationLetterController.createRecomendationLetter);
router.get("/viewData/:id", recomendationLetterController.viewData);
router.put("/updateData/:id", recomendationLetterController.updateData);

// router.all("*/", async(req,res)=>{
    // return res.status(400).send({status: false, message:"invalid path"})
// })

//WINGS
router.post("/createExportWing/:companyId", wingsController.createExportWing);
router.post("/captcha",wingsController.captcha);
router.post("/verify", wingsController.verify);
router.get("/previewData/:wingsId",wingsController.previewData);
router.post("/getTickectNo/:wingsId", wingsController.generateTicketNo)
router.post("/sendMail/:companyId/:wingsId",wingsController.sendingMailToUser)




//Client B2B collaboration

router.post ("/clientB2BColloboration/:clientId", B2BRegistration.clientB2BColloboration )











//MEMBER SHIP SERVICES
router.post("/membershipservices/:clientId", memberShipServices.memberShipServices)



const payment = require('../controllers/practice');
// router.post('/create-payment-intent', payment.createPaymentIntent)
module.exports = router;
