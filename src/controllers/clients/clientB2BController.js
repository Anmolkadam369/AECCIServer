let mongoose = require('mongoose')
let clientB2BModel = require ("../../models/clients/clientB2BModel");
const clientModel = require('../../models/clients/clientModel');

const clientB2BColloboration = async (req,res)=>{
    try{
        let clientId = req.params.clientId;
        let data = req.body;
        let {companyName, category, email, publishingDate, closingDate, collaborationTitle, address, description} = data;
        let foundData =  await clientModel.findById(clientId);
        if (!foundData) return res.status(404).send({ status: false, message: "No client found" });
        companyName = data.companyName = foundData.companyName;
        //category by Vinuth Sir
        email = data.email = foundData.email;
        address = data.address = foundData.address1;
        
        if (!publishingDate)
            return res.status(400).send({ status: false, message: "publishingDate is required" });

        if (typeof (publishingDate) != "string")
            return res.status(400).send({ status: false, message: "publishingDate should be in String" });

        if (publishingDate == "")
            return res.status(400).send({ status: false, message: "Please Enter publishingDate value" });
//_______________________________________________________________________________________________________________________
    
        if (!closingDate)
            return res.status(400).send({ status: false, message: "closingDate is required" });

        if (typeof (closingDate) != "string")
            return res.status(400).send({ status: false, message: "closingDate should be in String" });

        if (closingDate == "")
            return res.status(400).send({ status: false, message: "Please Enter closingDate value" });
 
//_______________________________________________________________________________________________________________________
            
        if (!collaborationTitle)
            return res.status(400).send({ status: false, message: "collaborationTitle is required" });

        if (typeof (collaborationTitle) != "string")
            return res.status(400).send({ status: false, message: "collaborationTitle should be in String" });

        if (collaborationTitle == "")
            return res.status(400).send({ status: false, message: "Please Enter collaborationTitle value" });
    
//_______________________________________________________________________________________________________________________

        if (!description)
            return res.status(400).send({ status: false, message: "description is required" });

        if (typeof (description) != "string")
            return res.status(400).send({ status: false, message: "description should be in String" });

        if (description == "")
            return res.status(400).send({ status: false, message: "Please Enter description value" });

        // if(description.length > 10)
        //     return res.status(400).send({ status: false, message: "can't go beyond 10 characters" });

    
//_______________________________________________________________________________________________________________________

        let created = await clientB2BModel.create(data);
        return res.status(201).send({ status: true, message: "successfully", data: created });
        }

     catch(error){return res.status(500).send({ status: false, message: error.message })}
}

module.exports={clientB2BColloboration}