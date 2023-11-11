let mongoose = require("mongoose");
const masterUpdateModel = require("../../models/masterupdateModel");
const clientModel = require("../../models/clients/clientModel");

const loginMaster = async (req, res) => {
  try {
    let loginData = req.body;
    let { email, password } = loginData;
    //________________________________________________________
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is mandatory" });
    if (typeof email != "string") {
      return res
        .status(400)
        .send({ status: false, message: " please send proper email" });
    }
    email = loginData.email = email.trim().toLowerCase();
    if (email == "")
      return res
        .status(400)
        .send({ status: false, message: " please send proper email" });
    //_____________________________________________________

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is mandatory" });

    if (typeof password != "string")
      return res
        .status(400)
        .send({ status: false, message: "please provide password in string " });

    password = loginData.password = password.trim();
    if (password == "")
      return res
        .status(400)
        .send({ status: false, message: "Please provide password value" });

    //regex password
    // if (!validation.validatePassword(password))
    // return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting password
    //   let hashing = bcrypt.hashSync(password, 10);
    //   userData.password = hashing;
    //_____________________________________________________
    const collectionName = "masters";

    const collection = mongoose.connection.collection(collectionName);

    // Perform queries on the collection

    const result = await collection.find({ email: email });

    // console.log('Query result:', result);
    console.log(result);
    console.log(result[Symbol(filter)].email);

    if (email !== result.email)
      return res
        .status(400)
        .send({ status: false, message: "Access restricted to Master only" });
    if (password !== result.password)
      return res
        .status(400)
        .send({ status: false, message: "Access restricted to Master only" });

    let token = jwt.sign(
      { clientId: email, exp: Math.floor(Date.now() / 1000) + 86400 },
      "aeccisecurity"
    );
    let tokenInfo = { userId: isClientExists._id, token: token };

    res.setHeader("x-api-key", token);

    return res.status(200).send({
      status: true,
      message: "Master login successfully",
      data: tokenInfo,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const updateTasks = async (req, res) => {
  try {
    let data = req.body;
    let {
      empEmailId,
      profile,
      createJd,
      createEmp,
      viewEmpList,
      clientAdmin,
      clientSuperAdmin,
      updateCompany,
      updatePersonal,
      commercialDir,
      changePassword,
      payment,
      services,
      ecoAdmin,
      ecoSuperAdmin,
      membershipService,
      b2bRegistration,
      wings,
      exportWing,
      legalWing,
      hrSupportWing,
      professionalWing,
      businessSupportWing,
      womenWing,
      eventSeminarWing,
      arbitrationCenter,
      disputes,
      panelName,
      listOfAggreement,
      eventAndSeminar,
      eventBooking,
      chamberEvent,
      publications,
      viewPoint,
    } = data;

    if (!empEmailId)
      return res
        .status(400)
        .send({ status: false, message: "empEmailId is mandatory" });

    if (typeof empEmailId != "string")
      return res.status(400).send({
        status: false,
        message: "please provide empEmailId in string ",
      });

    empEmailId = data.empEmailId = empEmailId.trim();
    if (empEmailId == "")
      return res
        .status(400)
        .send({ status: false, message: "Please provide empEmailId value" });
    //------------------------------------------------------------------------------

    let findDataAndUpdate = await masterUpdateModel.findOneAndUpdate(
      { empEmailId: empEmailId },
      {
        $set: {
          createJd: createJd,
          createEmp: createEmp,
          viewEmpList: viewEmpList,
          clientAdmin: clientAdmin,
          clientSuperAdmin: clientSuperAdmin,
          updateCompany: updateCompany,
          updatePersonal: updatePersonal,
          commercialDir: commercialDir,
          changePassword: changePassword,
          payment: payment,
          b2bRegistration: b2bRegistration,
          membershipService: membershipService,
          ecoSuperAdmin: ecoSuperAdmin,
          ecoAdmin: ecoAdmin,
          exportWing: exportWing,
          legalWing: legalWing,
          hrSupportWing: hrSupportWing,
          professionalWing: professionalWing,
          businessSupportWing: businessSupportWing,
          womenWing: womenWing,
          eventSeminarWing: eventSeminarWing,
          disputes: disputes,
          panelName: panelName,
          listOfAggreement: listOfAggreement,
          eventBooking: eventBooking,
          chamberEvent: chamberEvent,
          viewPoint: viewPoint,
        },
      },
      { new: true }
    );
    if (findDataAndUpdate)
      return res.status(200).send({
        status: true,
        message: "data Updated",
        data: findDataAndUpdate,
      });
    let createdTasks = await masterUpdateModel.create(data);
    return res
      .status(201)
      .send({ status: true, message: "data created", data: createdTasks });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getRegisterdUsers = async (req, res) => {
  try {
    const clients = await clientModel.find(
      {},
      {
        password: 0,
      }
    );

    return res.status(200).send({
      status: true,
      message: "All client data retrieved",
      data: clients,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const deleteUserFromClientAdmin = async (req, res) => {
  const userId = req.params.userId; // Use req.params.userId to get the userId from route parameters

  try {
    // Use Mongoose to find and delete the user by their ID
    const deletedUser = await clientModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const partiallyReviewed = async (req, res) => {
  try {
    const userId = req.body.userId; // Extract the userId from the request body

    // Update the accountStatus to "Partially Approved" for the specified user ID
    const updatedClient = await clientModel.findByIdAndUpdate(
      userId,
      { accountStatus: "PartiallyReviewed" },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: true,
      message: "User partially Reviewed successfully",
      data: updatedClient,
    });
  } catch (error) {
    console.error("Error partially approving user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginMaster,
  updateTasks,
  getRegisterdUsers,
  deleteUserFromClientAdmin,
  partiallyReviewed,
};
