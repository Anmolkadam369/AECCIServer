const mongoose = require("mongoose");

const administrationSchema = new mongoose.Schema({
  administrationId : {
        type: String,
        required: true,
        trim: true
  },
  
  
  profileImage: {    //staffPhoto if there is any
        type: String,
        // required: true,
        trim: true
   },
  departmentName:{
    type: String,
    required : true,
    trim:true
  },
  officerName : {
    type: String,
    required : true,
    trim : true
  },
  employeeId : {
    type: String,
    required: true,
    unique:true
  },
  designation:{
    type:String,
    required:true,
    trim:true
  },
  emailId:{
    type:String,
    required:true,
    trim:true
  },
  userName :{
    type: String,
    required:true,
    trim: true
  },
  password : {
    type : String,
    required: true,
    trim : true
  },
  signature : {
    type: String,
    // required: true
  },
  Date:{
    type: String,  
    required:true
  },
  // tasks : {
  //   type:[],
  //   required:true
  // },

      deletedAt: {
        type: Date
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
},{timeStamps : true})

module.exports = mongoose.model("administration", administrationSchema);