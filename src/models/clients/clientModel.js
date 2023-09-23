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
        type:Number,
        required:true,
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
        trim : true,
        default:""
    },
    address4:{
        type:String,
        trim : true,
        default:""
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
    subCategory:{
        type:String,
        trim : true,
        default:""
    },
    howDidYouKnowAboutUs:{
        type:String,
        required:true,
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
        required:true,
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
    
    registeredAccountNo : {
        type:String,
        required:true,
        trim : true
    },
    IFSCCode:{
        type:String,
        required:true,
        trim : true
    },
    throughEmail:{
        type: Boolean,
        trim:true
    },
    throughCalls:{
        type: Boolean,
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
    membershipForm:{
        type:String,
        trim :true
    },
    requestLetter:{
        type:String,
        trim :true
    },
    indemnityBond:{
        type:String,
        trim :true
    },
    gstPan:{
        type:String,
        trim :true
    },
    IECLicence:{
        type:String,
        trim :true
    },
    registrationCertificate:{
        type:String,
        trim :true
    },
    certOfIncoporation:{
        type:String,
        trim :true
    },
    copyMOA:{
        type:String,
        trim :true
    },
    authsignotary:{
        type:String,
        trim :true
    },
    passportPhoto:{
        type:String,
        trim :true
    },
    approvedBySuperAdmin:{
        type:Boolean
    }
},{timestamps:true});

module.exports = mongoose.model("client", clientSchema)
