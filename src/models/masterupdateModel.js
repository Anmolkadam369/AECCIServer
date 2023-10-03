const mongoose = require('mongoose')

const masterUpdateSchema = new mongoose.Schema({
    empEmailId: {
        type: String,
        required: true,
        trim: true
    },
    profile: {
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
        clientAdmin: {
            type: Boolean,
            default: false
        },
        clientSuperAdmin: {
            type: Boolean,
            default: false
        },
        updateCompany: {
            type: Boolean,
            default: false
        },
        updatePersonal: {
            type: Boolean,
            default: false
        },
        commercialDir: {
            type: Boolean,
            default: false
        },
        changePassword: {
            type: Boolean,
            default: false
        },
        payment: {
            type: Boolean,
            default: false
        }
    },
    services: {
        ecoAdmin: {
            type: Boolean,
            default: false
        },
        ecoSuperAdmin: {
            type: Boolean,
            default: false
        },
        membershipService: {
            type: Boolean,
            default: false
        },
        b2bRegistration: {
            type: Boolean,
            default: false
        }
    },
    wings: {
        exportWing: {
            type: Boolean,
            default: false
        },
        legalWing: {
            type: Boolean,
            default: false
        },
        hrSupportWing: {
            type: Boolean,
            default: false
        },
        professionalWing: {
            type: Boolean,
            default: false
        },
        businessSupportWing: {
            type: Boolean,
            default: false
        },
        womenWing: {
            type: Boolean,
            default: false
        },
        eventSeminarWing: {
            type: Boolean,
            default: false
        }
    },
    arbitrationCenter: {
        disputes: {
            type: Boolean,
            default: false
        },
        panelName: {
            type: Boolean,
            default: false
        },
        listOfAggreement: {
            type: Boolean,
            default: false
        }
    },
    eventAndSeminar: {
        eventBooking: {
            type: Boolean,
            default: false
        },
        chamberEvent: {
            type: Boolean,
            default: false
        }
    },
    publications: {
        viewPoint: {
            type: Boolean,
            default: false
        }
    }


}, { timestamps: true });
module.exports = mongoose.model("updatedTask", masterUpdateSchema)