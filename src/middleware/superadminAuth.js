const jwt = require('jsonwebtoken')
const adminModel = require('../models/adminModel');
const superAdminModel = require('../models/superAdminModel');

const authentication = (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token) {
            return res.status(400).send({ status: false, message: "Token not present" });
        }

        token = token.split(" ");

        jwt.verify(token[1], 'aeccisecurity', function (err, decoded) {
            if (err) return res.status(401).send({ status: false, message: err.message });

            req.superAdminId = decoded.superAdminId;
            console.log(req.superAdminId)
            next();
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const authorization = async (req, res, next) => {
    try {
        let tokenId = req.superAdminId;   //objectId of that registerEmplyee
        let paramsuperAdminId = req.params.superAdminId;   //objectId of that registerEmplyee
        console.log("param",paramsuperAdminId)
        // Check if paramsuperAdminId is provided and is a valid ObjectId
        if (paramsuperAdminId) {
            console.log("some",paramsuperAdminId, tokenId)
            let superAdminData = await superAdminModel.findOne({ _id: paramsuperAdminId });
            console.log("some",superAdminData)

            // If the user with the provided userId does not exist
            if (!superAdminData) return res.status(404).send({ status: false, message: "No superAdmin found for this UserId" });
            
            
            // If the userId in the request parameters is not the same as the userId from the token
            console.log(superAdminData._id.toString(), tokenId)
            if (superAdminData._id.toString() !== tokenId) {
                return res.status(403).send({ status: false, message: "Unauthorized User Access" });
            }
            
        }
        req.superAdminId = paramsuperAdminId;
        console.log("DONE")
        // If paramsuperAdminId is not provided , allow access
        next();

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


module.exports = { authentication, authorization }