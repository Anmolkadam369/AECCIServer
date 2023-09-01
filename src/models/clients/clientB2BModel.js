const mongoose = require('mongoose')

const b2bregistration = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        // required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    publishingDate:{
        type:String,
        required:true,
        trim:true
    },
    closingDate:{
        type:String,
        required:true,
        trim:true
    },
    collaborationTitle:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        // maxLength: 10
    }

},{timestamps:true});
module.exports = mongoose.model("b2bcompany", b2bregistration)