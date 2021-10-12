const Sequelize = require('sequelize');

const dbName = process.env.NODE_ENV !== 'test'? 'corona_test_test': 'coronatracker_testing_db'

const sequelize = new Sequelize(dbName,'root','',{
    dialect: 'mysql',
    host: 'localhost',
    dialectOptions:{
        decimalNumbers: true
    }
});

module.exports = sequelize;