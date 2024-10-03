const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3001;

// Configuração do banco de dados
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/products', productRoutes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado");
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
