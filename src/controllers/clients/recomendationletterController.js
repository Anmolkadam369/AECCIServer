let mongoose = require('mongoose')
let recomendationLetterModel = require("../../models/clients/recommendationLetterModel");
const clientModel = require('../../models/clients/clientModel');

const createRecomendationLetter =async (req, res) => {
    try {
        let companyId = req.params.companyId;
        let recomendationLetter = req.body;
        let { companyName, MemberShipNo, region, country, addressesTo, fullAddress, applicantName, designation, purposeOfVisit, passportNo, DateOfIssue,DateOfExpiry, requestingLetter, invitationLetter, passportCopy, EPLastYear, companyProfile, bankGurantee, ITR, SalaryCertificate, comauthrepresentative, signofrepresentative,paymentStruture,deliveryMode } = recomendationLetter;
        
        let getCompanyDetails = await clientModel.findById(companyId);
        if (!getCompanyDetails)return res.status(404).send({ status: false, message: "no Company Found" });
        companyName = recomendationLetter.companyName = getCompanyDetails.companyName;
        
        fullAddress = recomendationLetter.fullAddress = getCompanyDetails.address1;
        
        MemberShipNo =  recomendationLetter.MemberShipNo =  getCompanyDetails.memberShipNo;

        for(let i=0; i<req.document.length; i++){
            if(req.document[i].docName === "requestingLetter") 
            requestingLetter = recomendationLetter.requestingLetter = req.document[i].docLink;

            if(req.document[i].docName === "invitationLetter") 
            invitationLetter = recomendationLetter.invitationLetter = req.document[i].docLink;

            if(req.document[i].docName === "passportCopy") 
            passportCopy = recomendationLetter.passportCopy = req.document[i].docLink;

            if(req.document[i].docName === "companyProfile") 
            companyProfile = recomendationLetter.companyProfile = req.document[i].docLink;

            if(req.document[i].docName === "ITR") 
            ITR = recomendationLetter.ITR = req.document[i].docLink;

            if(req.document[i].docName === "SalaryCertificate") 
            SalaryCertificate = recomendationLetter.SalaryCertificate = req.document[i].docLink;

            if(req.document[i].docName === "comauthrepresentative") 
            comauthrepresentative = recomendationLetter.comauthrepresentative = req.document[i].docLink;

            if(req.document[i].docName === "signofrepresentative") 
            signofrepresentative = recomendationLetter.signofrepresentative = req.document[i].docLink;
        }
        
        //__________________________________________________________________________________________________________
        if (!region)
            return res.status(400).send({ status: false, message: "region is required" });

        if (typeof (region) != "string")
            return res.status(400).send({ status: false, message: "region should be in String" });

        if (region == "")
            return res.status(400).send({ status: false, message: "Please Enter region value" });
        //__________________________________________________________________________________________________________
        if (!country)
            return res.status(400).send({ status: false, message: "country is required" });

        if (typeof (country) != "string")
            return res.status(400).send({ status: false, message: "country should be in String" });

        if (country == "")
            return res.status(400).send({ status: false, message: "Please Enter country value" });
        //__________________________________________________________________________________________________________
        if (!addressesTo)
            return res.status(400).send({ status: false, message: "addressesTo is required" });

        if (typeof (addressesTo) != "string")
            return res.status(400).send({ status: false, message: "addressesTo should be in String" });

        if (addressesTo == "")
            return res.status(400).send({ status: false, message: "Please Enter addressesTo value" });
        //__________________________________________________________________________________________________________
        
        //__________________________________________________________________________________________________________

        if (!applicantName)
            return res.status(400).send({ status: false, message: "applicantName is required" });

        if (typeof (applicantName) != "string")
            return res.status(400).send({ status: false, message: "applicantName should be in String" });

        if (applicantName == "")
            return res.status(400).send({ status: false, message: "Please Enter applicantName value" });
        //__________________________________________________________________________________________________________

        if (!designation)
            return res.status(400).send({ status: false, message: "designation is required" });

        if (typeof (designation) != "string")
            return res.status(400).send({ status: false, message: "designation should be in String" });

        if (designation == "")
            return res.status(400).send({ status: false, message: "Please Enter designation value" });
        //__________________________________________________________________________________________________________


        if (!purposeOfVisit)
            return res.status(400).send({ status: false, message: "purposeOfVisit is required" });

        if (typeof (purposeOfVisit) != "string")
            return res.status(400).send({ status: false, message: "purposeOfVisit should be in String" });

        if (purposeOfVisit == "")
            return res.status(400).send({ status: false, message: "Please Enter purposeOfVisit value" });
        //__________________________________________________________________________________________________________

        if (!passportNo)
            return res.status(400).send({ status: false, message: "passportNo is required" });

        if (typeof (passportNo) != "string")
            return res.status(400).send({ status: false, message: "passportNo should be in String" });

        if (passportNo == "")
            return res.status(400).send({ status: false, message: "Please Enter passportNo value" });
        //__________________________________________________________________________________________________________

        if (!DateOfIssue)
            return res.status(400).send({ status: false, message: "DateOfIssue is required" });

        if (typeof (DateOfIssue) != "string")
            return res.status(400).send({ status: false, message: "DateOfIssue should be in String" });

        if (DateOfIssue == "")
            return res.status(400).send({ status: false, message: "Please Enter DateOfIssue value" });
        //__________________________________________________________________________________________________________

        if (!DateOfExpiry)
        return res.status(400).send({ status: false, message: "DateOfExpiry is required" });

    if (typeof (DateOfExpiry) != "string")
        return res.status(400).send({ status: false, message: "DateOfExpiry should be in String" });

    if (DateOfExpiry == "")
        return res.status(400).send({ status: false, message: "Please Enter DateOfExpiry value" });
    //__________________________________________________________________________________________________________

        //__________________________________________________________________________________________________________

        if (!invitationLetter)
            return res.status(400).send({ status: false, message: "invitationLetter is required" });

        if (typeof (invitationLetter) != "string")
            return res.status(400).send({ status: false, message: "invitationLetter should be in String" });

        if (invitationLetter == "")
            return res.status(400).send({ status: false, message: "Please Enter invitationLetter value" });
        //__________________________________________________________________________________________________________
        if (!passportCopy)
            return res.status(400).send({ status: false, message: "passportCopy is required" });

        if (typeof (passportCopy) != "string")
            return res.status(400).send({ status: false, message: "passportCopy should be in String" });

        if (passportCopy == "")
            return res.status(400).send({ status: false, message: "Please Enter passportCopy value" });
        //__________________________________________________________________________________________________________
        // if (!adharcard)
        //     return res.status(400).send({ status: false, message: "adharcard is required" });

        // if (typeof (adharcard) != "string")
        //     return res.status(400).send({ status: false, message: "adharcard should be in String" });

        // if (adharcard == "")
        //     return res.status(400).send({ status: false, message: "Please Enter adharcard value" });
        //__________________________________________________________________________________________________________
        // if (!EPLastYear)
        //     return res.status(400).send({ status: false, message: "EPLastYear is required" });

        // if (typeof (EPLastYear) != "string")
        //     return res.status(400).send({ status: false, message: "EPLastYear should be in String" });

        // if (EPLastYear == "")
        //     return res.status(400).send({ status: false, message: "Please Enter EPLastYear value" });
        //__________________________________________________________________________________________________________
        if (!companyProfile)
            return res.status(400).send({ status: false, message: "companyProfile is required" });

        if (typeof (companyProfile) != "string")
            return res.status(400).send({ status: false, message: "companyProfile should be in String" });

        if (companyProfile == "")
            return res.status(400).send({ status: false, message: "Please Enter companyProfile value" });
        
        
        
            //__________________________________________________________________________________________________________
        if(designation != "General Manager" && (ITR ||SalaryCertificate||comauthrepresentative|| signofrepresentative)) return res.status(400).send({status:false, message:"you cannot fill this part"})
        if(designation === "General Manager" ){
        if (ITR) {

            if (typeof (ITR) != "string")
                return res.status(400).send({ status: false, message: "ITR should be in String" });

            if (ITR == "")
                return res.status(400).send({ status: false, message: "Please Enter ITR value" });
        }
        //__________________________________________________________________________________________________________
        if (SalaryCertificate) {

            if (typeof (SalaryCertificate) != "string")
                return res.status(400).send({ status: false, message: "SalaryCertificate should be in String" });

            if (SalaryCertificate == "")
                return res.status(400).send({ status: false, message: "Please Enter SalaryCertificate value" });
        }
        //__________________________________________________________________________________________________________
        if (comauthrepresentative) {

            if (typeof (comauthrepresentative) != "string")
                return res.status(400).send({ status: false, message: "comauthrepresentative should be in String" });

            if (comauthrepresentative == "")
                return res.status(400).send({ status: false, message: "Please Enter comauthrepresentative value" });
        }
        //__________________________________________________________________________________________________________
        if (signofrepresentative) {

            if (typeof (signofrepresentative) != "string")
                return res.status(400).send({ status: false, message: "signofrepresentative should be in String" });

            if (signofrepresentative == "")
                return res.status(400).send({ status: false, message: "Please Enter signofrepresentative value" });
        }
        //__________________________________________________________________________________________________________
        if (paymentStruture) {

            if (typeof (paymentStruture) != "string")
                return res.status(400).send({ status: false, message: "paymentStruture should be in String" });

            if (paymentStruture == "")
                return res.status(400).send({ status: false, message: "Please Enter paymentStruture value" });
            
            if (paymentStruture == "")
                return res.status(400).send({ status: false, message: "Please Enter paymentStruture value" });
            
            if(paymentStruture!==region) return res.status(400).send({ status: false, message: "Please Enter valid paymentStruture value" });
        }

        if (deliveryMode) {
            if (typeof (deliveryMode) != "string")
                return res.status(400).send({ status: false, message: "deliveryMode should be in String" });

            if (deliveryMode == "")
                return res.status(400).send({ status: false, message: "Please Enter deliveryMode value" });
            
            if (deliveryMode == "")
                return res.status(400).send({ status: false, message: "Please Enter deliveryMode value" });
            
        }

    }
        const recomendationLetterCreated = await recomendationLetterModel.create(recomendationLetter);
        return res.status(201).send({ status: true, message: "successfully", data: recomendationLetterCreated })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const viewData = async (req, res) => {
    try {
        let id = req.params.id;
        let wannaViewrequestingLetter = req.params.requestingLetter;
        let wannaViewinvitationLetter = req.params.invitationLetter;
        
        let isAvailable = await recomendationLetterModel.findById(id);
        if (!isAvailable) return res.status(404).send({ status: false, message: "No data found" });
        if(wannaViewinvitationLetter){
            getLetter = isAvailable.invitationLetter
            return res.status(200).send({ status: true, message: "successful", data: getLetter })
        }
        if(wannaViewrequestingLetter){
            getLetter = isAvailable.requestingLetter;
            return res.status(200).send({ status: true, message: "successful", data: getLetter })
        }
        

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const updateData = (req, res) => {
    try {
        let id = req.params.id;

        let recomendationLetter = req.body;
        let { companyName, MemberShipNo, region, country, addressesTo, fullAddress, applicantName, designation, causeOfVisit, passportNo, DateOfIssue, requestingLetter, invitationLetter, passportCopy, EPLastYear, companyProfile, bankGurantee, ITR, SalaryCertificate, comauthrepresentative, signofrepresentative } = recomendationLetter;

        if (companyName) {

            if (typeof (companyName) != "string")
                return res.status(400).send({ status: false, message: "companyName should be in String" });

            if (companyName == "")
                return res.status(400).send({ status: false, message: "Please Enter companyName value" });
        }
        //__________________________________________________________________________________________________________
        if (MemberShipNo) {

            if (typeof (MemberShipNo) != "string")
                return res.status(400).send({ status: false, message: "MemberShipNo should be in String" });

            if (MemberShipNo == "")
                return res.status(400).send({ status: false, message: "Please Enter MemberShipNo value" });
        }
        //__________________________________________________________________________________________________________
        if (region) {

            if (typeof (region) != "string")
                return res.status(400).send({ status: false, message: "region should be in String" });

            if (region == "")
                return res.status(400).send({ status: false, message: "Please Enter region value" });
        }
        //__________________________________________________________________________________________________________
        if (country) {

            if (typeof (country) != "string")
                return res.status(400).send({ status: false, message: "country should be in String" });

            if (country == "")
                return res.status(400).send({ status: false, message: "Please Enter country value" });
        }
        //__________________________________________________________________________________________________________
        if (addressesTo) {

            if (typeof (addressesTo) != "string")
                return res.status(400).send({ status: false, message: "addressesTo should be in String" });

            if (addressesTo == "")
                return res.status(400).send({ status: false, message: "Please Enter addressesTo value" });
        }
        //__________________________________________________________________________________________________________
        if (fullAddress) {

            if (typeof (fullAddress) != "string")
                return res.status(400).send({ status: false, message: "fullAddress should be in String" });

            if (fullAddress == "")
                return res.status(400).send({ status: false, message: "Please Enter fullAddress value" });
        }
        //__________________________________________________________________________________________________________

        if (applicantName) {

            if (typeof (applicantName) != "string")
                return res.status(400).send({ status: false, message: "applicantName should be in String" });

            if (applicantName == "")
                return res.status(400).send({ status: false, message: "Please Enter applicantName value" });
        }
        //__________________________________________________________________________________________________________

        if (designation) {

            if (typeof (designation) != "string")
                return res.status(400).send({ status: false, message: "designation should be in String" });

            if (designation == "")
                return res.status(400).send({ status: false, message: "Please Enter designation value" });
        }
        //__________________________________________________________________________________________________________

        if (causeOfVisit) {

            if (typeof (causeOfVisit) != "string")
                return res.status(400).send({ status: false, message: "causeOfVisit should be in String" });

            if (causeOfVisit == "")
                return res.status(400).send({ status: false, message: "Please Enter causeOfVisit value" });
        }
        //__________________________________________________________________________________________________________

        if (passportNo) {

            if (typeof (passportNo) != "string")
                return res.status(400).send({ status: false, message: "passportNo should be in String" });

            if (passportNo == "")
                return res.status(400).send({ status: false, message: "Please Enter passportNo value" });
        }
        //__________________________________________________________________________________________________________

        if (DateOfIssue) {

            if (typeof (DateOfIssue) != "string")
                return res.status(400).send({ status: false, message: "DateOfIssue should be in String" });

            if (DateOfIssue == "")
                return res.status(400).send({ status: false, message: "Please Enter DateOfIssue value" });
        }
        //__________________________________________________________________________________________________________

        if (requestingLetter) {

            if (typeof (requestingLetter) != "string")
                return res.status(400).send({ status: false, message: "requestingLetter should be in String" });

            if (requestingLetter == "")
                return res.status(400).send({ status: false, message: "Please Enter requestingLetter value" });
        }
        //__________________________________________________________________________________________________________

        if (invitationLetter) {

            if (typeof (invitationLetter) != "string")
                return res.status(400).send({ status: false, message: "invitationLetter should be in String" });

            if (invitationLetter == "")
                return res.status(400).send({ status: false, message: "Please Enter invitationLetter value" });
        }
        //__________________________________________________________________________________________________________
        if (passportCopy) {

            if (typeof (passportCopy) != "string")
                return res.status(400).send({ status: false, message: "passportCopy should be in String" });

            if (passportCopy == "")
                return res.status(400).send({ status: false, message: "Please Enter passportCopy value" });
        }
        //__________________________________________________________________________________________________________
        if (adharcard) {

            if (typeof (adharcard) != "string")
                return res.status(400).send({ status: false, message: "adharcard should be in String" });

            if (adharcard == "")
                return res.status(400).send({ status: false, message: "Please Enter adharcard value" });
        }
        //__________________________________________________________________________________________________________
        if (EPLastYear) {

            if (typeof (EPLastYear) != "string")
                return res.status(400).send({ status: false, message: "EPLastYear should be in String" });

            if (EPLastYear == "")
                return res.status(400).send({ status: false, message: "Please Enter EPLastYear value" });
        }
        //__________________________________________________________________________________________________________
        if (companyProfile) {

            if (typeof (companyProfile) != "string")
                return res.status(400).send({ status: false, message: "companyProfile should be in String" });

            if (companyProfile == "")
                return res.status(400).send({ status: false, message: "Please Enter companyProfile value" });
        }
        //__________________________________________________________________________________________________________
        if (bankGurantee) {

            if (typeof (bankGurantee) != "string")
                return res.status(400).send({ status: false, message: "bankGurantee should be in String" });

            if (bankGurantee == "")
                return res.status(400).send({ status: false, message: "Please Enter bankGurantee value" });
        }
        //__________________________________________________________________________________________________________
        if (ITR) {

            if (typeof (ITR) != "string")
                return res.status(400).send({ status: false, message: "ITR should be in String" });

            if (ITR == "")
                return res.status(400).send({ status: false, message: "Please Enter ITR value" });
        }
        //__________________________________________________________________________________________________________
        if (SalaryCertificate) {

            if (typeof (SalaryCertificate) != "string")
                return res.status(400).send({ status: false, message: "SalaryCertificate should be in String" });

            if (SalaryCertificate == "")
                return res.status(400).send({ status: false, message: "Please Enter SalaryCertificate value" });
        }
        //__________________________________________________________________________________________________________
        if (comauthrepresentative) {

            if (typeof (comauthrepresentative) != "string")
                return res.status(400).send({ status: false, message: "comauthrepresentative should be in String" });

            if (comauthrepresentative == "")
                return res.status(400).send({ status: false, message: "Please Enter comauthrepresentative value" });
        }
        //__________________________________________________________________________________________________________
        if (signofrepresentative) {

            if (typeof (signofrepresentative) != "string")
                return res.status(400).send({ status: false, message: "signofrepresentative should be in String" });

            if (signofrepresentative == "")
                return res.status(400).send({ status: false, message: "Please Enter signofrepresentative value" });
        }

        const recomendationLetterupdated = recomendationLetterModel.findOneAndUpdate({ _id: id }, { companyName: companyName, MemberShipNo: MemberShipNo, region: region, country: country, addressesTo: addressesTo, fullAddress: fullAddress, applicantName: applicantName, designation: designation, causeOfVisit: causeOfVisit, passportNo: passportNo, DateOfIssue: DateOfIssue, requestingLetter: requestingLetter, invitationLetter: invitationLetter, passportCopy: passportCopy, adharcard: adharcard, EPLastYear: EPLastYear, companyProfile: companyProfile, bankGurantee: bankGurantee, ITR: ITR, SalaryCertificate: SalaryCertificate, comauthrepresentative: comauthrepresentative, signofrepresentative: signofrepresentative }, { new: true });
    return res.status(200).send({ status: true, message: "successfully ", data: recomendationLetterupdated });
} 
catch (error) {
    res.status(500).send({ status: false, message: error.message })
}

}
module.exports={createRecomendationLetter,viewData,updateData};