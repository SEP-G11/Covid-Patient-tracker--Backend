const e = require("express");
const {
  getFlightSchedule,
  getFlightInfo,
} = require("../service/flightService");

module.exports = {
  getSchedule: (req, res) => {
    console.log(req.user);
    getFlightSchedule((err, result) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(result)
        res.json({
          sucess: 1,
          data: result,
          messege: "Loggedin User flight scedule",
        });
      }
    });
  },
  getFlightInfo: (req, res) => {
    console.log(req.params.flight_id);
    getFlightInfo(req.params.flight_id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result) {
          res.json({
            sucess: 1,
            data: result,
          });
        } else {
          res.json({
            sucess: 0,
            message: "Invalid Flight ID",
          });
        }
      }
    });
  },
  getSeatPrice: (req, res) => {
    console.log(req.params.flight_id);
    console.log(req.params.seat_id);
  },
};
