const Sequelize = require('sequelize');

const sequelize = new Sequelize('covid_test','root','',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;