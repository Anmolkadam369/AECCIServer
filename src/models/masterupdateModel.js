const mongoose = require('mongoose')

const masterUpdateSchema = new mongoose.Schema({
    empEmailId:{
        type:String,
        required:true,
        trim:true
    },
    profile:{
            createJd: {
                type: Boolean,
                default: false
            },
            createEmp: {
                type: Boolean,
                default: false
            },
            viewEmpList: {
                type: Boolean,
                default: false   
            },
            clientAdmin:{
                type: Boolean,
                default: false
            },
            clientSuperAdmin:{
                type: Boolean,
                default: false
            },
            updateCompany:{
                type: Boolean,
                default: false
            },
            updatePersonal:{
                type: Boolean,
                default: false
            },
            commercialDir:{
                type: Boolean,
                default: false
            },
            changePassword: {
                type: Boolean,
                default: false   
            },
            payment:{
                type: Boolean,
                default: false
            }
    },
    services:{
        ecoAdmin: {
            type: Boolean,
            default: false
        }, 
        ecoSuperAdmin: {
            type: Boolean,
            default: false
        }, 
    }


},{timestamps:true});
module.exports = mongoose.model("updatedTask", masterUpdateSchema)