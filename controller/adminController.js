const {
  getNumberOfGuestPassengers,
  getNumberOfRegisteredPassengers,
  getAllPassFlights,
  getPassengerCount,
  getPassAboveAgeDetails,
  getPassBelowAgeDetails,
  getTotalRevenueOfAircraft,
  getPassDesCount,
  updateDelays,
  createFlight
} = require("../service/adminService");

module.exports = {
  getGuestCount: (req, res) => {
    const body = req.body;
    getNumberOfGuestPassengers(
      body.start_date,
      body.end_date,
      (err, result) => {
        if (err) {
          res.json({
            sucess: 0,
            message: "Invalid Date Range",
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

  getRegCount: (req, res) => {
    const body = req.body;
    getNumberOfRegisteredPassengers(
      body.start_date,
      body.end_date,
      (err, result) => {
        if (err) {
          res.json({
            sucess: 0,
            message: "Invalid Date Range",
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

  getFlights: (req, res) => {
    const body = req.body;
    getAllPassFlights(body.origin, body.destination, (err, result) => {
      if (err) {
        res.json({
          sucess: 0,
          message: "Invalid Origine or Destination",
        });
      } else {
        res.json({
          sucess: 1,
          data: result,
        });
      }
    });
  },

  getPassCount: (req, res) => {
    const body = req.body;
    getPassengerCount(body.origin, body.destination, (err, result) => {
      if (err) {
        res.json({
          sucess: 0,
          message: "Invalid Origine or Destination",
        });
      } else {
        res.json({
          sucess: 1,
          data: result,
        });
      }
    });
  },

  // To find all passengers ( below age 18,above age 18 )for given flight id
  getPassBelowAgeDetails: (req, res) => {
    const flight_id = req.params.flight_id;
    getPassBelowAgeDetails(flight_id, (err, result) => {
      if (err) {
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

  // To get the total revenue of  a given aircraft
  getTotalRevenueOfAircraft: (req, res) => {
    const aircraft_id = req.params.aircraft_id;
    getTotalRevenueOfAircraft(aircraft_id,(err, result) => {
        if (err) {
          console.log(err);
          res.json({
            sucess: 0,
            message: "Invalid Aircraft ID",
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

  updateDelayDetails: (req, res) => {
    const body = req.body;
    updateDelays(
      body.date,
      body.start_time,
      body.end_time,
      body.flight_id,
      (err, result) => {
        if (err) {
          res.json({
            sucess: 0,
            message: "Invalid flight id",
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




  

 // To create flight
 createFlight  : (req, res) => {
    const body = req.body;
    createFlight(
      body.aircraft_id,
      body.date,
      body.start_time,
      body.end_time,
      body.route_id,
      (err, result) => {
        if (err) {
          res.json({
            sucess: 0,
            message: "Invalid Input",
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
