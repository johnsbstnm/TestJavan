const Sequelize = require('sequelize');
const database = require('../config/database');

const Children = database.define("childrens", {
    children_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
    gender: {type: Sequelize.STRING},
    parent_id: {type: Sequelize.INTEGER},
    isDeleted: {type: Sequelize.INTEGER},
}, {freezeTableName: true, timestamps: false});

module.exports = Children;