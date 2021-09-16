const Sequelize = require('sequelize');

const sequelize = new Sequelize('corona_test_test','root','',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;