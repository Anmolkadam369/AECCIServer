const jwt = require('jsonwebtoken')
const clientModel = require('../models/clients/clientModel');

const authentication = (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token) {
            return res.status(400).send({ status: false, message: "Token not present" });
        }

        token = token.split(" ");

        jwt.verify(token[1], 'aeccisecurity', function (err, decoded) {
            if (err) return res.status(401).send({ status: false, message: err.message });

            req.clientId = decoded.clientId;
            console.log(req.clientId)
            next();
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const authorization = async (req, res, next) => {
    try {
        let tokenId = req.clientId;   //objectId of that registerEmplyee
        let paramUserId = req.params.clientId;   //objectId of that registerEmplyee
        console.log("param",paramUserId)
        // Check if paramUserId is provided and is a valid ObjectId
        if (paramUserId) {
            let userData = await clientModel.findOne({ _id: paramUserId });
            console.log(userData)

            // If the user with the provided userId does not exist
            if (!userData) return res.status(404).send({ status: false, message: "No client found for this UserId" });
            
            
            // If the userId in the request parameters is not the same as the userId from the token
            console.log(userData._id.toString(), tokenId)
            if (userData._id.toString() !== tokenId) {
                return res.status(403).send({ status: false, message: "Unauthorized User Access" });
            }
            
        }
        req.clientId = paramUserId;
        console.log("DONE")
        // If paramUserId is not provided , allow access
        next();

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


module.exports = { authentication, authorization }