const { verify } = require("jsonwebtoken");
const { getFlightInfo } = require("../service/flightService");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: err.message,
          });
        } else {
          req.user = decoded.result;
          next();
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access denied ! No token",
      });
    }
  },
  setUserIfLoggedIn: async (req, res, next) => {
    let token = req.get("authorization");
    const result = await getFlightInfo(req.params.flight_id);
    if (token) {
      token = token.slice(7);
      verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: err.message,
          });
        } else {
          req.user = decoded.result;
          const seat_data = result[0].seat_info;
          if (req.params.seat_id) {
            req.seat_data = seat_data[req.params.seat_id].isAvailable;
          }
          next();
        }
      });
    } else {
      next();
    }
  },
};
