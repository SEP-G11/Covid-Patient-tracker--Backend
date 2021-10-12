const Sequelize = require('sequelize');

const sequelize = new Sequelize('testing_covid_test','root','',{
    dialect: 'mysql',
    host: 'localhost',
    dialectOptions:{
        decimalNumbers: true
    }
});

module.exports = sequelize;