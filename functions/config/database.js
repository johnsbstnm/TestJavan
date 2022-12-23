const Sequelize = require('sequelize');

const database = new Sequelize("test_javan_yonathan", "root", "", {
    dialect: "mysql"
});

database.sync({});

module.exports = database;