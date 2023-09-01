let mongoose = require('mongoose')
let employeeJdModel = require("../models/employeeJdModel");
const administrationModel = require ('../models/administrationModel');
let jwt = require("jsonwebtoken");
let {ObjectId} = require('mongodb')
let bcrypt = require('bcrypt');
const { json } = require('express');
let hrModel = require("../models/hrModel")
const axios = require('axios');

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  



// const createEmployeeJd= async (req,res)=>{
//     try {
//         let employeeId = req.params.employeeId;
//         console.log(employeeId)
//                 // console.log("employeeId",typeof(employeeId))
//                 // const _id = mongoose.Types.ObjectId();
//                 // const _idssss = new ObjectId(employeeId);
//                 const _idssss = employeeId;
//                 // console.log("id",typeof(_idssss))
//                 // console.log(_idssss)
        
//                 let employeeJd = req.body;
//                 console.log(employeeJd);
//                 let {employeeJdId, employeeName,Designation,today, timeIn, preparedBy, jobRole, jobDescription}=employeeJd;
        
//                 let names = await administrationModel.findOne({administrationId : _idssss}).select({officerName:1,designation:1, _id:0});
//                 console.log("officer Name:",names.officerName)
//                 employeeName=employeeJd.employeeName= names.officerName;
//                 Designation=employeeJd.Designation= names.designation;
//                 preparedBy = employeeJd.preparedBy = names.officerName;

//                 let dated = new Date().getDate()
//                 let month = String(new Date().getMonth()+1)
//                 let year = new Date().getFullYear()
//                 let dates = year+"/"+month+"/"+dated;
//                 today = employeeJd.today = dates; 
        
//                  let logInTimeInMiliseconds = Date.now();
        
//                 let logInTime = new Date().getHours() + ":" + new Date().getMinutes();
//                 timeIn = employeeJd.timeIn = logInTime;
    
//                 //______________________________________________________________________________
                
//                 employeeJdId = employeeJd.employeeJdId = "empJd_"+generateRandomString(10);



//                 if(jobRole){
//                     console.log(typeof jobRole)
//                     if(jobRole == "")
//                     return res.status(400).send({status:false, message:"job role is required"});
//                     }
//                     //______________________________________________________________________________
            
//                     if(jobDescription){
//                     // if(jobDescription != "string")
//                     // return res.status(400).send({status:false, message:"job Description is required"});
//                     if(jobDescription == "")
//                     return res.status(400).send({status:false, message:"job Description is required bro"});
//                     }
//                     req.logInTimeInMiliseconds=logInTimeInMiliseconds;
                
