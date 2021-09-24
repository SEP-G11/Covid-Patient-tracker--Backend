const jwt = require("jsonwebtoken");
const config = require("config");
const { successMessage, errorMessage } = require("../utils/message-template");

exports.protect = (req,res,next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token,'somesupersecret');

      req.userID = decoded.userID;
      req.accType = decoded.accType;

      if (decoded.facilityId){
        req.facilityId = decoded.facilityId;
      }

      next();
    }
    catch (error) {
      console.error(error);
      return errorMessage(res,"Not authorized, token failed",401);
    }
  }

  if (!token){
    return errorMessage(res,"Not authenticated,no token",401);
  }
};



exports.authorize = (accTypes=[]) =>{
  return (req, res, next) => {
    if (accTypes.includes(req.accType)) {
      return next();
    } else {
      return errorMessage(res,"Not authorized.",401);
    }
  };
};
