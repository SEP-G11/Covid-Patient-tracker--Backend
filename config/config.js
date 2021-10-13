require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.DEV_DB_USER,
        "password": process.env.DEV_DB_PW,
        "database": process.env.DEV_DB_NAME,
        "host": process.env.DEV_DB_HOST,
    },
    "test": {
        "username": process.env.TEST_DB_USER,
        "password": process.env.TEST_DB_PW,
        "database": process.env.TEST_DB_NAME,
        "host": process.env.TEST_DB_HOST,
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
    }
};