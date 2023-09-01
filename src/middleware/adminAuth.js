const jwt = require('jsonwebtoken')
const adminModel = require('../models/adminModel');

const authentication = (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token) {
            return res.status(400).send({ status: false, message: "Token not present" });
        }

        token = token.split(" ");

        jwt.verify(token[1], 'aeccisecurity', function (err, decoded) {
            if (err) return res.status(401).send({ status: false, message: err.message });

            req.adminId = decoded.adminId;
            console.log(req.adminId)
            next();
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const authorization = async (req, res, next) => {
    try {
        let tokenId = req.adminId;   //objectId of that registerEmplyee
        let paramAdminId = req.params.adminId;   //objectId of that registerEmplyee
        console.log("param",paramAdminId)
        // Check if paramAdminId is provided and is a valid ObjectId
        if (paramAdminId) {
            console.log("some",paramAdminId, tokenId)
            let adminData = await adminModel.findOne({ _id: paramAdminId });
            console.log("some",adminData)

            // If the user with the provided userId does not exist
            if (!adminData) return res.status(404).send({ status: false, message: "No admin found for this UserId" });
            
            
            // If the userId in the request parameters is not the same as the userId from the token
            console.log(adminData._id.toString(), tokenId)
            if (adminData._id.toString() !== tokenId) {
                return res.status(403).send({ status: false, message: "Unauthorized User Access" });
            }
            
        }
        req.adminId = paramAdminId;
        console.log("DONE")
        // If paramAdminId is not provided , allow access
        next();

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


module.exports = { authentication, authorization }