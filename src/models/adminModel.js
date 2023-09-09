const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    adminId : {
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
    profileImage: {    //adminPhoto if there is any
        type: String,
        required: true,
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

module.exports = mongoose.model('admin', adminSchema)