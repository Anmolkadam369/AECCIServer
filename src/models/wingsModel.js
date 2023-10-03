const mongoose = require("mongoose");
const wingsSchema = new mongoose.Schema({
   
    companyName:{
        type:String,
        required:true
        
    },
    membershipNo:{
        type:String,
        required:true
    },
    validUpto:{
        type:String,
        required:true
    },
    wingName:{
        type:String,
        required:true
    },
    typeOfQuery:{
        type:String,
        required:true
    },
    typeOfTopic:{
        type:String,
        required:true
    },

    letterOfCredit:{
        type:String,
        required:true
    },
    // modeOfCommunication:{
    //     type:String,
    //     // required:true
    // },
    // // consultationTime:{
        //     type:String,
        //     required:true
        // },
        briefOfCase:{
            type:String,
            required:true
        },
        refDoc:{
            type:String,
            required:true
        },
        generateTicketNo:{
            type:String
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true 
    }
},{timestamps:true});

module.exports = mongoose.model("wings",wingsSchema);
