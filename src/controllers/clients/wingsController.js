let mongoose = require('mongoose')
const clientModel = require('../../models/clients/clientModel');
const clientWingsModel = require("../../models/wingsModel");
const nodemailer = require('nodemailer');
const svgCaptcha = require('svg-captcha');
const wingsModel = require('../../models/wingsModel');

let count = 1001;

const generateTicket = (wingName) => {
        let shortWingName;
        let wingsName = wingName;
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
        return generatedTicketNo;
    // }
    // else {
    //     return res.status(400).send({status:false, message:`You have already generated the token`})
    // }
}
//after clicking on submit button this API will hit
const createExportWing = async (req, res) => {
    try {
        let companyId = req.params.companyId;
        let data = req.body;
        let { companyName, membershipNo, validUpto, wingName,date,time, typeOfQuery, typeOfTopic, letterOfCredit,refDoc, briefOfCase,generateTicketNo } = data;

        let clientData = await clientModel.findOne({ _id: companyId })
        console.log("clientData",clientData)
        if (!clientData) return res.status(404).send({ status: false, message: "no data found" });
        companyName = data.companyName = clientData.companyName;
        membershipNo =data.membershipNo =  clientData.memberShipNo;
        validUpto = data.validUpto = clientData.validUpTo;
        console.log(companyName)


        wingName = data.wingName;
        console.log(data.wingName)

        if (!typeOfQuery)
        return res.status(400).send({ status: false, message: "typeOfQuery is required" });

    if (typeof (typeOfQuery) != "string")
        return res.status(400).send({ status: false, message: "typeOfQuery should be in String" });

    if (typeOfQuery == "")
        return res.status(400).send({ status: false, message: "Please Enter typeOfQuery value" });

    //____________________________________________________________________________________________________

        if (!typeOfTopic)
            return res.status(400).send({ status: false, message: "typeOfTopic is required" });

        if (typeof (typeOfTopic) != "string")
            return res.status(400).send({ status: false, message: "typeOfTopic should be in string" });

        if (typeOfTopic == "")
            return res.status(400).send({ status: false, message: "Please Enter typeOfTopic value" });

        //_______________________________________________________________________________________________________________________________________________
        if (!letterOfCredit)
        return res.status(400).send({ status: false, message: "letterOfCredit is required" });

        if (typeof (letterOfCredit) != "string")
        return res.status(400).send({ status: false, message: "letterOfCredit should be in string" });

        if (letterOfCredit == "")
            return res.status(400).send({ status: false, message: "Please Enter letterOfCredit value" });

        //_______________________________________________________________________________________________________________________________________________
      
        if (!briefOfCase)
            return res.status(400).send({ status: false, message: "briefOfCase is required" });

        if (typeof (briefOfCase) != "string")
            return res.status(400).send({ status: false, message: "briefOfCase should be in String" });

        if (briefOfCase == "")
            return res.status(400).send({ status: false, message: "Please Enter briefOfCase value" });
        
        if(briefOfCase.length > 1000)
            return res.status(400).send({ status: false, message: "You cannot exceed than 1000 characters" });

        //_______________________________________________________________________________________________________________________________________________
        console.log(req.document)
        refDoc = data.refDoc = req.document;

        generateTicketNo = data.generateTicketNo = generateTicket(data.wingName);
        //_______________________________________________________________________________________________________________________________________________
        date = data.date = `${new Date().getDate()}/${(new Date().getMonth())+1}/${new Date().getFullYear()}`;
        time = data.time = `${new Date().getHours()}:${(new Date().getMinutes())+1}:${new Date().getSeconds()}`
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

// let count = 1001;

// const generateTicketNo =  (wingName) => {
//         let shortWingName;
//         let wingsName = wingName;
//         if (wingsName === "Export Wing") shortWingName = "EW";
//         if (wingsName === "Legal Wing") shortWingName = "LW";
//         if (wingsName === "HR support Wing") shortWingName = "HRW";
//         if (wingsName === "Business Advice Wing") shortWingName = "BAW";
//         if (wingsName === "Professional Wing") shortWingName = "PW";
//         if (wingsName === "Event & Seminar Wing") shortWingName = "ESW";
//         if (wingsName === "Women Wing") shortWingName = "WW";
//         count++;
//         let currentYear = new Date().getFullYear();
//         let nextYear = (new Date().getFullYear()) + 1;

//         let generatedTicketNo = `AECCI/${shortWingName}/${count}/${currentYear}-${nextYear}`;
//         console.log("here's your ticket no is ", generatedTicketNo)
//         res.status(200).send({status:true, message:`here's your ticket no is , ${generatedTicketNo}`})
//     // }
//     // else {
//     //     return res.status(400).send({status:false, message:`You have already generated the token`})
//     // }
// }

// const generateTicketNo = async (req, res) => {
//     let wingsId = req.params.wingsId;
//     let foundData = await wingsModel.findById(wingsId);
//     if (!foundData) return res.status(404).send({ status: false, message: "not data found " })
//     if (!foundData.generateTicketNo) {
//         let shortWingName;
//         let wingsName = foundData.wingName;
//         if (wingsName === "Export Wing") shortWingName = "EW";
//         if (wingsName === "Legal Wing") shortWingName = "LW";
//         if (wingsName === "HR support Wing") shortWingName = "HRW";
//         if (wingsName === "Business Advice Wing") shortWingName = "BAW";
//         if (wingsName === "Professional Wing") shortWingName = "PW";
//         if (wingsName === "Event & Seminar Wing") shortWingName = "ESW";
//         if (wingsName === "Women Wing") shortWingName = "WW";
//         count++;
//         let currentYear = new Date().getFullYear();
//         let nextYear = (new Date().getFullYear()) + 1;

//         let generatedTicketNo = `AECCI/${shortWingName}/${count}/${currentYear}-${nextYear}`;
//         console.log("here's your ticket no is ", generatedTicketNo)
//         res.status(200).send({status:true, message:`here's your ticket no is , ${generatedTicketNo}`})
//     }
//     else {
//         return res.status(400).send({status:false, message:`You have already generated the token`})
//     }
// }

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




module.exports = { createExportWing, captcha, verify, previewData, sendingMailToUser }