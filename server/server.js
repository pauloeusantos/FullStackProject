const sequelize = require('sequelize');
const Product = require('./models/Product');

sequelize.sync({force: true}).then(() => {
    console.log('Banco de dados sincronizado');
}).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});
