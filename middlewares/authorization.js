const jwt = require("jsonwebtoken");
const config = require("config");

exports.tokenAuthorize = (req, res, next) => {
  const token = req.cookies["ets-auth-token"];
  if (!token)
    return res.status(401).json({
      sucess: 0,
      message: "Access Denied. No token provided",
    });
  
 
  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payload;
    next();
  } catch (ex) {
    res.status(400).json({
      sucess: 0,
      message: "Invalid token",
    });
  }
};


exports.isMohRole = (req, res, next) => {
  if (req.user["user_type"] === "MOH") {
    next();
  } else {
    res.status(403).json({
      sucess: 0,
      message: "Forbidden",
    });
  }
};

exports.isDoctorRole = (req, res, next) => {
  if (req.user["user_type"] === "DOC") {
    next();
  } else {
    res.status(403).json({
      sucess: 0,
      message: "Forbidden",
    });
  }
};

exports.isHospitalAdminRole = (req, res, next) => {
  if (req.user["user_type"] === "HA") {
    next();
  } else {
    res.status(403).json({
      sucess: 0,
      message: "Forbidden",
    });
  }
};




exports.isAlreadyLogin = (req, res, next) => {
  if (!req.cookies["ets-auth-token"]) {
    next();
  } else {
    res.status(400).json({
      sucess: 0,
      message: "You have already logged in",
    });
  }
};
