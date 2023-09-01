const mongoose = require('mongoose')

const superAdminSchema = new mongoose.Schema({
    superAdminId : {
        type: String,
        required: true,
        trim: true  
    },
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    profileImage: {    //superadminPhoto if there is any
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 8,
        max: 15
    }, 
      deletedAt: {
        type: Date
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
    },{timestamps: true})

module.exports = mongoose.model('superAdmin', superAdminSchema)