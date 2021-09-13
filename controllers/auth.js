const sequelize = require('../database/db');
var models = require("../service/init-models").initModels(sequelize);
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const config = require("config");
const { successMessage, errorMessage } = require("../utils/message-template");

var User = models.User;

function validateLogin(email,password) {
  const schema = Joi.object({
    email: Joi.string().email().trim().lowercase().required().label('Email'),
    password: Joi.required().label('Password')
  });
  return schema.validate({ email: email, password: password })
}


const login = async (req, res, next) => {
  const {email, password} = req.body;
  const { error, value } = validateLogin(email,password);
  if (error) {
    return errorMessage(res, error.details[0].message, 422);
  }
  let loadedUser;
  try {
    const result = await User.findOne({
      where: {
        email: value.email,
        is_deleted: 0
      }
    });
    if (!result) {
      return errorMessage(res, 'Incorrect email or password', 401);
    }
    loadedUser = result;
    const isEqual = await bcrypt.compare(password, result.password);
    
    if (!isEqual){
      return errorMessage(res, 'Incorrect email or password', 401);
    }
    const token = jwt.sign({
          email: loadedUser.email,
          userID: loadedUser.user_id.toString(),
          accType: loadedUser.user_type,
          expiresIn: 3600
        },
        'somesupersecret'                 //put in ENV
    );
    return successMessage(res, {
      id: loadedUser.user_id.toString(),
      email: loadedUser.email,
      accType: loadedUser.user_type,
      token: token
    }, 'Logged in successfully')
  }
  catch (err) {
    return errorMessage(res, 'Internal Server Error', 500);
  }
};


// exports.login = async (req, res) => {
//   const result = await user.login(req.body);
//
//
//   if (result.validationError)
//     return res.status(400).json({
//       success: 0,
//       message: "Email is invalid. Enter a valid email address!",
//     });
//
//   if (result.connectionError)
//     return res.status(500).json({
//       success: 0,
//       message: "Internal Server Error",
//     });
//
//   if (!result.allowAccess)
//     return res.status(401).json({
//       success: 0,
//       message: "Access Denied! Unauthorized Client ",
//     });
//
//   const cookieOption = {
//     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//   };
//
//   const payload = JSON.parse(JSON.stringify(result.tokenData));
//   const token = jwt.sign(payload, config.get("jwtPrivateKey"));
//
//   res
//     .cookie("ets-auth-token", token, cookieOption)
//     .status(200)
//     .json({
//       success: 1,
//       token: result.tokenData,
//     });
// };

// exports.logout = (req, res) => {
//   const cookieOption = {
//     expires: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//   };
//   res.cookie("ets-auth-token", "", cookieOption).status(200).json({
//     success: 1,
//   });
// };

module.exports = {
  login
};