const mongoose = require('mongoose')

const clientCompSchema = new mongoose.Schema({
    clientId:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        // required:true,
        trim : true
    },
    numberOfEmployees:{
        type:String,
        // required:true,
        trim:true
    },
    websiteAdd:{
        type:String,
        // required:true,
        trim : true
    },
    address1:{
        type:String,
        // required:true,
        trim : true
    },
    address2:{
        type:String,
        // required:true,
        trim : true
    },
    country:{
        type:String,
        // required:true,
        trim : true
    },
    state:{
        type:String,
        // required:true,
        trim : true
    },
    pinCode:{
        type:Number,
        // required:true,
        trim : true
    },
    businessCategory:{
        type:String,
        // required:true,
        trim : true
    },
    howDidYouKnowAboutUs:{
        type:String,
        // required:true,
        trim : true
    },

    email:{
        type:String,
        // required:true,
        trim : true
    },
    
    telephoneNo:{
        type:String,
        // required:true,
        trim : true
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
    isApproved:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model("clientComapany", clientCompSchema)