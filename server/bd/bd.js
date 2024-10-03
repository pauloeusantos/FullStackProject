const { Sequelize, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize('dbase', 'root', '', { 
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = { sequelize, DataTypes };
