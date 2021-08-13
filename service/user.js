const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const Database = require("../database/database");
const _database = new WeakMap();

class User {
  constructor() {
    _database.set(this, new Database());
  }

  get databaseConnection() {
    return _database.get(this);
  }

  async login(data) {
    const validateResults = Joi.object({
      email: Joi.string().min(5).max(255).email().required().label("Email"),
      password: Joi.string().required().label("Password"),
    }).validate(data);

    if (validateResults.error)
      return new Promise((resolve) =>
        resolve({ validationError: validateResults.error })
      );

    if (_database.get(this).connectionError)
      return new Promise((resolve) => resolve({ connectionError: true }));

    const userData = await _database
      .get(this)
      .readView(
        "user_auth",
        ["user_id", "name", "email", "password" , "user_type","is_deleted"],
        ["email", "=", data.email]
    );
   
    if (userData.error || !userData.result[0])
      return new Promise((resolve) => resolve({ allowAccess: false }));
    
    

    const isCompare = await bcrypt.compare(
      data.password,
      userData.result[0]["password"]
    );

    if (!isCompare)
      return new Promise((resolve) => resolve({ allowAccess: false }));

   

    return new Promise((resolve) =>
      resolve({
        allowAccess: true,
        tokenData: _.pick(userData.result[0], [
          "user_id",
          "name",
          "email",
          "user_type",
        ]),
      })
    );
  }
}

module.exports = User;
