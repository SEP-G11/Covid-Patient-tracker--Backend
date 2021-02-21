const pool = require("../config/database");

module.exports = {
    getNumberOfGuestPassengers(start_date, end_date, callback) {
        pool.query(
          `select get_Number_Of_Guest_Passengers(?,?) as guest_count`,
          [start_date, end_date],
          (err, result) => {
            if (err) {
              return callback(err);
            } else {
              return callback(null, result[0]);
            }
          }
        );
      },

      getNumberOfRegisteredPassengers(start_date, end_date, callback) {
        pool.query(
          `CALL get_Number_Of_Registered_Passengers(?,?)`,
          [start_date, end_date],
          (err, result) => {
            if (err) {
              return callback(err);
            } else {
              return callback(null, result[0]);
            }
          }
        );
      },

      getAllPassFlights(origin,destination, callback) {
        pool.query(
          `CALL get_All_Pass_Flights(?,?)`,
          [origin,destination],
          (err, result) => {
            if (err) {
              return callback(err);
            } else {
              return callback(null, result[0]);
            }
          }
        );
        },

        getPassengerCount(origin,destination, callback) {
            pool.query(
              `CALL get_Passenger_Count_O_D(?,?)`,
              [origin,destination],
              (err, result) => {
                if (err) {
                  return callback(err);
                } else {
                  return callback(null, result[0]);
                }
              }
            );
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

  getTotalRevenueOfAircraft(aircraft_id, callback) {
    pool.query(
      `CALL get_total_revenue_of_aircraft(?)`,
      [aircraft_id],
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          console.log("Done");
          return callback(null, result[0]);
        }
      }
    );
  },


  updateDelays(date,start_time,end_time,flight_id, callback) {
    pool.query(
      `update flight_schedule set date=?, start_time=?,end_time=? where flight_id=?`,
      [date,start_time,end_time,flight_id],
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          console.log("Done");
          return callback(null);
        }
      }
    );
  },
     // To create flight
     createFlight(aircraft_id ,date ,  start_time , end_time , route_id ,callback) {
       pool.query(
        `select create_flight(?,?,?,?,?) as Status`,
        [aircraft_id ,date ,  start_time , end_time , route_id ],
        (err, result) => {
          if (err) {
            return callback(err);
          } else {
            return callback(null, result[0]);
          }
        }
      );
    },

    getRegistedAdminByEmail: (email) => {
      return new Promise((resolve, reject) => {
        pool.query(
          `select * from admin where email=?`,
          [email],
          (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result[0]);
          }
        );
      });
    },
    getAirportDeatils(origin, destination, callback) {
      pool.query(
       `select airport_id,country,state,city from airport where airport_id=? or airport_id=?`,
        [origin, destination],
        (err, result) => {
          if (err) {
            return callback(err);
          } else {
            return callback(null, result);
          }
        }
      );
    },
};