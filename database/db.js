const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config[process.env.NODE_ENV]['database'],config[process.env.NODE_ENV]['username'],config[process.env.NODE_ENV]['password'],{
    dialect: 'mysql',
    host: config[process.env.NODE_ENV]['host'],
    dialectOptions:{
        decimalNumbers: true
    }
});

module.exports = sequelize;