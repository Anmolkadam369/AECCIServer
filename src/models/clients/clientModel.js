const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    
    selectMembership:{
        type:String,
        required:true,
        trim : true
    },
    companyName:{
        type:String,
        required:true,
        trim : true
    },
    inputNumber:{
        type:String,
        required:true,
        trim : true
    },
    numberOfEmployees:{
        type:String,
        trim:true
    },
    websiteAdd:{
        type:String,
        required:true,
        trim : true
    },
    address1:{
        type:String,
        required:true,
        trim : true
    },
    address2:{
        type:String,
        required:true,
        trim : true
    },
    address3:{
        type:String,
        trim : true
    },
    address4:{
        type:String,
        trim : true
    },
    country:{
        type:String,
        required:true,
        trim : true
    },
    state:{
        type:String,
        required:true,
        trim : true
    },
    pinCode:{
        type:Number,
        required:true,
        trim : true
    },
    businessCategory:{
        type:String,
        required:true,
        trim : true
    },
    howDidYouKnowAboutUs:{
        type:String,
        // required:true,
        trim : true
    },
    title:{
        type:String,
        required:true,
        trim : true
    },
    firstName:{
        type:String,
        required:true,
        trim : true
    },
    surName:{
        type:String,
        // required:true,
        trim : true
    },
    role:{
        type:String,
        required:true,
        trim : true
    },
    email:{
        type:String,
        required:true,
        trim : true
    },
    password:{
        type:String,
        required:true,
        trim : true
    },
    confirmPassword:{
        type:String,
        required:true,
        trim : true
    },
    telephoneNo:{
        type:String,
        // required:true,
        trim : true
    },
    phoneNo:{
        type:Number,
        required:true,
        trim : true
    },
    registeredBank:{
        type:String,
        required:true,
        trim : true
    },
    branchDetails:{
        type:{
            registeredAccountNo : String,
            IFSCCode:String,
            branchName : String
        },
        required:true,
        trim : true
    },
    modeOfCommunication:{
        type: [],
        trim:true
    },
    facebook:{
        type:String,
        trim:true
    },  
    twitter:{
        type:String,
        trim:true
    },
    linkedIn:{
        type:String,
        trim:true
    },
    memberShipNo:{
        type:String,
        trim :true
    },
    validUpTo:{
        type:String,
        trim :true
    },
    approved:{
        type:Boolean
    },
    reasonForNotchoosing:{
        type:String,
        trim :true
    },
    approvedBySuperAdmin:{
        type:Boolean
    }
},{timestamps:true});

module.exports = mongoose.model("client", clientSchema)