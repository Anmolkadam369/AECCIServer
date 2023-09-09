const mongoose = require('mongoose')

const commercialDirectorySchema = new mongoose.Schema({
    companyLogo:{
        type:String,
        required:true,
        trim:true
    },
    companyName:{
        type:String,
        required:true,
        trim:true
    },
    ownersName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    establishmentYear:{
        type:Number,
        required:true,
        trim:true
    },
    companyAdd :{
        type:String,
        required:true,
        trim:true
    },
    mobileNo : {
        type:Number,
        required:true,
        trim:true
    },
    companyProduct:{
        type:String,
        required:true,
        trim:true
    },
    companyActivity:{
        type:String,
        required:true,
        trim:true
    },
    approved:{
        type:Boolean
    }

},{timestamps:true});

module.exports = mongoose.model("commercialDirectory", commercialDirectorySchema)