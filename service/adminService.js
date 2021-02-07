const pool = require("../config/database");

module.exports = {
  getNumberOfGuestPassengers: (start_date, end_date) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT count(*) as guest_count FROM flight_schedule natural join booking natural join user where date BETWEEN ? AND ? AND is_registered=0`,
        [start_date, end_date],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  getNumberOfRegisteredPassengers: (start_date, end_date) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT package_name,count(*) as num_of_passengers FROM flight_schedule natural join booking natural join profile where date BETWEEN ? AND ? group by package_name`,
        [start_date, end_date],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  getAllPassFlights: (origin, destination) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM flight_schedule natural join route where date<CURDATE() and origin=? and destination=?`,
        [origin, destination],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  getPassengerCount: (origin, destination) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select count(*) as pass_count from booking natural join flight_schedule natural join route where date<CURDATE() and origin=? and destination=?`,
        [origin, destination],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
    },
  
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
