

// var stripe = require("stripe")("sk_test_51LM4hdClyoITdq3ZfTfLdVZjmLKskcWAV17Yef5fGAjKFBReC82bstJOP7VyuauMiHFVGvHgyfQdSLsfcQHTzb9w00s65S9CT6")

// const CreateCard = async =(req, res)=> {
//     const {
//         id,
//         duration,
//         cardNumber,
//         expMM,
//         expYY,
//         cvv,
//         email,
//         name
//     } = req.body;

//     const createdUser =  stripe.customers.create({
//         email: email || 'testUser@gmail.com',
//         name: name || "123"
//     })

//     //console.log("createdUser", createdUser)
//     if (createdUser) {
//         try {
//             const token =  stripe.tokens.create({
//                 card: {
//                     number: cardNumber,
//                     exp_month: expMM,
//                     exp_year: expYY,
//                     cvc: cvv
//                 }
//             })
//             //console.log("token : ", token)
//             const AddingCardToUser =  stripe.customers.createSource(createdUser.id, {
//                 source: token.id
//             })

//             return res.status(201).json({
//                 success: true,
//                 AmountCharged: req.body.charge,
//                 message: "Payment Charged Successfully and also a mail has been sent to User as well as Admin."
//             });
//         } catch (error) {
//             return res.status(501).json({
//                 success: false,
//                 message: `Error in ${error.type} and error is :  ${error.message}`
//             });
//         }
//     }

// })
// module.exports = CreateCard




// {
//     "name": "projectsss",
//     "version": "1.0.0",
//     "description": "this is normal project",
//     "main": "index.js",
//     "scripts": {
//       "test": "echo \"Error: no test specified\" && exit 1"
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//       "aws-sdk": "^2.1421.0",
//       "axios": "^1.4.0",
//       "bcrypt": "^5.1.0",
//       "cors": "^2.8.5",
//       "crypto": "^1.0.1",
//       "dotenv": "^16.3.1",
//       "express": "^4.18.2",
//       "http": "^0.0.1-security",
//       "jsonwebtoken": "^9.0.1",
//       "mongoose": "^7.4.1",
//       "multer": "^1.4.5-lts.1",
//       "nodemailer": "^6.9.4",
//       "nodemon": "^3.0.1",
//       "stripe": "^12.17.0",
//       "svg-captcha": "^1.4.0",
//       "url": "^0.11.1"
//     }
//   }

// require('dotenv').config();


// const dbHost = process.env.DB_HOST;
// const dbPort = process.env.DB_PORT;
// console.log("some")
// console.log(`Database Host: ${dbHost}`);
// console.log(`Database Port: ${dbPort}`);

// console.log(`DB_HOST from process.env: ${process.env.DB_HOST}`);
// console.log(`DB_PORT from process.env: ${process.env.DB_PORT}`);


