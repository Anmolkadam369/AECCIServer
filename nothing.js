

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