const Sequelize = require('sequelize');
const database = require('../config/database');

const items_has_childrens = database.define("childrens_item", {
    childrens_item_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    items_item_id: {type: Sequelize.INTEGER},
    childrens_children_id: {type: Sequelize.INTEGER},
}, {freezeTableName: true, timestamps: false});

module.exports = items_has_childrens;