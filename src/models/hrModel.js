const mongoose = require("mongoose");

const hrSchema = new mongoose.Schema({
  employeeJdId:{
    type:String,
    // required:true,
    trim:true
  },
    employeeId:{
        type:String,
        // required:true,
        trim:true
    },
  name:{
    type:String,
    // required:true,
    trim:true
  },
  timeIn :{
    type: String,
    // required:true,
    trim: true
  },
  isExtendedByHR : {
    type : Boolean,
    // required: true,
    trim : true,
    default:false
  },
  designation:{
    type : String,
    // required: true,
    trim : true
  },
      deletedAt: {
        type: Date
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
},{timeStamps : true})

module.exports = mongoose.model("hrExtend", hrSchema);