const Sequelize = require('sequelize');

const sequelize = new Sequelize('covid_db','root','',{
    dialect: 'mysql',
    host: 'localhost',
    dialectOptions:{
        decimalNumbers: true
    }
});

module.exports = sequelize;