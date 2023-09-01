let mongoose = require('mongoose')
let clientEmail = require("../../models/clients/clientEmailModel");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const createClientEmail = async (req,res)=>{
    try {
    let emailData = req.body;
    let {email} = emailData;
    if (!email)
      return res.status(400).send({ status: false, message: "email is mandatory" });
      console.log(typeof(email))
    if(typeof(email) != "string"){
      return res.status(400).send({status: false, message:" please send proper email"})
    }
    email = emailData.email = email.trim().toLowerCase();
    if(email == "")
      return res.status(400).send({status: false, message:" please send proper email"})
    if(!emailRegex.test(email)) return res.status(400).json({ valid: false, message: 'Invalid email.' });
      const clientEmailCreated = await clientEmail.create(emailData);
      return res.status(200).send({status:true, message:"created Email", data:clientEmailCreated})

    } catch (error) {
     return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {createClientEmail};