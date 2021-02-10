const pool = require("../config/database");

module.exports = {

    // To find all passengers ( below age 18,above age 18 )for given flight id
  
    getPassAboveAgeDetails(flight_id, callback) {
    pool.query(
      `CALL passengers_above_18(?)`,
      [flight_id],
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, result[0]);
        }
      }
    );
    },
  
    getPassBelowAgeDetails(flight_id, callback) {
      pool.query(
        `CALL passengers_below_18(?)`,
        [flight_id],
        (err, result) => {
          if (err) {
            return callback(err);
          } else {
            return callback(null, result[0]);
          }
        }
      );
  },
    
     // To number of passengers travelling to a given destination and date range
  getPassDesCount(start_date, end_date, destination, callback) {
    pool.query(
      `select passengers_count_destination(?,?,?) as pass_des_count`,
      [start_date, end_date, destination],
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, result[0]);
        }
      }
    );
  },
};
