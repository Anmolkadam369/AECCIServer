const jwt = require('jsonwebtoken')
const { isValidObjectId } = require('mongoose');
const administrationModel = require('../models/administrationModel');




const authentication =  (req, res, next) => {
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


            if (decoded.administrationId !== "hr@gmail.com") {
                return res.status(403).send({ status: false, message: "Access restricted to HR only" });
            }

            req.administrationId = decoded.administrationId;
            next();
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const authorization = async (req, res, next) => {
    try {
        let tokenId = req.administrationId;
        let paramUserId = req.params.administrationId;

        // Check if paramUserId is provided and is a valid ObjectId
        if (paramUserId) {
            if (!isValidObjectId(paramUserId)) {
                return res.status(400).send({ status: false, message: "Invalid user id" });
            }

            let userData = await administrationModel.findById(paramUserId);

            // If the user with the provided userId does not exist
            if (!userData) {
                return res.status(404).send({ status: false, message: "No user found for this UserId" });
            }

            // If the userId in the request parameters is not the same as the userId from the token
            if (paramUserId !== tokenId) {
                return res.status(403).send({ status: false, message: "Unauthorized User Access" });
            }

        }

        // If paramUserId is not provided , allow access
        next();

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = {authentication, authorization}