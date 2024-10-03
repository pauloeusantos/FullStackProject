const { Sequelize, DataTypes } = require('sequelize'); // Importando o Sequelize
const sequelize = new Sequelize('database', 'username', 'password', { // Criando a instância do Sequelize
    host: 'localhost',
    dialect: 'mysql' // ou outro dialeto que você esteja usando
});
const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Product;