//                 let createdJd = await employeeJdModel.create(employeeJd);
//                 req.timeIn = timeIn;
//                 // next()
//                 return res.status(201).send({status:true, message:"JD Created", data:createdJd})
//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }
// }
const createEmployeeJd= async (req,res)=>{
    try {
                let employeeId = req.params.employeeId;
                console.log(employeeId)
                const _idssss = employeeId;
                let employeeJd = req.body;
                console.log(employeeJd);

                let {employeeJdId,employeeOfficeId, employeeName,Designation,preparedBy}=employeeJd;
        
                let names = await administrationModel.findOne({administrationId : _idssss}).select({officerName:1,designation:1, _id:0});
                console.log("officer Name:",names.officerName)
                employeeName=employeeJd.employeeName= names.officerName;
                Designation=employeeJd.Designation= names.designation;
                preparedBy = employeeJd.preparedBy = names.officerName;

                employeeJdId = employeeJd.employeeJdId = "empJd_"+generateRandomString(10);
                 let logInTimeInMiliseconds = Date.now();
                //______________________________________________________________________________
                    req.logInTimeInMiliseconds=logInTimeInMiliseconds;
                let createdJd = await employeeJdModel.create(employeeJd);
                // req.timeIn = timeIn;
                return res.status(201).send({status:true, message:"JD Created", data:createdJd})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}
// const createEmployeeJd= async (req,res)=>{
//     try {
//         let employeeId = req.params.employeeId;
//         console.log(employeeId)

//                 const _idssss = employeeId;

        
//                 let employeeJd = req.body;
//                 console.log(employeeJd);
//                 let {employeeJdId, employeeName,Designation,today,preparedBy}=employeeJd;
        
//                 let names = await administrationModel.findOne({administrationId : _idssss}).select({officerName:1,designation:1, _id:0});
//                 console.log("officer Name:",names.officerName)
//                 employeeName=employeeJd.employeeName= names.officerName;
//                 Designation=employeeJd.Designation= names.designation;
//                 preparedBy = employeeJd.preparedBy = names.officerName;

//                 let dated = new Date().getDate()
//                 let month = String(new Date().getMonth()+1)
//                 let year = new Date().getFullYear()
//                 let dates = year+"/"+month+"/"+dated;
//                 today = employeeJd.today = dates; 
        
//                  let logInTimeInMiliseconds = Date.now();
        
//                 // let logInTime = new Date().getHours() + ":" + new Date().getMinutes();
//                 // timeIn = employeeJd.timeIn = logInTime;
    
//                 //______________________________________________________________________________
                
//                 employeeJdId = employeeJd.employeeJdId = "empJd_"+generateRandomString(10);



//                 // if(jobRole){
//                 //     console.log(typeof jobRole)
//                 //     if(jobRole == "")
//                 //     return res.status(400).send({status:false, message:"job role is required"});
//                 //     }
//                 //     //______________________________________________________________________________
            
//                 //     if(jobDescription){
//                 //     // if(jobDescription != "string")
//                 //     // return res.status(400).send({status:false, message:"job Description is required"});
//                 //     if(jobDescription == "")
//                 //     return res.status(400).send({status:false, message:"job Description is required bro"});
//                 //     }
//                     req.logInTimeInMiliseconds=logInTimeInMiliseconds;
                
//                 let createdJd = await employeeJdModel.create(employeeJd);
//                 // req.timeIn = timeIn;
//                 // next()
//                 return res.status(201).send({status:true, message:"JD Created", data:createdJd})
//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }
// }

// const createEmployeeJdForNextTime= async (req,res)=>{
//     try {
//         let employeeId = req.params.employeeId;
//                 // console.log("employeeId",typeof(employeeId))
//                 // const _id = mongoose.Types.ObjectId();
//                 const _idssss = employeeId;
//                 // console.log("id",typeof(_idssss))
//                 // console.log(_idssss)
        
//                 let employeeJd = req.body;
//                 console.log(employeeJd);
//                 let {employeeJdId, today, timeIn, jobRole, jobDescription}=employeeJd;
//                 let dated = new Date().getDate()
//                 let month = String(new Date().getMonth()+1)
//                 let year = new Date().getFullYear()
//                 let dates = year+"/"+month+"/"+dated;
//                 today = employeeJd.today = dates; 
        
//                  let logInTimeInMiliseconds = Date.now();
        
//                 let logInTime = new Date().getHours() + ":" + new Date().getMinutes();
//                 timeIn = employeeJd.timeIn = logInTime;
    
//                 employeeJdId = employeeJd.employeeJdId = "empJd_"+generateRandomString(10);

//                 //______________________________________________________________________________
                
//                 if(jobRole){
//                     console.log(typeof jobRole)
//                     if(jobRole == "")
//                     return res.status(400).send({status:false, message:"job role is required"});
//                     }
//                     //______________________________________________________________________________
            
//                     if(jobDescription){
//                     // if(jobDescription != "string")
//                     // return res.status(400).send({status:false, message:"job Description is required"});
//                     if(jobDescription == "")
//                     return res.status(400).send({status:false, message:"job Description is required bro"});
//                     }
//                     req.logInTimeInMiliseconds=logInTimeInMiliseconds;
                
//                 let createdJd = await employeeJdModel.create(employeeJd);
//                 req.timeIn = timeIn;
//                 // next()
//                 return res.status(201).send({status:true, message:"JD Created for another Time", data:createdJd})
//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }
// }

let userPressedLogout = false;
//THIS IS BUTTON PRESSED BY USER HIMSELF

// const logOut = async (req,res)=>{
//         try {
//             let jdId = req.params.jdId;
//             let employeeJd = req.body;
//             let {timeOut} = employeeJd;
//             let showJd = await employeeJdModel.findById(jdId);
//             if(!showJd) return res.status(404).send({status:false, message:"No Jd found"});
//             if(!showJd.jobRole || !showJd.jobDescription) return res.status(400).send({status:false, message:"fill necessary info"});
//             let logInTimeInMiliseconds= req.logInTimeInMiliseconds;
//             let logOutTimeInMiliseconds = Date.now();

//             let logOutTime = new Date().getHours() + ":" + new Date().getMinutes();
//             timeOut = employeeJd.timeOut = logOutTime;
//             userPressedLogout=true;
//             // logInTimeInMiliseconds = Number(logInTimeInMiliseconds);
//             // logOutTimeInMiliseconds= Number(logOutTimeInMiliseconds);
//             // console.log(logOutTimeInMiliseconds - logInTimeInMiliseconds)
//             // console.log(typeof (logOutTimeInMiliseconds))

//             // let timeTakenForTask = (((logOutTimeInMiliseconds-logInTimeInMiliseconds)/1000)/100);
//             // console.log(timeTakenForTask)
//             // console.log(`${timeTakenForTask} minutes taken for the task`);
//             let createLogOut= await logOutModel.create(employeeJd);
//             return res.status(201).send({status:true, message:" logout done", data:createLogOut});
//         } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//         }
// }
// const logOut = async (req,res)=>{
//         try {
//             let jdId = req.params.jdId;
//             let employeeJd = req.body;
//             let showJd = await employeeJdModel.findOne({employeeJdId:jdId});
//             if(!showJd) return res.status(404).send({status:false, message:"No Jd found"});
//             if(!showJd.jobRole || !showJd.jobDescription) return res.status(400).send({status:false, message:"fill necessary info"});

//             let logOutTime = new Date().getHours() + ":" + new Date().getMinutes();
//             timeOut = employeeJd.timeOut = logOutTime;
//             console.log(timeOut)
//             userPressedLogout=true;
            
//             let createLogOut= await employeeJdModel.findOneAndUpdate({employeeJdId:jdId},{$set:{logOut:timeOut}},{new:true});
            
//             return res.status(200).send({status:true, message:" logout done", data:createLogOut});
//         } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//         }
// }
//__________________________________________________________________________________________________
const logOut = async (req,res)=>{
    try {
        console.log("brooooooooooooooooooo")
        let jdId = req.params.jdId;
        let employeeJd = req.body;
        let {timeIn, today , jobDescription, jobRole,logOut}=employeeJd;
        
        
        if(!timeIn)
            return res.status(400).send({status: false, message: "timeIn is required"});

        if (timeIn == "")
            return res.status(400).send({ status: false, message: "Please Enter timeIn value" });

        if(typeof(timeIn) != "string")
            return res.status(400).send({status: false, message: "timeIn should be in String"});
        
            
        if(!today)
        return res.status(400).send({status: false, message: "today is required"});

        if (today == "")
        return res.status(400).send({ status: false, message: "Please Enter today value" });

        if(typeof(today) != "string")
        return res.status(400).send({status: false, message: "today should be in String"});
    

        if(!jobRole)
            return res.status(400).send({status: false, message: "jobRole is required"});

        if (jobRole == "")
            return res.status(400).send({ status: false, message: "Please Enter jobRole value" });

        if(typeof(jobRole) != "string")
            return res.status(400).send({status: false, message: "jobRole should be in String"});
        

        if(!jobDescription)
            return res.status(400).send({status: false, message: "jobDescription is required"});

        if (jobDescription == "")
            return res.status(400).send({ status: false, message: "Please Enter jobDescription value" });

        if(typeof(jobDescription) != "string")
            return res.status(400).send({status: false, message: "jobDescription should be in String"});

        if(!logOut)
            return res.status(400).send({status: false, message: "logOut is required"});

        if (logOut == "")
            return res.status(400).send({ status: false, message: "Please Enter logOut value" });

        if(typeof(logOut) != "string")
            return res.status(400).send({status: false, message: "logOut should be in String"});

        // let logOutTime = new Date().getHours() + ":" + new Date().getMinutes();
        // timeOut = employeeJd.timeOut = logOutTime;
        // console.log(timeOut)
        userPressedLogout=true;
        console.log("bruhhhhhhhhhhhhhhhhhhhhhhh")
        let createLogOut= await employeeJdModel.findOneAndUpdate({employeeJdId:jdId},{$set:{timeIn: timeIn, today:today, logOut:logOut,jobDescription:jobDescription,jobRole:jobRole}},{new:true});  
        if(!createLogOut) return res.status(404).send({status:false, message:"No Jd found"});
        return res.status(200).send({status:true, message:"All info Stored and logout done", data:createLogOut});
    }
     catch (error) {
    return res.status(500).send({status:false, message:error.message})
    }
}

let count = 0;

// function timeDone(duration,res){
//     let timerId;
//     function callBack(){
//         res.send("task time is over !!!")
       
//     }
//   const durationMilliseconds = duration * 60 * 1000; // Convert minutes to milliseconds
//    timerId = setTimeout(callBack, durationMilliseconds);
//     console.log(userPressedLogout)


  
// }
// const thirtyMinTimesUp = async (req,res)=>{
//     try {
//         let employeeId = req.params.employeeId;
//         console.log(employeeId)
//         let jdId = req.params.jdId;
//                     const _idssss = employeeId;
//                     let employeeJd = req.body;
//                     console.log(employeeJd);
//                     let {employeeJdId, employeeName,Designation,today, timeIn, preparedBy, jobRole, jobDescription}=employeeJd;
            
//                     let names = await administrationModel.findOne({administrationId : _idssss}).select({officerName:1,designation:1, _id:0});
//                     console.log("officer Name:",names.officerName)
//                     employeeName=employeeJd.employeeName= names.officerName;
//                     Designation=employeeJd.Designation= names.designation;
//                     preparedBy = employeeJd.preparedBy = names.officerName;
    
//                     let dated = new Date().getDate()
//                     let month = String(new Date().getMonth()+1)
//                     let year = new Date().getFullYear()
//                     let dates = year+"/"+month+"/"+dated;
//                     today = employeeJd.today = dates; 
            
//                      let logInTimeInMiliseconds = Date.now();
            
//                     let logInTime = new Date().getHours() + ":" + new Date().getMinutes();
//                     timeIn = employeeJd.timeIn = logInTime;
        
//                     //______________________________________________________________________________
                    
//                     employeeJdId = employeeJd.employeeJdId = "empJd_"+generateRandomString(10);
    
    
    
//                     if(jobRole){
//                         console.log(typeof jobRole)
//                         if(jobRole == "")
//                         return res.status(400).send({status:false, message:"job role is required"});
//                         }
//                         //______________________________________________________________________________
                
//                         if(jobDescription){
//                         // if(jobDescription != "string")
//                         // return res.status(400).send({status:false, message:"job Description is required"});
//                         if(jobDescription == "")
//                         return res.status(400).send({status:false, message:"job Description is required bro"});
//                         }
//                         req.logInTimeInMiliseconds=logInTimeInMiliseconds;


//                     let showJd = await employeeJdModel.findOne({employeeJdId:jdId});
//                     if(!showJd) return res.status(404).send({status:false, message:"No Jd found"});
//                     let duration = 1;
//                     timeDone(duration,res)
//         } catch (error) {
//             return res.status(500).send({status:false, message:error.message})
//         }
    
// }

// const fifteenMinTimesUp = async (req,res)=>{
//     let jdId = req.params.jdId;
//     if(count == 2)  return res.status(404).send({status:false, message:"your whole times up"});
//     count++;
//     let showJd = await employeeJdModel.findOne({employeeJdId:jdId});
//     if(!showJd) return res.status(404).send({status:false, message:"No Jd found"});
//     let duration = 1;
    
//     timeDone(duration,res)
// }

//this is HR's api 
// const extendTime = async (req,res)=>{
//     try {
//         const employeeId = req.params.normalEmployee;
//       console.log(employeeId)
//        let employeeInfo =await administrationModel.findOne({administrationId:employeeId});
//        if(!employeeInfo) return res.status(400).send({status: false, message:"No user Found"})
//                 console.log(count)
//                 count--;
//                 console.log(count)
//                  let duration = 1;
//                  console.log("before");
//                 timeDone(duration,res)
//                 console.log("after");
//                 return res.status(200).send({status:true, message:"extended ti"})

//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }

// }

//__________________________________________________________________________________________________
//only for that day JD Data

const giveDataOfEmployee = async(req,res)=>{
    try {
        let employeeId = req.body.employeeId;
        let foundData = await administrationModel.findOne({employeeId:employeeId});
        if(!foundData) return res.status(400).send({status: false, message:"No user Found here"});
        res.status(200).send({status:true, message:"data by EmployeeId", data:foundData.administrationId})

    } 
     catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}


const getWantedAdministrationList = async (req,res)=>{
    try{
      const employeeId = req.params.normalEmployee;
      console.log(employeeId)
       let employeeInfo =await administrationModel.findOne({administrationId:employeeId});
       if(!employeeInfo) return res.status(400).send({status: false, message:"No user Found"})
       let dated = new Date().getDate()
       let month = String(new Date().getMonth()+1)
       let year = new Date().getFullYear()
       let dates = dated+"/"+month+"/"+year; 
      let getInfo = await employeeJdModel.find({today:dates});
      console.log(getInfo.today)
      console.log(getInfo, dates)
      if(!getInfo)return res.status(400).send({status: false, message:"No Data Found of JD"})
    res.status(200).send({status:true, message: "employees information ", data : getInfo })
    }
     catch (err) { return res.status(500).send({ status: false, message: err.message }) }
  }
//Datewise selected JD Data
const getWantedListByDate = async (req,res)=>{
    try{
        let dates = req.body.date;
      const employeeId = req.params.normalEmployee;
      console.log(employeeId)
      if(!dates) return res.status(400).send({status: false, message:"Send Data"})
       let employeeInfo =await administrationModel.findOne({administrationId:employeeId});;
       if(!employeeInfo) return res.status(400).send({status: false, message:"No user Found"})
       
      let getInfo = await employeeJdModel.find({today:dates});
      console.log(getInfo, dates)
      if(!getInfo)return res.status(400).send({status: false, message:"No Data Found of JD"})
    res.status(200).send({status:true, message: "employees informationsssss ", data : getInfo })
    }
     catch (err) { return res.status(500).send({ status: false, message: err.message }) }
  }


const getJdData = async (req,res)=>{
    try {
        let adminData = await adminModel.findOne({});
        return res.status(200).send({status: true, message: "get admin data", data: adminData})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}


const requestForExtend = async (req,res)=>{
    try {
        let employeeId = req.params.employeeId;
        let jdId = req.params.jdId;
        console.log(jdId)

        let data = req.body;
        let {name,timeIn,isExtendedByHR, designation}= data;
       
        if(!name)
        return res.status(400).send({status: false, message: "name is required"});

        if (name == "")
            return res.status(400).send({ status: false, message: "Please Enter name value" });

        if(typeof(name) != "string")
            return res.status(400).send({status: false, message: "name should be in String"});
        
        if(!designation)
            return res.status(400).send({status: false, message: "designation is required"});
        
        if (designation == "")
            return res.status(400).send({ status: false, message: "Please Enter designation value" });
        
        if(typeof(designation) != "string")
            return res.status(400).send({status: false, message: "designation should be in String"});
        
        if(!timeIn)
        return res.status(400).send({status: false, message: "timeIn is required"});

        if (timeIn == "")
            return res.status(400).send({ status: false, message: "Please Enter timeIn value" });

        if(typeof(timeIn) != "string")
            return res.status(400).send({status: false, message: "timeIn should be in String"});
    
        
        let getJdData = await employeeJdModel.findOne({employeeJdId:jdId});
        console.log(getJdData)
        if(!getJdData) return res.status(400).send({status: false, message:"No JD found"});
        console.log(getJdData)
        if(getJdData.logOut != "00:00") return res.status(400).send({status: false, message:"you have already logged out"});
        let createData = await hrModel.create(data)
        
        jdId = createData.employeeJdId = jdId; 
        employeeId = createData.employeeId=employeeId;
        let updatedData = await hrModel.findOneAndUpdate({designation:designation},{$set:{employeeJdId:jdId, employeeId:employeeId}},{new:true});
        console.log(updatedData,"updatedData")
        // res.send(updatedData)
        if(updatedData){
            const postData = {
                employeeJdId :"empJd_HKNcYUxQAx",
                isExtended :true
              };
            const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdGlvbklkIjoiNjRkZjQ3NWQ1NDc0MmY2MWFiNzhkZjI0IiwiZXhwIjoxNjkzMTI3MTQ4LCJpYXQiOjE2OTMwNDA3NDh9.QC2qRGNFD4BrO6miBgvhOCXCYAWPFBVo24n2_Vx1PaA'
            const headers = {  
                Authorization: `Bearer ${authToken}`
              };
              console.log(headers)
              
              const employeeId = "emp_ERRxKu65fT"        
            //   const postEndpoint = `http://localhost:3001/extendByHr/${employeeId}`;

                const response = await axios.post(`http://localhost:3001/extendByHr/${employeeId}`, postData, { headers });
                console.log("my response:", response.data, "some")
                // return response;

              // Construct the dynamic endpoint using string interpolation   
            //   const response = await axios.get(`http://localhost:3001/getExtendData/${employeeId}`, { headers });
            //   console.log(response.data)
    }
        console.log("somekkkkkkkkkkkkk")
        if(getJdData.requestDone === true) return res.status(200).send({status:true, message:"your time is extended !!!!"})
        if (getJdData.requestDone === false) return res.status(400).send({status:true, message:"your time isn't extended !!!!"})
        
    } 
    catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}

const getExtendData = async (req,res)=>{
    try{
        // let employeeId = req.params.normalEmployee;
        // let getData = await administrationModel.findOne({administrationId:employeeId});
        // if(!getData) return res.status(400).send({status: false, message:"No userData found"});
        let getAllData = await hrModel.find({isDeleted:false}); 
        if(getAllData.length === 0) return res.status(400).send({status: false, message:"No data found"});
        console.log(getAllData)
        res.status(200).send({status:true, message:"here's the data", data:getAllData})
        console.log("some")
    }
    catch (err) { return res.status(500).send({ status: false, message: err.message }) }

}

const extendByHr = async(req,res)=>{
    try{
        let data = req.body;
        let {employeeJdId, isExtended} = data;
        
        if(!employeeJdId)
        return res.status(400).send({status: false, message: "employeeJdId is required"});
    
        if (employeeJdId == "")
        return res.status(400).send({ status: false, message: "Please Enter employeeJdId value" });

        if(typeof(employeeJdId) != "string")
        return res.status(400).send({status: false, message: "employeeJdId should be in String"});

        console.log("somelllllllllll")

        if(typeof(isExtended) != "boolean")
        return res.status(400).send({status: false, message: "isExtended should be in boolean"});

            console.log(isExtended)
        let findData = await hrModel.findOneAndUpdate({employeeJdId:employeeJdId},{$set:{isExtendedByHR:isExtended}},{new:true});
       console.log("kkkkkkkkkkkkkk",findData)
        if(!findData) return res.status(400).send({status: false, message:"No data found"});
        if (findData.isExtendedByHR === true) {
            const updatedData = await employeeJdModel.findOneAndUpdate({employeeJdId:employeeJdId},{$set:{requestDone:true}},{new:true});
            console.log("update it to the true")
            res.status(200).send({status: false, message: "update it to the true", data:updatedData});
        }
        if (findData.isExtendedByHR === false) {
            const updatedData =await employeeJdModel.findOneAndUpdate({employeeJdId:employeeJdId},{$set:{requestDone:false}},{new:true});
            console.log("update it to the false")
            res.status(200).send({status: false, message: "update it to the false", data:updatedData});
            
        }

    }
    catch (err) { return res.status(500).send({ status: false, message: err.message }) }

}



module.exports = {extendByHr,getExtendData,requestForExtend,giveDataOfEmployee,createEmployeeJd, logOut/*thirtyMinTimesUp, fifteenMinTimesUp,extendTime*/,getWantedAdministrationList,getWantedListByDate};



 




























// var mongoose = require('mongoose');
// const { ObjectId } = require('mongodb');
// let employeeJdModel = require("../models/employeeJdModel");
// const administrationModel = require ('../models/administrationModel');
// let jwt = require("jsonwebtoken");
// let bcrypt = require('bcrypt');
// const { json } = require('express');

// const createEmployeeJd= async (req,res,next)=>{
//     try {
//         let employeeId = req.params.employeeID;
//         // console.log("employeeId",typeof(employeeId))
//         // const _id = mongoose.Types.ObjectId();
//         const _idssss = new ObjectId(employeeId);
//         // console.log("id",typeof(_idssss))
//         // console.log(_idssss)

//         let employeeJd = req.body;
//         console.log(employeeJd);
//         let {employeeName,Designation, timeIn,timeOut, preparedBy, jobRole, jobDescription}=employeeJd;

//         let names = await administrationModel.findById(_idssss).select({officerName:1,designation:1, _id:0});
//         console.log("populate ",names);

//         employeeName=employeeJd.employeeName= names.officerName;
//         Designation=employeeJd.Designation= names.designation;
//         preparedBy = employeeJd.preparedBy = names.officerName; 



//         let logInTime = new Date().getHours() + ":" + new Date().getMinutes() +":" + new Date().getSeconds() + ":"+ new Date().getMilliseconds();
//         timeIn = employeeJd.timeIn = logInTime;

//         if(!jobRole)
//         return res.status(400).send({status:false, message:"job role is required"});
//         // if(jobRole != "string")
//         // return res.status(400).send({status:false, message:"job role is required"});
//         if(jobRole == "")
//         return res.status(400).send({status:false, message:"job role is required"});

//         //______________________________________________________________________________

//         if(!jobDescription)
//         return res.status(400).send({status:false, message:"job Description is required bro2"});
//         // if(jobDescription != "string")
//         // return res.status(400).send({status:false, message:"job Description is required"});
//         if(jobDescription == "")
//         return res.status(400).send({status:false, message:"job Description is required bro"});
        
//         //______________________________________________________________________________
        
        
        
//         let createdJd = await employeeJdModel.create(employeeJd);
//         req.timeIn = timeIn;
//         // next()
//         return res.status(200).send({status:true, message:"JD Created", data:createdJd})

//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }
// }

// const timeOutHere = async(req,res)=>{

//     function myCallbackFunction() {
//         let logOutTime = new Date().getHours() + ":" + new Date().getMinutes() +":" + new Date().getSeconds() + ":"+ new Date().getMilliseconds();
//         timeOut = employeeJd.timeOut = logOutTime;
//         console.log(timeOut,"yup")
         
    
//         console.log("30 minutes have passed!");
//         // Add your desired actions here
//       }
//     //   let logInTime1 = new Date().getHours() + ":" + new Date().getMinutes() +":" + new Date().getSeconds() + ":"+ new Date().getMilliseconds();
//     //   console.log(logInTime1)
//       const thirtyMinutesInMilliseconds = 1 * 60 * 1000; // 30 minutes in milliseconds
//       setTimeout(myCallbackFunction, thirtyMinutesInMilliseconds);
// }

// const getJdData = async (req,res)=>{
//     try {
//         let adminData = await adminModel.findOne({});
//         return res.status(200).send({status: true, message: "get admin data", data: adminData})
//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }
// }


// module.exports = {createEmployeeJd};







































// let mongoose = require('mongoose')
// let employeeJdModel = require("../models/employeeJdModel");
// const administrationModel = require ('../models/administrationModel');
// let jwt = require("jsonwebtoken");
// let {ObjectId} = require('mongodb')
// let bcrypt = require('bcrypt');
// const { json } = require('express');
// const logOutModel = require('../models/logOutModel');

// function generateRandomString(length) {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       result += characters.charAt(randomIndex);
//     }
//     return result;
//   }
  



// const createEmployeeJd= async (req,res)=>{
//     try {
//         let employeeId = req.params.employeeId;
//         console.log(employeeId)
//                 // console.log("employeeId",typeof(employeeId))
//                 // const _id = mongoose.Types.ObjectId();
//                 // const _idssss = new ObjectId(employeeId);
//                 const _idssss = employeeId;
//                 // console.log("id",typeof(_idssss))
//                 // console.log(_idssss)
        
//                 let employeeJd = req.body;
//                 console.log(employeeJd);
//                 let {employeeJdId, employeeName,Designation,today, timeIn, preparedBy, jobRole, jobDescription}=employeeJd;
        
//                 let names = await administrationModel.findOne({administrationId : _idssss}).select({officerName:1,designation:1, _id:0});
//                 console.log("officer Name:",names.officerName)
//                 employeeName=employeeJd.employeeName= names.officerName;
//                 Designation=employeeJd.Designation= names.designation;
//                 preparedBy = employeeJd.preparedBy = names.officerName;

//                 let dated = new Date().getDate()
//                 let month = String(new Date().getMonth()+1)
//                 let year = new Date().getFullYear()
//                 let dates = year+"/"+month+"/"+dated;
//                 today = employeeJd.today = dates; 
        
//                  let logInTimeInMiliseconds = Date.now();
        
//                 let logInTime = new Date().getHours() + ":" + new Date().getMinutes();
//                 timeIn = employeeJd.timeIn = logInTime;
    
//                 //______________________________________________________________________________
                
//                 employeeJdId = employeeJd.employeeJdId = "empJd_"+generateRandomString(10);



//                 if(jobRole){
//                     console.log(typeof jobRole)
//                     if(jobRole == "")
//                     return res.status(400).send({status:false, message:"job role is required"});
//                     }
//                     //______________________________________________________________________________
            
//                     if(jobDescription){
//                     // if(jobDescription != "string")
//                     // return res.status(400).send({status:false, message:"job Description is required"});
//                     if(jobDescription == "")
//                     return res.status(400).send({status:false, message:"job Description is required bro"});
//                     }
//                     req.logInTimeInMiliseconds=logInTimeInMiliseconds;
                
//                 let createdJd = await employeeJdModel.create(employeeJd);
//                 req.timeIn = timeIn;
//                 // next()
//                 return res.status(201).send({status:true, message:"JD Created", data:createdJd})
//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }
// }

// const createEmployeeJdForNextTime= async (req,res)=>{
//     try {
//         let employeeId = req.params.employeeId;
//                 // console.log("employeeId",typeof(employeeId))
//                 // const _id = mongoose.Types.ObjectId();
//                 const _idssss = employeeId;
//                 // console.log("id",typeof(_idssss))
//                 // console.log(_idssss)
        
//                 let employeeJd = req.body;
//                 console.log(employeeJd);
//                 let {employeeJdId, today, timeIn, jobRole, jobDescription}=employeeJd;
//                 let dated = new Date().getDate()
//                 let month = String(new Date().getMonth()+1)
//                 let year = new Date().getFullYear()
//                 let dates = year+"/"+month+"/"+dated;
//                 today = employeeJd.today = dates; 
        
//                  let logInTimeInMiliseconds = Date.now();
        
//                 let logInTime = new Date().getHours() + ":" + new Date().getMinutes();
//                 timeIn = employeeJd.timeIn = logInTime;
    
//                 employeeJdId = employeeJd.employeeJdId = "empJd_"+generateRandomString(10);

//                 //______________________________________________________________________________
                
//                 if(jobRole){
//                     console.log(typeof jobRole)
//                     if(jobRole == "")
//                     return res.status(400).send({status:false, message:"job role is required"});
//                     }
//                     //______________________________________________________________________________
            
//                     if(jobDescription){
//                     // if(jobDescription != "string")
//                     // return res.status(400).send({status:false, message:"job Description is required"});
//                     if(jobDescription == "")
//                     return res.status(400).send({status:false, message:"job Description is required bro"});
//                     }
//                     req.logInTimeInMiliseconds=logInTimeInMiliseconds;
                
//                 let createdJd = await employeeJdModel.create(employeeJd);
//                 req.timeIn = timeIn;
//                 // next()
//                 return res.status(201).send({status:true, message:"JD Created for another Time", data:createdJd})
//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }
// }

// let userPressedLogout = false;
// //THIS IS BUTTON PRESSED BY USER HIMSELF

// // const logOut = async (req,res)=>{
// //         try {
// //             let jdId = req.params.jdId;
// //             let employeeJd = req.body;
// //             let {timeOut} = employeeJd;
// //             let showJd = await employeeJdModel.findById(jdId);
// //             if(!showJd) return res.status(404).send({status:false, message:"No Jd found"});
// //             if(!showJd.jobRole || !showJd.jobDescription) return res.status(400).send({status:false, message:"fill necessary info"});
// //             let logInTimeInMiliseconds= req.logInTimeInMiliseconds;
// //             let logOutTimeInMiliseconds = Date.now();

// //             let logOutTime = new Date().getHours() + ":" + new Date().getMinutes();
// //             timeOut = employeeJd.timeOut = logOutTime;
// //             userPressedLogout=true;
// //             // logInTimeInMiliseconds = Number(logInTimeInMiliseconds);
// //             // logOutTimeInMiliseconds= Number(logOutTimeInMiliseconds);
// //             // console.log(logOutTimeInMiliseconds - logInTimeInMiliseconds)
// //             // console.log(typeof (logOutTimeInMiliseconds))

// //             // let timeTakenForTask = (((logOutTimeInMiliseconds-logInTimeInMiliseconds)/1000)/100);
// //             // console.log(timeTakenForTask)
// //             // console.log(`${timeTakenForTask} minutes taken for the task`);
// //             let createLogOut= await logOutModel.create(employeeJd);
// //             return res.status(201).send({status:true, message:" logout done", data:createLogOut});
// //         } catch (error) {
// //         return res.status(500).send({status:false, message:error.message})
// //         }
// // }
// const logOut = async (req,res)=>{
//         try {
//             let jdId = req.params.jdId;
//             let employeeJd = req.body;
//             let showJd = await employeeJdModel.findOne({employeeJdId:jdId});
//             if(!showJd) return res.status(404).send({status:false, message:"No Jd found"});
//             if(!showJd.jobRole || !showJd.jobDescription) return res.status(400).send({status:false, message:"fill necessary info"});

//             let logOutTime = new Date().getHours() + ":" + new Date().getMinutes();
//             timeOut = employeeJd.timeOut = logOutTime;
//             console.log(timeOut)
//             userPressedLogout=true;
            
//             let createLogOut= await employeeJdModel.findOneAndUpdate({employeeJdId:jdId},{$set:{logOut:timeOut}},{new:true});
            
//             return res.status(200).send({status:true, message:" logout done", data:createLogOut});
//         } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//         }
// }
// //__________________________________________________________________________________________________


// let count = 0;

// function timeDone(duration,res){
//     let timerId;
//     function callBack(){
//         res.send("task time is over !!!")
       
//     }
//   const durationMilliseconds = duration * 60 * 1000; // Convert minutes to milliseconds
//    timerId = setTimeout(callBack, durationMilliseconds);
//     console.log(userPressedLogout)


  
// }
// const thirtyMinTimesUp = async (req,res)=>{
//     let jdId = req.params.jdId;
//     let showJd = await employeeJdModel.findOne({employeeJdId:jdId});
//     if(!showJd) return res.status(404).send({status:false, message:"No Jd found"});
//     let duration = 1;
//     timeDone(duration,res)
// }

// const fifteenMinTimesUp = async (req,res)=>{
//     let jdId = req.params.jdId;
//     if(count == 2)  return res.status(404).send({status:false, message:"your whole times up"});
//     count++;
//     let showJd = await employeeJdModel.findOne({employeeJdId:jdId});
//     if(!showJd) return res.status(404).send({status:false, message:"No Jd found"});
//     let duration = 1;
    
//     timeDone(duration,res)
// }

// //this is HR's api 
// const extendTime = async (req,res)=>{
//     try {
//         const employeeId = req.params.normalEmployee;
//       console.log(employeeId)
//        let employeeInfo =await administrationModel.findOne({administrationId:employeeId});
//        if(!employeeInfo) return res.status(400).send({status: false, message:"No user Found"})
//                 console.log("countssssssssssss",count)
//                 count--;
//                 console.log(count)
//                  let duration = 1;
//                  console.log("before");
//                 timeDone(duration,res)
//                 console.log("after");

//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }

// }

// //__________________________________________________________________________________________________
// //only for that day JD Data
// const getWantedAdministrationList = async (req,res)=>{
//     try{
//       const employeeId = req.params.normalEmployee;
//       console.log(employeeId)
//        let employeeInfo =await administrationModel.findOne({administrationId:employeeId});
//        if(!employeeInfo) return res.status(400).send({status: false, message:"No user Found"})
//        let dated = new Date().getDate()
//        let month = String(new Date().getMonth()+1)
//        let year = new Date().getFullYear()
//        let dates = year+"/"+month+"/"+dated; 
//       let getInfo = await employeeJdModel.find({today:dates});
//       console.log(getInfo, dates)
//       if(!getInfo)return res.status(400).send({status: false, message:"No Data Found of JD"})
//     res.status(200).send({status:true, message: "employees information ", data : getInfo })
//     }
//      catch (err) { return res.status(500).send({ status: false, message: err.message }) }
//   }
// //Datewise selected JD Data
// const getWantedListByDate = async (req,res)=>{
//     try{
//         let dates = req.body.date;
//       const employeeId = req.params.normalEmployee;
//       console.log(employeeId)
//       if(!dates) return res.status(400).send({status: false, message:"Send Data"})
//        let employeeInfo =await administrationModel.findOne({administrationId:employeeId});;
//        if(!employeeInfo) return res.status(400).send({status: false, message:"No user Found"})
       
//       let getInfo = await employeeJdModel.find({today:dates});
//       console.log(getInfo, dates)
//       if(!getInfo)return res.status(400).send({status: false, message:"No Data Found of JD"})
//     res.status(200).send({status:true, message: "employees informationsssss ", data : getInfo })
//     }
//      catch (err) { return res.status(500).send({ status: false, message: err.message }) }
//   }


// const getJdData = async (req,res)=>{
//     try {
//         let adminData = await adminModel.findOne({});
//         return res.status(200).send({status: true, message: "get admin data", data: adminData})
//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }
// }


// module.exports = {createEmployeeJd,createEmployeeJdForNextTime, logOut, thirtyMinTimesUp, fifteenMinTimesUp,extendTime,getWantedAdministrationList,getWantedListByDate};
































// var mongoose = require('mongoose');
// const { ObjectId } = require('mongodb');
// let employeeJdModel = require("../models/employeeJdModel");
// const administrationModel = require ('../models/administrationModel');
// let jwt = require("jsonwebtoken");
// let bcrypt = require('bcrypt');
// const { json } = require('express');

// const createEmployeeJd= async (req,res,next)=>{
//     try {
//         let employeeId = req.params.employeeID;
//         // console.log("employeeId",typeof(employeeId))
//         // const _id = mongoose.Types.ObjectId();
//         const _idssss = new ObjectId(employeeId);
//         // console.log("id",typeof(_idssss))
//         // console.log(_idssss)

//         let employeeJd = req.body;
//         console.log(employeeJd);
//         let {employeeName,Designation, timeIn,timeOut, preparedBy, jobRole, jobDescription}=employeeJd;

//         let names = await administrationModel.findById(_idssss).select({officerName:1,designation:1, _id:0});
//         console.log("populate ",names);

//         employeeName=employeeJd.employeeName= names.officerName;
//         Designation=employeeJd.Designation= names.designation;
//         preparedBy = employeeJd.preparedBy = names.officerName; 



//         let logInTime = new Date().getHours() + ":" + new Date().getMinutes() +":" + new Date().getSeconds() + ":"+ new Date().getMilliseconds();
//         timeIn = employeeJd.timeIn = logInTime;

//         if(!jobRole)
//         return res.status(400).send({status:false, message:"job role is required"});
//         // if(jobRole != "string")
//         // return res.status(400).send({status:false, message:"job role is required"});
//         if(jobRole == "")
//         return res.status(400).send({status:false, message:"job role is required"});

//         //______________________________________________________________________________

//         if(!jobDescription)
//         return res.status(400).send({status:false, message:"job Description is required bro2"});
//         // if(jobDescription != "string")
//         // return res.status(400).send({status:false, message:"job Description is required"});
//         if(jobDescription == "")
//         return res.status(400).send({status:false, message:"job Description is required bro"});
        
//         //______________________________________________________________________________
        
        
        
//         let createdJd = await employeeJdModel.create(employeeJd);
//         req.timeIn = timeIn;
//         // next()
//         return res.status(200).send({status:true, message:"JD Created", data:createdJd})

//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }
// }

// const timeOutHere = async(req,res)=>{

//     function myCallbackFunction() {
//         let logOutTime = new Date().getHours() + ":" + new Date().getMinutes() +":" + new Date().getSeconds() + ":"+ new Date().getMilliseconds();
//         timeOut = employeeJd.timeOut = logOutTime;
//         console.log(timeOut,"yup")
         
    
//         console.log("30 minutes have passed!");
//         // Add your desired actions here
//       }
//     //   let logInTime1 = new Date().getHours() + ":" + new Date().getMinutes() +":" + new Date().getSeconds() + ":"+ new Date().getMilliseconds();
//     //   console.log(logInTime1)
//       const thirtyMinutesInMilliseconds = 1 * 60 * 1000; // 30 minutes in milliseconds
//       setTimeout(myCallbackFunction, thirtyMinutesInMilliseconds);
// }

// const getJdData = async (req,res)=>{
//     try {
//         let adminData = await adminModel.findOne({});
//         return res.status(200).send({status: true, message: "get admin data", data: adminData})
//     } catch (error) {
//         return res.status(500).send({status:false, message:error.message})
//     }
// }


// module.exports = {createEmployeeJd};