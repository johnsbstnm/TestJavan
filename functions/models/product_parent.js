const Sequelize = require('sequelize');
const database = require('../config/database');

const items_has_parents = database.define("parents_item", {
    parents_item_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    items_item_id: {type: Sequelize.INTEGER},
    parents_parent_id: {type: Sequelize.INTEGER},
}, {freezeTableName: true, timestamps: false});

module.exports = items_has_parents;