const mongoose = require('mongoose')

const clientPersonalSchema = new mongoose.Schema({
    clientId:{
        type:String,
        // required:true 
    },
    title:{
        type:String,
        // required:true,
        trim : true
    },
    firstName:{
        type:String,
        // required:true,
        trim : true
    },
    surName:{
        type:String,
        // required:true,
        trim : true
    },
    role:{
        type:String,
        // required:true,
        trim : true
    },
    // email:{
    //     type:String,
    //     required:true,
    //     trim : true
    // },
   
    // telephoneNo:{
    //     type:String,
    //     // required:true,
    //     trim : true
    // },
    phoneNo:{
        type:Number,
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
    isApproved:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model("clientPersonal", clientPersonalSchema)