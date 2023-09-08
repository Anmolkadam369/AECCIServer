let mongoose = require('mongoose')
let  clientGSTNoModel= require("../../models/clients/clientGSTNoModel");

const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const iecRegex = /^[A-Z]{3}[0-9]{5}[A-Z]{2}$/;

const  inputNumberCreated = async (req,res)=>{
    try {
        let inputNumberData = req.body;
        let {inputNumber} = inputNumberData;

    if (!inputNumber)
      return res.status(400).send({ status: false, message: "inputNumber is mandatory" });

    if(typeof(inputNumber) != "string"){
      return res.status(400).send({status: false, message:" please send proper inputNumber"})
    }

    inputNumber = inputNumberData.inputNumber = inputNumber.trim();


    if(inputNumber == "")
      return res.status(400).send({status: false, message:" please send proper inputNumber"});
    console.log(inputNumber.length)
      if(inputNumber.length !== 10 && inputNumber.length !== 15)  return res.status(400).send({status: false, message:" please send proper GSTNo or IEC Code"});

    if(inputNumber.length == 15){
    if (!gstRegex.test(inputNumber))return res.status(400).json({ valid: false, message: 'Invalid GST number.' });
    }

    if(inputNumber.length === 10){
      if (!iecRegex.test(inputNumber))return res.status(400).json({ valid: false, message: 'Invalid IEC number.' });
      }
      const inputNumberCreated = await clientGSTNoModel.create(inputNumberData);
      return res.status(200).send({status:true, message:"successfully Added GST", data:inputNumberCreated})

    }
    
    catch (error) {
     return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports ={inputNumberCreated}
