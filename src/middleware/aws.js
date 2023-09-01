const aws = require("aws-sdk");

aws.config.update({
    accessKeyId: "AKIAW5JTMXJ7MV4OL7BA",
    secretAccessKey: "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",
    region: "ap-northeast-1",
});

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        let s3 = new aws.S3({ apiVersion: "2006-03-01" });

        var uploadParams = {
            ACL: "public-read", //Access Control Locator
            Bucket: "aecci-bucket",
            Key: "abc/" + file.originalname,
            Body: file.buffer,
        };

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ error: err });
            }
            console.log("file uploaded succesfully");
            return resolve(data.Location);
        });
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

module.exports = { awsLinkProfile, awsLinkEmployeeSignature}