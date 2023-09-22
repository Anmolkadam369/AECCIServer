const aws = require("aws-sdk");

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
});

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        let s3 = new aws.S3({ apiVersion: "2006-03-01" });
        console.log(process.env.BUCKET)
        var uploadParams = {
            ACL: "public-read", //Access Control Locator
            Bucket: process.env.BUCKET,
            Key: "abc/" + file.originalname,
            Body: file.buffer,
        };
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log({some:err})
                return reject({ error: err });
            }
            console.log("file uploaded succesfully");
            return resolve(data.Location);
        });
    });
};


const imagePreview = async (req, res) => {   //frontend will send request for preview of uploaded Image by sending bucket location and we are sending url 
    console.log("some")
    let s3 = new aws.S3({ apiVersion: "2006-03-01" });
    const params = {
        Bucket: 'aecci-bucket',
        Key: req.params[0],
        Expires: 60, // URL expiration time in seconds (adjust as needed)
    };
    
    s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ status:false, error: 'Failed to generate pre-signed URL' });
        }
        res.status(200).send ({status:true,  imageUrl: url });
    });
};


const awsLinkProfile = async (req, res, next) => {
    try {
        let profileImage = req.files;
        if (profileImage) {
            if (Object.keys(profileImage).length == 0) return res.status(400).send({ status: false, message: "Please upload Profile Image" });
            let image = await uploadFile(profileImage[0]);
            req.image = image;
            next()
        }
        else {
            return res.status(400).send({ status: false, message: "Please upload Profile Image" });
        }
    }
    catch (err) { return res.status(500).send({ status: false, error: err.message }) }
}

const awsLinkEmployeeSignature = async (req, res, next) => {
    try {
        let signature = req.files;
        if (signature) {
            if (Object.keys(signature).length == 0) return res.status(400).send({ status: false, message: "Please upload Profile Image" });
            let image = await uploadFile(signature[0]);
            req.image = image;
            next()
        }
        else {
            return res.status(400).send({ status: false, message: "Please upload Profile Image" });
        }
    }
    catch (err) { return res.status(500).send({ status: false, error: err.message }) }
}

const awsDoc = async (req, res, next) => {
    try {
        let doc = req.files;
        console.log("ansssssssssssss                       ", req.files)
        console.log("ansssssssssssss                       ", req.files[0].size)
        // return res.json({some:"none"})
        if(req.files[0].size > 5048576) return res.status(400).send({ status: false, message: "file size must not be more than 5MB" });
        if (doc) {
            if (Object.keys(doc).length == 0) return res.status(400).send({ status: false, message: "Please upload document" });
            let document = await uploadFile(doc[0]);
            req.document = document;
            next()
        }
        else {
            return res.status(400).send({ status: false, message: "Please upload document" });
        }
    }
    catch (err) { return res.status(500).send({ status: false, error: err.message }) }
}

const recoDoc = async (req, res, next) => {
    try {
        let designation = req.body.designation;
        let doc = req.files;
        
        if (Object.keys(doc).length == 0) return res.status(400).send({ status: false, message: "Please upload documentsss" });
        
        let expectedFieldNames = ["requestingLetter","invitationLetter","passportCopy","companyProfile"]
        let expectedFieldNamesForManager = [...expectedFieldNames, "ITR","SalaryCertificate","comauthrepresentative","signofrepresentative"]
        
        if((designation === "General Manager" && req.files.length === 8) || (designation !== "General Manager" && req.files.length === 4)){
            
            for(let i=0; i<req.files.length; i++){
                if(req.files[i].size > 5048576) return res.status(400).send({ status: false, message: `${req.files[i]}'s size must not be more than 5MB` });
            }
            
        let count=0;
        
        if(req.files.length === 4){
            for(let i=0, j=0; i<req.files.length, j<expectedFieldNames.length; j++,i++){
                console.log(req.files[i].fieldname, expectedFieldNames[j],j)
                    if(req.files[i].fieldname !== expectedFieldNames[j]) count++;
                console.log("count                 ",count)
                if(count>=1) return res.status(400).send({status:false, message:"send proper Data 1"})
            }
        }

        if(req.files.length === 8){ 
                    for(let i=0, j=0; i<req.files.length, j<expectedFieldNamesForManager.length; j++,i++){
                    console.log(req.files[i].fieldname, expectedFieldNamesForManager[j],j)
                        if(req.files[i].fieldname !== expectedFieldNamesForManager[j]) count++;
                    console.log("count                 ",count)
                    if(count>=1) return res.status(400).send({status:false, message:"send proper Data 2"})
                }
            }

        if (doc) {
        let documentsArray=[];
        for(let i=0; i<req.files.length; i++){
            let docName = doc[i].fieldname;
            let docLink = await uploadFile(req.files[i]);
            documentsArray.push({docName,docLink})
        }
        req.document = documentsArray;
        console.log("document          ",req.document)
        next()
        }
        else {
            return res.status(400).send({ status: false, message: "Please upload document" });
        }
    }
    else return res.status(400).send({ status: false, message: "upload Given Documents" });
    }
    catch (err) { return res.status(500).send({ status: false, error: err.message }) }
}


const signUpDoc = async (req, res, next) => {
    try {
        let designation = req.body.designation;
        let doc = req.files;
        
        if (Object.keys(doc).length == 0) return res.status(400).send({ status: false, message: "Please upload documentsss" });
        
        let expectedFieldNames = ["requestingLetter","invitationLetter","passportCopy","companyProfile"]
        let expectedFieldNamesForManager = [...expectedFieldNames, "ITR","SalaryCertificate","comauthrepresentative","signofrepresentative"]
        
        if((designation === "General Manager" && req.files.length === 8) || (designation !== "General Manager" && req.files.length === 4)){
            
            for(let i=0; i<req.files.length; i++){
                if(req.files[i].size > 5048576) return res.status(400).send({ status: false, message: `${req.files[i]}'s size must not be more than 5MB` });
            }
            
        let count=0;
        
        if(req.files.length === 4){
            for(let i=0, j=0; i<req.files.length, j<expectedFieldNames.length; j++,i++){
                console.log(req.files[i].fieldname, expectedFieldNames[j],j)
                    if(req.files[i].fieldname !== expectedFieldNames[j]) count++;
                console.log("count                 ",count)
                if(count>=1) return res.status(400).send({status:false, message:"send proper Data 1"})
            }
        }

        if(req.files.length === 8){ 
                    for(let i=0, j=0; i<req.files.length, j<expectedFieldNamesForManager.length; j++,i++){
                    console.log(req.files[i].fieldname, expectedFieldNamesForManager[j],j)
                        if(req.files[i].fieldname !== expectedFieldNamesForManager[j]) count++;
                    console.log("count                 ",count)
                    if(count>=1) return res.status(400).send({status:false, message:"send proper Data 2"})
                }
            }

        if (doc) {
        let documentsArray=[];
        for(let i=0; i<req.files.length; i++){
            let docName = doc[i].fieldname;
            let docLink = await uploadFile(req.files[i]);
            documentsArray.push({docName,docLink})
        }
        req.document = documentsArray;
        console.log("document          ",req.document)
        next()
        }
        else {
            return res.status(400).send({ status: false, message: "Please upload document" });
        }
    }
    else return res.status(400).send({ status: false, message: "upload Given Documents" });
    }
    catch (err) { return res.status(500).send({ status: false, error: err.message }) }
}
module.exports = { awsLinkProfile, awsLinkEmployeeSignature ,imagePreview,awsDoc,recoDoc}