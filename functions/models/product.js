const Sequelize = require('sequelize');
const database = require('../config/database');

const Product = database.define("items", {
    item_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    item_name: {type: Sequelize.STRING},
    price: {type: Sequelize.STRING},
    product_id: {type: Sequelize.INTEGER},
}, {freezeTableName: true, timestamps: false});

module.exports = Product;