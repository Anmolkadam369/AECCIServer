

let mongoose = require('mongoose');
const masterUpdateModel = require("../../models/masterupdateModel")



const loginMaster = async (req, res) => {
  try {

    let loginData = req.body;
    let { email, password } = loginData;
    //________________________________________________________
    if (!email)
      return res.status(400).send({ status: false, message: "email is mandatory" });
    if (typeof (email) != "string") {
      return res.status(400).send({ status: false, message: " please send proper email" })
    }
    email = loginData.email = email.trim().toLowerCase();
    if (email == "")
      return res.status(400).send({ status: false, message: " please send proper email" })
    //_____________________________________________________

    if (!password)
      return res.status(400).send({ status: false, message: "password is mandatory" });

    if (typeof password != "string")
      return res.status(400).send({ status: false, message: "please provide password in string " });

    password = loginData.password = password.trim();
    if (password == "")
      return res.status(400).send({ status: false, message: "Please provide password value" });


    //regex password
    // if (!validation.validatePassword(password))
    // return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting password
    //   let hashing = bcrypt.hashSync(password, 10);
    //   userData.password = hashing;
    //_____________________________________________________
    const collectionName = 'masters';

    const collection = db.collection(collectionName);

    // Perform queries on the collection

    const result = await collection.find({ email: email });

    console.log('Query result:', result);

    if (email !== result.email) return res.status(400).send({ status: false, message: "Access restricted to Master only" });
    if (password !== result.password) return res.status(400).send({ status: false, message: "Access restricted to Master only" });

    let token = jwt.sign(
      { clientId: email, exp: Math.floor(Date.now() / 1000) + 86400 }, "aeccisecurity");
    let tokenInfo = { userId: isClientExists._id, token: token };

    res.setHeader('x-api-key', token)

    return res.status(200).send({ status: true, message: "Master login successfully", data: tokenInfo });
  }

  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const updateTasks = async (req,res)=>{
  try{
    let data = req.body;
    let {taskName, taskAssignedTo}=data;
    
    if (!taskName)
      return res.status(400).send({ status: false, message: "taskName is mandatory" });

    if (typeof taskName != "string")
      return res.status(400).send({ status: false, message: "please provide taskName in string " });

    taskName = data.taskName = taskName.trim();
    if (taskName == "")
      return res.status(400).send({ status: false, message: "Please provide taskName value" });
  //------------------------------------------------------------------------------
    if (!taskAssignedTo)
      return res.status(400).send({ status: false, message: "taskAssignedTo is mandatory" });
    if (!Array.isArray(taskAssignedTo))
      return res.status(400).send({ status: false, message: "please provide taskAssignedTo in array " });
    
    if (taskAssignedTo == "")
      return res.status(400).send({ status: false, message: "Please provide taskAssignedTo value" });
  
    let findDataAndUpdate = await masterUpdateModel.findOneAndUpdate({taskName:taskName},{$set:{taskAssignedTo:taskAssignedTo}},{new:true});
    if(findDataAndUpdate) return  res.status(200).send({status:true, message:"data Updated", data:findDataAndUpdate});
    let createdTasks = await masterUpdateModel.create(data);
    return res.status(201).send({status:true, message:"data created", data:createdTasks});
    }
  catch(error){
    return res.status(500).send({ status: false, message: error.message })
  }
}

module.exports = { loginMaster,updateTasks }