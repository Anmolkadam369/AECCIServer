const jwt = require('jsonwebtoken')
const administrationModel = require('../models/administrationModel');
let { ObjectId } = require('mongodb')




const authentication = (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token) {
            return res.status(400).send({ status: false, message: "Token not present" });
        }

        token = token.split(" ");

        jwt.verify(token[1], 'aeccisecurity', function (err, decoded) {
            if (err) return res.status(401).send({ status: false, message: err.message });

            // Assuming the JWT payload contains a 'role' field that indicates the user's role
            // add krdo role bhi

            req.administrationId = decoded.administrationId;
            console.log(req.administrationId)
            next();
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const authorization = async (req, res, next) => {
    try {
        let tokenId = req.administrationId;   //objectId of that registerEmplyee
        let paramUserId = req.params.employeeId;   //objectId of that registerEmplyee
        console.log("param",paramUserId)
        // Check if paramUserId is provided and is a valid ObjectId
        if (paramUserId) {
            let userData = await administrationModel.findOne({ administrationId: paramUserId });
            console.log(userData)

            // If the user with the provided userId does not exist
            if (!userData) return res.status(404).send({ status: false, message: "No user found for this UserId" });
            
            
            // If the userId in the request parameters is not the same as the userId from the token
            if (userData._id.toString() !== tokenId) {
                return res.status(403).send({ status: false, message: "Unauthorized User Access" });
            }
            
            if (userData.emailId === "hr@aecci.org.in") { 
                console.log("for HR")
                req.employeeID = paramUserId;
                next();
            }
        }
        req.employeeID = paramUserId;
        console.log("DONE")
        // If paramUserId is not provided , allow access
        next();

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


// const authorizationForHr = async (req, res, next) => {
//     try {
//         let tokenId = req.administrationId;   //objectId of that registerEmplyee
//         let paramUserId = req.params.employeeId;   //objectId of that registerEmplyee

//         // Check if paramUserId is provided and is a valid ObjectId
//         if (paramUserId) {

//             let userData = await administrationModel.findOne({administrationId : paramUserId});
//             console.log(userData)

//             // If the user with the provided userId does not exist
//             if (!userData) {
//                 return res.status(404).send({ status: false, message: "No user found for this UserId" });
//             }
//             if(userData.emailId !== "hr@aecci.org.in")
//             return res.status(400).send({ status: false, message: "You Are Not Authorize" });

//             console.log(paramUserId , " ", tokenId)
//             // If the userId in the request parameters is not the same as the userId from the token
//             if (userData._id.toString() !== tokenId) {
//                 return res.status(403).send({ status: false, message: "Unauthorized User Access" });
//             }

//         }
//         req.employeeID = paramUserId;
//         // If paramUserId is not provided , allow access
//         next();

//     } catch (error) {
//         return res.status(500).send({ status: false, message: error.message });
//     }
// };

// const authorizationMaster = async (req, res, next) => {
//     try {
//         let tokenId = req.administrationId;   //objectId of that registerEmplyee
//         let paramUserId = req.params.employeeId;   //objectId of that registerEmplyee

//         // Check if paramUserId is provided and is a valid ObjectId
//         if (paramUserId) {
//             let userData = await administrationModel.findOne({administrationId : paramUserId});
//             console.log(userData)

//             // If the user with the provided userId does not exist
//             if (!userData) {
//                 return res.status(404).send({ status: false, message: "No user found for this UserId" });
//             }
//             if(userData.emailId == "hr@aecci.org.in")
//             return res.status(400).send({ status: false, message: "You cannot create JD" });

//             // If the userId in the request parameters is not the same as the userId from the token
//             if (userData._id.toString() !== tokenId) {
//                 return res.status(403).send({ status: false, message: "Unauthorized User Access" });
//             }

//         }
//         req.employeeID = paramUserId;
//         console.log("DONE")
//         // If paramUserId is not provided , allow access
//         next();

//     } catch (error) {
//         return res.status(500).send({ status: false, message: error.message });
//     }
// };

module.exports = { authentication, authorization }