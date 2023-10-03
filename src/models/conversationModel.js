const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        trim: true
    },
    memberShipNo: {
        type: String,
        trim: true
    },
    info: [],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("conversation", conversationSchema);
