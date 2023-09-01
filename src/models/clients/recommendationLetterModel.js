const mongoose = require('mongoose')

const recomendationLetter = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    MemberShipNo:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    addressesTo:{
        type:String,
        required:true
    },
    fullAddress:{
        type:String,
        required:true
    },
    applicantName:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    purposeOfVisit:{
        type:String,
        required:true
    },
    passportNo:{
        type:String,
        required:true
    },
    DateOfIssue:{
        type:String,
        required:true
    },
    DateOfExpiry:{
        type:String,
        required:true
    },
    requestingLetter:{
        type:String,
        required:true
    },
    invitationLetter:{
        type:String,
        required:true
    },
    passportCopy:{
        type:String,
        required:true
    },
    // adharcard:{
    //     type:String,
    //     required:true
    // },
    EPLastYear:{
        type:String,
        required:true
    },
    companyProfile:{
        type:String,
        required:true
    },
    // bankGurantee:{
    //     type:String,
    // },
    ITR:{
        type:String,
    },
    SalaryCertificate:{
        type:String,
    },
    comauthrepresentative:{
        type:String,
    },
    signofrepresentative:{
        type:String,
    }

},{timestamps:true});
module.exports = mongoose.model("recomendationLetter", recomendationLetter);