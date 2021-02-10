const {
  getNumberOfGuestPassengers,
  getNumberOfRegisteredPassengers,
  getAllPassFlights,
  getPassengerCount,
  getPassBelowAgeDetails,
  getPassAboveAgeDetails,
  getPassDesCount,
} = require("../service/adminService");

module.exports = {

  // To find all passengers ( below age 18,above age 18 )for given flight id
  getPassBelowAgeDetails: (req, res) => {
    const flight_id = req.params.flight_id;
    getPassBelowAgeDetails(flight_id, (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          sucess: 0,
          message: "Invalid Flight ID",
        });
      } else {
        res.json({
          sucess: 1,
          data: result,
        });
      }
    });
  },

  getPassAboveAgeDetails: (req, res) => {
    const flight_id = req.params.flight_id;
    getPassAboveAgeDetails(flight_id, (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          sucess: 0,
          message: "Invalid Flight ID",
        });
      } else {
        res.json({
          sucess: 1,
          data: result,
        });
      }
    });
  },
  // To number of passengers travelling to a given destination and date range
  getPassDesCount: (req, res) => {
    const body = req.body;  
    getPassDesCount(
      body.start_date,
      body.end_date,
      body.destination,
      (err, result) => {
        if (err) {
          console.log(err);
          res.json({
            sucess: 0,
            message: "Invalid Destination or Date Range",
          });
        } else {
          res.json({
            sucess: 1,
            data: result,
          });
        }
      }
    );
  },
};
