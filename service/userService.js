const pool = require("../config/database");

module.exports = {
  createRegisteredUser: (data, callBack) => {
    pool.query(
      `insert into user (name,email,birthday,contact_no,passport_no,country,is_registered)
            values (?,?,?,?,?,?,?);`,
      [
        data.name,
        data.email,
        data.birthday,
        data.contact_no,
        data.passport_no,
        data.country,
        true,
      ],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          pool.query(
            "insert into profile (user_id ,user_photo,password,package_name) values (?,?,?,?)",
            [result.insertId, data.user_photo, data.password, "Basic"],
            (err, result) => {
              if (err) {
                return callBack(err);
              } else {
                return callBack(null, result);
              }
            }
          );
        }
      }
    );
  },
  getRegistedUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from user natural join profile natural join packages where email=?`,
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
  getRegistedUserById: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from user natural join profile where user_id=?`,
        [user_id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result[0]);
        }
      );
    });
  },

  editUserProfile: (data, id,photo, callback) => {
    pool.query(
      `update user set name=?,email=?,birthday=?,contact_no=?,passport_no=?,country=? where user_id=?;`,
      [
        data.name,
        data.email,
        data.birthday,
        data.contact_no,
        data.passport_no,
        data.country,
        id
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          console.log("Done editing user Table")
          pool.query(`update profile set user_photo=? where user_id=?;`,
          [photo,id],
          (err,result)=>{
            if(err){
              console.log("Error editing profile Table")
              return callback(err);
            }
            console.log("Done editing profilr Table")
            return callback(null);
          }
          
          )
          
        }
      }
    );
  },
  updatePassword: (userId, newpassword, calllback) => {
    pool.query(
      `update profile set password=? where user_id=?`,
      [newpassword, userId],
      (err, result) => {
        if (err) {
          return calllback(err);
        } else {
          return calllback(null);
        }
      }
    );
  },

  makeBooking: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into booking (user_id,seat_id,flight_id,price) values (?,?,?,?)`,
        [data.user_id, data.seat_id, data.flight_id, data.discount_price],
        (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },

  checkIfAlreadyBooked: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from user natural join booking where flight_id=? and passport_no=?;`,
        [data.flight_id, data.passport_no],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.length);
          }
        }
      );
    });
  },

  createGuestUser: (data, callBack) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into user (name,email,birthday,contact_no,passport_no,country,is_registered)
            values (?,?,?,?,?,?,?);`,
        [
          data.name,
          data.email,
          data.birthday,
          data.contact_no,
          data.passport_no,
          data.country,
          false,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  },

  checkSeatFlight: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from flight_schedule natural join seat_info where flight_id=? and seat_id=?;`,
        [data.flight_id, data.seat_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result[0]) {
              pool.query(
                `select * from booking where flight_id=? and seat_id=?;`,
                [data.flight_id, data.seat_id],
                (err, result_1) => {
                  if (err) {
                    reject(err);
                  } else {
                    if (result_1[0]) {
                      resolve({
                        seat_booked: true,
                        seat_available: true,
                      });
                    } else {
                      resolve({
                        seat_booked: false,
                        seat_available: true,
                      });
                    }
                  }
                }
              );
            } else {
              resolve({
                seat_available: false,
              });
            }
          }
        }
      );
    });
  },
};
