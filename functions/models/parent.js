const Sequelize = require('sequelize');
const database = require('../config/database');

const Parent = database.define("parents", {
    parent_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
    gender: {type: Sequelize.STRING},
    isDeleted: {type: Sequelize.INTEGER},
}, {freezeTableName: true, timestamps: false});

module.exports = Parent;