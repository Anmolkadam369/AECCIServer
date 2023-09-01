let mongoose = require('mongoose')
const clientModel = require('../../models/clients/clientModel');
const clientWingsModel = require("../../models/wingsModel");
const nodemailer = require('nodemailer');
const svgCaptcha = require('svg-captcha');
const wingsModel = require('../../models/wingsModel');


//after clicking on submit button this API will hit
const createExportWing = async (req, res) => {
    try {
        let companyId = req.params.companyId;
        let data = req.body;
        let { topicSelection, companyName, membershipNo, validUpto, wingName, purposeOfRequest, modeOfCommunication, consultationDate, consultationTime, briefOfCase } = data;

        let clientData = await clientModel.findOne({ _id: companyId })
        console.log("clientData",clientData)
        if (!clientData) return res.status(404).send({ status: false, message: "no data found" });
        companyName = data.companyName = clientData.companyName;
        membershipNo =data.membershipNo =  clientData.memberShipNo;
        validUpto = data.validUpto = clientData.validUpTo;
        console.log(companyName)


        // wingName = data.wingName;
        console.log(data.wingName)

        if (!topicSelection)
        return res.status(400).send({ status: false, message: "topicSelection is required" });

    if (typeof (topicSelection) != "string")
        return res.status(400).send({ status: false, message: "topicSelection should be in String" });

    if (topicSelection == "")
        return res.status(400).send({ status: false, message: "Please Enter topicSelection value" });

    //____________________________________________________________________________________________________

        if (!purposeOfRequest)
            return res.status(400).send({ status: false, message: "purposeOfRequest is required" });

        if (typeof (purposeOfRequest) != "string")
            return res.status(400).send({ status: false, message: "purposeOfRequest should be in String" });

        if (purposeOfRequest == "")
            return res.status(400).send({ status: false, message: "Please Enter purposeOfRequest value" });

        //_______________________________________________________________________________________________________________________________________________
        if (!modeOfCommunication)
        return res.status(400).send({ status: false, message: "modeOfCommunication is required" });

        if (modeOfCommunication == "")
            return res.status(400).send({ status: false, message: "Please Enter modeOfCommunication value" });

        //_______________________________________________________________________________________________________________________________________________
        if (!consultationDate)
            return res.status(400).send({ status: false, message: "consultationDate is required" });

        if (typeof (consultationDate) != "string")
            return res.status(400).send({ status: false, message: "consultationDate should be in String" });

        if (consultationDate == "")
            return res.status(400).send({ status: false, message: "Please Enter consultationDate value" });
        //_______________________________________________________________________________________________________________________________________________

        if (!consultationTime)
            return res.status(400).send({ status: false, message: "consultationTime is required" });

        if (typeof (consultationTime) != "string")
            return res.status(400).send({ status: false, message: "consultationTime should be in String" });

        if (consultationTime == "")
            return res.status(400).send({ status: false, message: "Please Enter consultationTime value" });
        //_______________________________________________________________________________________________________________________________________________

        if (!briefOfCase)
            return res.status(400).send({ status: false, message: "briefOfCase is required" });

        if (typeof (briefOfCase) != "string")
            return res.status(400).send({ status: false, message: "briefOfCase should be in String" });

        if (briefOfCase == "")
            return res.status(400).send({ status: false, message: "Please Enter briefOfCase value" });
        //_______________________________________________________________________________________________________________________________________________

        let createData = await wingsModel.create(data);
        return res.status(201).send({ status: true, message: "data created", data: createData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const captchaData = {};

// Generate and serve CAPTCHA image
const captcha = (req, res) => {
    const captcha = svgCaptcha.create();
    console.log("captcha:", captcha)
    captchaData[req.ip] = {
        text: captcha.text,
        timestamp: Date.now()
    };
    res.type('svg').send(captcha.data);
};

// Verify CAPTCHA
const verify = (req, res) => {
    const userEnteredText = req.body.captcha;
    const storedCaptcha = captchaData[req.ip];
    console.log(storedCaptcha)

    if (!storedCaptcha || Date.now() - storedCaptcha.timestamp > 600000) {
        // CAPTCHA expired or not generated
        res.json({ success: false, message: 'CAPTCHA expired or not generated.' });
    } else if (userEnteredText === storedCaptcha.text) {
        // CAPTCHA matched
        res.json({ success: true, message: 'CAPTCHA matched!' });
    } else {
        // CAPTCHA didn't match
        res.json({ success: false, message: 'CAPTCHA did not match.' });
    }
};

const previewData = async (req, res) => {
    try {
        let wingsId = req.params.wingsId;
        if (!mongoose.isValidObjectId(wingsId))
            return res.status(400).send({ status: false, message: "not valid Id" });
        let foundData = await wingsModel.findById(wingsId);
        if (!foundData) return res.status(404).send({ status: false, message: "not data found " })
        return res.status(200).send({ status: true, message: "preview Data", data: foundData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

let count = 1001;

const generateTicketNo = async (req, res) => {
    let wingsId = req.params.wingsId;
    let foundData = await wingsModel.findById(wingsId);
    if (!foundData) return res.status(404).send({ status: false, message: "not data found " })
    if (!foundData.generateTicketNo) {
        let shortWingName;
        let wingsName = foundData.wingName;
        if (wingsName === "Export Wing") shortWingName = "EW";
        if (wingsName === "Legal Wing") shortWingName = "LW";
        if (wingsName === "HR support Wing") shortWingName = "HRW";
        if (wingsName === "Business Advice Wing") shortWingName = "BAW";
        if (wingsName === "Professional Wing") shortWingName = "PW";
        if (wingsName === "Event & Seminar Wing") shortWingName = "ESW";
        if (wingsName === "Women Wing") shortWingName = "WW";
        count++;
        let currentYear = new Date().getFullYear();
        let nextYear = (new Date().getFullYear()) + 1;

        let generatedTicketNo = `AECCI/${shortWingName}/${count}/${currentYear}-${nextYear}`;
        console.log("here's your ticket no is ", generatedTicketNo)
        let updatedData = await wingsModel.findOneAndUpdate({_id : wingsId},{$set:{generateTicketNo:generatedTicketNo}},{new:true})
        return res.status(200).send({status:true, message:`here's your ticket no is , ${generatedTicketNo}`})
    }
    else {
        return res.status(400).send({status:false, message:`You have already generated the token`})
    }
}

const sendingMailToUser = async (req, res) => {
    try {
        let companyId = req.params.companyId;
        let wingsId = req.params.wingsId;
        if (!mongoose.isValidObjectId(wingsId))
        return res.status(400).send({ status: false, message: "not valid Id" });
        let clientDetails = await clientModel.findById(companyId);
        if (!clientDetails) return res.status(404).send({ status: false, message: "not data found " })
        let foundData = await wingsModel.findById(wingsId);
        if (!foundData) return res.status(404).send({ status: false, message: "not data found " })
        let ticketNo = foundData.generateTicketNo;
        let wingName = foundData.wingName;
        let email = clientDetails.email;
        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'anmolkadam369@gmail.com',
                pass: 'xapeupenirhdxtgt',
            },
        });

        // Email content
        const mailOptions = {
            from: 'anmolkadam369@gmail.com',
            to: email,
            subject: 'Congratulations !!! for your Appointment',
            text: `Dear Sir/ma'am ,
                    Your ticket No ${ticketNo}, has successfully generated for the consultation 
                    of ${wingName} services.
                    AECCI team shall contact you for further Assistance `,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).send({ status: true, message: "email sent to user" })
    }
    catch (error) {
        console.log('Error sending email:', error);
        res.status(500).send({ status: false, message: error.message })

    }

}

module.exports = { createExportWing, captcha, verify, previewData, generateTicketNo, sendingMailToUser }