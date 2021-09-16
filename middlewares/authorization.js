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






// exports.tokenAuthorize = (req, res, next) => {
//   const token = req.cookies["ets-auth-token"];
//   if (!token)
//     return res.status(401).json({
//       success: 0,
//       message: "Access Denied. No token provided",
//     });
//
//
//   try {
//     const payload = jwt.verify(token, config.get("jwtPrivateKey"));
//     req.user = payload;
//     next();
//   } catch (ex) {
//     res.status(400).json({
//       success: 0,
//       message: "Invalid token",
//     });
//   }
// };
//
//
// exports.isMohRole = (req, res, next) => {
//   if (req.user["user_type"] === "MOH") {
//     next();
//   } else {
//     res.status(403).json({
//       success: 0,
//       message: "Forbidden",
//     });
//   }
// };
//
// exports.isDoctorRole = (req, res, next) => {
//   if (req.user["user_type"] === "DOC") {
//     next();
//   } else {
//     res.status(403).json({
//       success: 0,
//       message: "Forbidden",
//     });
//   }
// };
//
// exports.isHospitalAdminRole = (req, res, next) => {
//   if (req.user["user_type"] === "HA") {
//     next();
//   } else {
//     res.status(403).json({
//       success: 0,
//       message: "Forbidden",
//     });
//   }
// };
//
//
//
//
// exports.isAlreadyLogin = (req, res, next) => {
//   if (!req.cookies["ets-auth-token"]) {
//     next();
//   } else {
//     res.status(400).json({
//       success: 0,
//       message: "You have already logged in",
//     });
//   }
// };

//module.export = {protect};