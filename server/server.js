const express = require('express');
const path = require('path');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do Sequelize com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Definição do modelo Product
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

// Sincronizar o modelo com o banco de dados
sequelize.sync();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do build do React
app.use(express.static(path.join(__dirname, '../product/dist')));

// Rotas da API
app.use('/api/products', productRoutes);

// Para qualquer outra rota, servir o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../product/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});