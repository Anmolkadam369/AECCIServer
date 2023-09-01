const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const employeeJdSchema = new mongoose.Schema({
    // companyLogo:{
    //     type:String,
    //     // required:true
    // },

    employeeJdId : {
        type: String,  
        required:true
    },
    employeeName:{
        //get data through reference and populate
        type:String,
        // required: true,
        trim:true
        
    },
    Designation:{
        //get data through reference and populate
        type:String,
        // required: true,
        trim:true
        
    },
    today:{
        type: String,  
        required:true
    },
    timeIn : {
        type: String,  
        required:true
    },
    jobRole : {
        type:String,
        trim:true
    },
    jobDescription:{
        type:String,
        trim:true
    },
    logOut:{
        type:String,
        default:"00:00"
    },
    preparedBy : {       
        //get data through reference and populate
        type:String, 
        // required:true,
        trim:true
    },
    isDeleted:{
        type:Boolean, 
        default:false

    }
},{timestamps:true});

module.exports = mongoose.model("employeeJd",employeeJdSchema);