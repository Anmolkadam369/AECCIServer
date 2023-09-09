const mongoose = require('mongoose')

const clientMarketingSchema = new mongoose.Schema({
    emails:{
        type:Boolean,
        default:false,
        trim:true
    },
    posts:{
        type:Boolean,
        default:false,
        trim:true
    },
    calls:{
        type:Boolean,
        default:false,
        trim:true
    },
    campaigns:{
        type:Boolean,
        default:false,
        trim:true
    },
    awards:{
        type:Boolean,
        default:false,
        trim:true
    },
    weeklyBullets:{
        type:Boolean,
        default:false,
        trim:true
    },
    eventUpdates:{
        type:Boolean,
        default:false,
        trim:true
    },
    magzine:{
        type:Boolean,
        default:false,
        trim:true
    },
    newsLetters:{
        type:Boolean,
        default:false,
        trim:true
    },
    sponsorship :{
        type:Boolean,
        default:false,
        trim:true
    }
},{timestamps:true});
module.exports = mongoose.model("marketing", clientMarketingSchema)