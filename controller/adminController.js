const {
  getNumberOfGuestPassengers,
  getNumberOfRegisteredPassengers,
  getAllPassFlights,
  getPassengerCount,
  getPassAgeDetails,
  getPassDesCount,
} = require("../service/adminService");

module.exports = {
  getGuestCount: async (req, res) => {
    const body = req.body;
    Details = await getNumberOfGuestPassengers(body.start_date, body.end_date);
    console.log(Details);
    return res.json({
      success: 1,
      data: { Details },
    });
  },

  getRegCount: async (req, res) => {
    const body = req.body;
    Details = await getNumberOfRegisteredPassengers(
      body.start_date,
      body.end_date
    );
    console.log(Details);
    return res.json({
      success: 1,
      data: { Details },
    });
  },

  getFlights: async (req, res) => {
    const body = req.body;
    Details = await getAllPassFlights(body.origin, body.destination);
    console.log(Details);
    return res.json({
      success: 1,
      data: { Details },
    });
  },

  getPassCount: async (req, res) => {
    const body = req.body;
    Details = await getPassengerCount(body.origin, body.destination);
    console.log(Details);
    return res.json({
      success: 1,
      data: { Details },
    });
  },

  // To find all passengers ( below age 18,above age 18 )for given flight id
  getPassAgeDetails: (req, res) => {
    const flight_id = req.params.flight_id;
    getPassAgeDetails(flight_id, (err, result) => {
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
