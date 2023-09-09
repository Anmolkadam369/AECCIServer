//Name

const validateName = (name) => {
    return /^([a-zA-Z ]){2,30}$/.test(name);
  };
  
  // Email
  
  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
  };
  
  //Password
  
  const validatePassword = (password) => {
    //8-15 characters, one lowercase letter and one number and maybe one UpperCase & special character:
    return /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,15}$/.test(password);
  };
  
  //Phone
  
  const validateMobileNo = (phoneNo) => {
    return /^[6789][0-9]{9}$/g.test(phoneNo);
    
  };
  
  const validateTelephoneNo = (telephoneNo)=>{
    return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
  }
  //Pincode
  
  const validatePincode = (pinCode) => {
    return /^[1-9][0-9]{5}$/.test(pinCode);
  };
  
  const validateTitle = (title) => {
    return /^([a-zA-Z\d ]){2,30}$/.test(title) 
  }
  
const validateWebsite = (websiteAdd)=>{
  return /^(https?:\/\/)?([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(\/\S*)?$/.test(websiteAdd)
}

const validateFacebook = (facebook) =>{
  return /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.]+$/.test(facebook)
}

const validateLinkedIn = (linkedIn) =>{
  return /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(facebook)
}
const validateTwitter = (twitter) =>{
  return /^https?:\/\/twitter\.com\/([a-zA-Z0-9_]+)\/?/.test(facebook)
}

  
  module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    validateMobileNo,
    validatePincode,
    validateTitle,
    validateTelephoneNo,
    validateWebsite,
    validateFacebook,
    validateLinkedIn,
    validateTwitter
  };