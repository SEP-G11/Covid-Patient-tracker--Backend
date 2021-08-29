const sequelize = require('../database/db');
var initModels = require("./service/init-models");
var models = initModels(sequelize);
