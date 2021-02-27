const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {
  createRegisteredUser,
  getRegistedUserByEmail,
  getRegistedUserById,
  editUserProfile,
  updatePassword,
  makeBooking,
  checkIfAlreadyBooked,
  checkSeatFlight,
  createGuestUser,
  removeUser,
  getUserByPassport,
  activateAccount,
} = require("../service/userService");

module.exports = {
  createUser: async (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    //console.log(body.password)
    userDetailsinDatabase = await getRegistedUserByEmail(body.email);
    if (userDetailsinDatabase) {
      return res.json({
        sucess: 0,
        message: "email already exist",
      });
    }
    passportAccount = await getUserByPassport(body.passport_no);
    if (passportAccount) {
      if (passportAccount.isDelete) {
        try {
          const result = compareSync(body.password, passportAccount.password);
          if (result) {
            await activateAccount(passportAccount.user_id);
            res.json({
              succes: 1,
              message: `Account activated with previous password. Email=${passportAccount.email}`,
            });
          } else {
            res.json({
              succes: 1,
              message: "Enter correct password to activate the account",
            });
          }
        } catch (err) {
          res.json({
            success: 0,
            message: err.message,
          });
        }
      }
    }

    createRegisteredUser(body, (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          return res.json({
            sucess: 0,
            message: "email already exist",
          });
        }
        return res.json({
          sucess: 0,
          message: err,
        });
      } else {
        return res.json({
          sucess: 1,
          data: result,
        });
      }
    });
  },

  loginUser: async (req, res) => {
    const body = req.body;
    let userDetailsinDatabase;
    try {
      userDetailsinDatabase = await getRegistedUserByEmail(body.email);
      if (userDetailsinDatabase && !userDetailsinDatabase.isDelete) {
        const result = compareSync(
          body.password,
          userDetailsinDatabase.password
        );
        if (result) {
          userDetailsinDatabase.password = undefined;
          userDetailsinDatabase.user_photo = undefined;
          userDetailsinDatabase.userType= "User"
          const jsontoken = sign({ result: userDetailsinDatabase }, "qwe1234", {
            expiresIn: "1day",
          });
          return res.json({
            sucess: 1,
            message: "login Sucess",
            token: jsontoken,
          });
        } else {
          return res.json({
            sucess: 0,
            message: "Password is invalid",
          });
        }
      } else {
        return res.json({
          sucess: 0,
          message: "Invalid Email",
        });
      }
    } catch (err) {
      return res.json({
        sucess: 0,
        message: err,
      });
    }
  },
  getUserProfile: async (req, res) => {
    userDetails = await getRegistedUserById(req.user.user_id);
    console.log(userDetails);
    if (userDetails) {
      return res.json({
        success: 1,
        data: { ...userDetails, password: undefined },
      });
    }
    return res.json({
      success: 1,
      data: {},
      message: "No User Found",
    });
  },

  editUserProfile: async (req, res) => {
    console.log("Editing");
    if (!req.body.name) {
      res.json({ success: 0, message: "Invalid Name" });
      return;
    }
    if (!req.body.email) {
      res.json({ success: 0, message: "Invalid Email" });
      return;
    }
    if (!req.body.contact_no) {
      res.json({ success: 0, message: "Invalid Contact No" });
      return;
    }
    if (!req.body.country) {
      res.json({ success: 0, message: "Invalid Country" });
      return;
    }
    if (!req.body.birthday) {
      res.json({ success: 0, message: "Invalid Birthday" });
      return;
    }
    if (!req.body.passport_no) {
      res.json({ success: 0, message: "Invalid Passport No" });
      return;
    }
    console.log(req.file);
    editUserProfile(req.body, req.user.user_id, req.file, (err) => {
      if (err) {
        console.log(err);
        res.json({ success: 0, message: err.message });
      }
      res.json({ success: 1, message: "Profile Updated Sucessfully" });
    });
  },

  changePassword: async (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.new_password = hashSync(body.new_password, salt);

    let userDetailsinDatabase = await getRegistedUserById(req.user.user_id);
    if (userDetailsinDatabase) {
      const result = compareSync(
        body.old_password,
        userDetailsinDatabase.password
      );
      if (result) {
        updatePassword(req.user.user_id, body.new_password, (err) => {
          if (err) {
            res.json({ success: 0, message: err.message });
          } else {
            res.json({ success: 1, message: "Password Changed Sucessfully" });
          }
        });
      } else {
        return res.json({
          sucess: 0,
          message: "Current password is invalid",
        });
      }
    } else {
      return res.json({
        sucess: 0,
        message: "Invalid ID",
      });
    }
  },

  submitNbooking: async (req, res) => {
    const { flight_id, seat_id, discount_price } = req.body;
    var body = {
      flight_id,
      seat_id,
      discount_price,
    };
    var done = false;

    if (req.isUser) {
      const { passport_no, user_id } = req.user;
      body = { ...body, passport_no, user_id };
    } else if (!req.isUser) {
      const newData = req.body.guest_data;
      body = { ...body, ...newData };
    }
    const isAvailable = await checkSeatFlight(body);
    if (!isAvailable.seat_available) {
      res.json({
        success: 0,
        message: "There is no such a seat or flight",
      });
      return;
    } else {
      if (!isAvailable.seat_booked) {
        const isBooked = await checkIfAlreadyBooked(body);
        if (isBooked == 0) {
          try {
            if (!req.isUser) {
              const user_id = await createGuestUser(body);
              body = { ...body, user_id };
            }
            await makeBooking(body);
            done = true;
            res.json({
              success: 1,
              message: "Booking is successfully created",
            });
          } catch (err) {
            console.log(err);
            res.json({ err: err.message });
          }
        } else {
          res.json({
            success: 0,
            message: "User is already booked a seat",
          });
        }
      } else {
        res.json({
          success: 0,
          message: "Seat is already booked",
        });
      }
    }
  },

  deleteUser: async (req, res) => {
    const body = req.body;
    const { password } = await getRegistedUserById(req.user.user_id);
    const result = compareSync(body.password, password);
    if (!result) {
      res.json({
        success: 0,
        message: "Incorrect Password",
      });
    } else {
      try {
        const removeRes = await removeUser(req.user);

        res.json({
          success: 1,
          message: "Account deleted successfully.",
        });
      } catch (err) {
        res.json({
          succes: 0,
          message: err.message,
        });
      }
    }
  },
};
