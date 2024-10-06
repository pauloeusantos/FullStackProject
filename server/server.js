const express = require('express');
const path = require('path');
const cors = require('cors');
const { sequelize, DataTypes } = require('./bd/bd'); // Importar DataTypes
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

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