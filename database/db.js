const Sequelize = require('sequelize');

const sequelize = new Sequelize('covid_test','root','Rashmi6@',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;