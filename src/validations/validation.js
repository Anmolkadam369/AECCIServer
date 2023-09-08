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
  
  //Pincode
  
  const validatePincode = (pinCode) => {
    return /^[1-9][0-9]{5}$/.test(pinCode);
  };
  
  const validateTitle = (title) => {
    return /^([a-zA-Z\d ]){2,30}$/.test(title) 
  }
  

  
  module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    validateMobileNo,
    validatePincode,
    validateTitle
  };