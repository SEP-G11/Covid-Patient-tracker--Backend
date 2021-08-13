const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../service/user");
const user = new User();

exports.login = async (req, res) => {
  const result = await user.login(req.body);
  

  if (result.validationError)
    return res.status(400).json({
      success: 0,
      message: "Email is invalid. Enter a valid email address!",
    });

  if (result.connectionError)
    return res.status(500).json({
      success: 0,
      message: "Internal Server Error",
    });

  if (!result.allowAccess)
    return res.status(401).json({
      success: 0,
      message: "Access Denied! Unauthorized Client ",
    });

  const cookieOption = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  const payload = JSON.parse(JSON.stringify(result.tokenData));
  const token = jwt.sign(payload, config.get("jwtPrivateKey"));

  res
    .cookie("ets-auth-token", token, cookieOption)
    .status(200)
    .json({
      success: 1,     
      token: result.tokenData,
    });
};

exports.logout = (req, res) => {
  const cookieOption = {
    expires: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie("ets-auth-token", "", cookieOption).status(200).json({
    success: 1,
  });
};
