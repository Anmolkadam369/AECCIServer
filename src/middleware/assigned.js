let mongoose = require('mongoose');
const masterUpdateModel = require("../models/masterupdateModel");
const url = require('url');
const checkIsAssigned = async(req,res,next)=>{
    try{
        let designation = req.designation;

        console.log(req.originalUrl);
        let originalUrl = req.originalUrl;
        const parsedUrl = url.parse(originalUrl, true);
        const parts = originalUrl.split("/");
        console.log(parts[1])
        let foundData = masterUpdateModel.findOne({taskName:parts[1]});
        if (!foundData) return res.status(404).send({ status: false, message: "No task found" });
        if(!foundData.taskAssignedTo) return res.status(404).send({ status: false, message: `not assigned to ${designation} ` });
        next();
    }
    catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports={checkIsAssigned}